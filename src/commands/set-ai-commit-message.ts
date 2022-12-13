import * as _ from 'lodash';
import { Configuration, OpenAIApi } from "openai";
import * as vscode from 'vscode';
import GitService from '../utils/GitService';

const fileNameRegExp = new RegExp('.*b\/(.*)');

const progressOptions = {
  location: vscode.ProgressLocation.Notification,
  title: 'Asking GPT3 for a commit message...',
  cancellable: true
};

const getApiKey = () => {
  const config = vscode.workspace.getConfiguration('gicomai');
  const apiKey:string = _.toString(config.get('openai_apikey')); 
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

const getDiffs = async (git:GitService) => {
  const repo = git.getSelectedRepository();
  let diff = await repo?.diff( true );
  if( _.isEmpty( diff ) ) diff = await repo?.diff( false );
  return _.compact( _.split(diff, 'diff --git '));
}

const getMessage = async (openai:OpenAIApi, diff:string) => {
  if( diff.length > 1000 ) diff = diff.substring(0, 1000);
  const response = await openai.createCompletion({
    "model": "text-davinci-003",
    "prompt": "git commit message for diff\n" + diff,      
    "n": 1
  });
  const message = sanitizeMessage( response.data.choices[0].text );
  const result = fileNameRegExp.exec( diff.split('\n')[0] );
  const fileName = result ? result[1] : ''
  return `${fileName}: ${message}`;
}

const sanitizeMessage = (message:string|undefined ) => {
  if( ! message ) return undefined;  
  message = _.trim( message );
  const superfluous = [
    'this is a commit to ',
    'this commmit ', 
    'commit message: ',    
    'commit to ',
    'commit ',
    'git commit message: ',
    'message: ',
    'message '
  ];
  for( const term of superfluous ){
    if( _.startsWith( _.toLower( message ), term ) ) {
      message = message?.substring( term.length );
      break;
    }
  }
  message = _.replace(message, new RegExp('\n','g'),' | ');
  return message;
}

const setMessagesToDoc = async (openai:OpenAIApi, diffs:string[]) => {
  const doc = vscode.window.activeTextEditor?.document;
  if( ! doc || ! _.includes( doc.fileName, 'COMMIT_EDITMSG' ) ) return;    
  for( const diff of diffs ){
    const message = await getMessage( openai, diff );
    if( message ) addContentToDoc( doc, message, diff.length > 1 );    
  }
}

const addContentToDoc = (doc:vscode.TextDocument, content:string, list:boolean) => {
  const edit = new vscode.WorkspaceEdit();
  if( list ) content = '* ' + content;  
  edit.insert( doc.uri, new vscode.Position(0, 0), content + '\n');
  vscode.workspace.applyEdit(edit);
}

const execute = async (git:GitService) => {
  try {
    const openai = getOpenAIApi();
    if( ! openai ) return; 
  
    const diffs = await getDiffs( git );      
    if( _.isEmpty( diffs ) ) return;

    await setMessagesToDoc( openai, diffs );
  } catch (error) {
    const status = _.get( error, 'response.status');
    if( status === 401 ) return vscode.window.showErrorMessage( 
      'Sorry, your API_KEY seems not be accepted.' );
    if( status === 429 ) return vscode.window.showErrorMessage( 
      'Sorry, rate limit reached. Try again in a minute.' );
      
    const message = _.get( error, 'error.response.data.error.message' );
    if( message ) return vscode.window.showErrorMessage( message );
    
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
