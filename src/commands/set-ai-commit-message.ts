import * as _ from 'lodash';
import { Configuration, OpenAIApi } from "openai";
import * as vscode from 'vscode';
import GitService from '../utils/GitService';

const getApiKey = () => {
  const config = vscode.workspace.getConfiguration('gicomai');
  const apiKey = config.get('openai_apikey'); // || process.env.OPENAI_APIKEY;
  if( apiKey ) return apiKey;
  vscode.window.showInformationMessage(
    `Please provide an OpenAI API_KEY in the settings./
    You can get a key at https://beta.openai.com/account/api-keys`);
}

const getOpenAIApi = () => {
  const apiKey = getApiKey();
  if( ! apiKey ) return;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_APIKEY
  });  
  const openai = new OpenAIApi(configuration);
  return openai;
}

const getDiff = async (git:GitService) => {
  const repo = git.getSelectedRepository();
  let diff = await repo?.diff( true );
  if( _.size(diff) > 3000 ) diff = _.truncate( diff, {length: 3000} );
  return diff;
}

const getMessage = async (openai:OpenAIApi, git:GitService, diff:string) => {
  const response = await openai.createCompletion({
    model:"text-davinci-003",
    prompt: "commit message for\n\n" + diff
  });
  return sanitizeMessage( response.data.choices[0].text );
}


const execute = (openai:OpenAIApi, git:GitService, diff:string ) => {
  const progressOptions = {
    location: vscode.ProgressLocation.Notification,
    title: 'Asking GPT3 for a commit message...',
    cancellable: true
  };
  
  const operation = async () => {
    try {
      git.setSCMInputBoxMessage("...");
      const message = await getMessage( openai, git, diff );
      if( ! message ) return vscode.window.showErrorMessage('Commit message could not be determined');
      git.setSCMInputBoxMessage( message );  
    } catch (error) {
      vscode.window.showErrorMessage( _.toString( error ) );
      git.setSCMInputBoxMessage('');
    }  
  };
  
  vscode.window.withProgress(progressOptions, operation);
}

const sanitizeMessage = (message?:string) => {
  if( ! message ) return undefined;
  message = _.trim( message );
  if( _.startsWith( message, 'This commit ') ) message = message.substring( 12 );
  return message;
}

const setAiCommitMessage = ({git}: {git: GitService}) => {  
  return vscode.commands.registerCommand(
    'gicomai.setAiCommitMessage',
    async () => {

      const openai = getOpenAIApi();
      if( ! openai ) return; 
    
      const diff = await getDiff( git );
      if( ! diff ) return;
      
      execute( openai, git, diff );
    }
  );
};

export default setAiCommitMessage;
