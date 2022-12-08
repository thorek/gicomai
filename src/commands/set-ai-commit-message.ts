import * as _ from 'lodash';
import { Configuration, OpenAIApi } from "openai";
import * as vscode from 'vscode';
import GitService from '../utils/GitService';

const progressOptions = {
  location: vscode.ProgressLocation.Notification,
  title: 'Asking GPT3 for a commit message...',
  cancellable: true
};

const getApiKey = () => {
  const config = vscode.workspace.getConfiguration('gicomai');
  const apiKey:string = _.toString(config.get('openai_apikey')); // || process.env.OPENAI_APIKEY;
  if( apiKey ) return _.trim(apiKey);
  vscode.window.showInformationMessage(
    `Please provide an OpenAI API_KEY in the settings./
    You can get a key at https://beta.openai.com/account/api-keys`);
}

const getOpenAIApi = () => {
  const apiKey = getApiKey();
  if( ! apiKey ) return;
  const configuration = new Configuration({apiKey});  
  const openai = new OpenAIApi(configuration);
  return openai;
}

const getDiff = async (git:GitService) => {
  const repo = git.getSelectedRepository();
  const diff = await repo?.diff( false );
  return _.compact( _.map( _.split(diff, 'diff --git '), diff =>  
    _.size(diff) > 3000 ? _.truncate( diff, {length: 3000} ) : diff ));
}

const getMessage = async (openai:OpenAIApi, diff:string) => {
  const response = await openai.createCompletion({
    model:"text-davinci-003",
    prompt: "commit message for\n\n" + diff
  });
  return sanitizeMessage( response.data.choices[0].text );
}

const getMessages =async (openai:OpenAIApi, diffs:string[]) => {
  const messages:string[] = [];
  for( const diff of diffs ){
    const message = await getMessage( openai, diff );
    if( message ) messages.push( message );
  }
  return messages;
}

const sanitizeMessage = (message?:string) => {
  if( ! message ) return undefined;
  message = _.trim( message );
  if( _.startsWith( message, 'This commit ') ) message = message.substring( 12 );
  return message;
}

const setConentToDoc = async (content:string) => {
  const doc = vscode.window.activeTextEditor?.document;
  if( ! doc || ! _.includes( doc.fileName, 'COMMIT_EDITMSG' ) ) return;  
  const edit = new vscode.WorkspaceEdit();
  edit.insert( doc.uri, new vscode.Position(0, 0), content);
  vscode.workspace.applyEdit(edit);
}

const execute = async (git:GitService) => {
  try {
    const openai = getOpenAIApi();
    if( ! openai ) return; 
  
    const diffs = await getDiff( git );      
    if( _.isEmpty( diffs ) ) return;

    const messages = await getMessages( openai, diffs );
    if( _.isEmpty( messages) ) return;
  
    const content = _.join( messages, '\n\n' );
    setConentToDoc( content );

  } catch (error) {
    vscode.window.showErrorMessage( _.toString( error ) );
    console.error( error );
  }
}

const registerAiCommitMessage = ({git}: {git: GitService}) => {  
  vscode.workspace.onDidOpenTextDocument((doc) => {
    if( ! _.endsWith( doc.fileName, 'COMMIT_EDITMSG.git') ) return;
    vscode.window.withProgress(progressOptions, () => execute( git ) );        
  })
};

export default registerAiCommitMessage;
