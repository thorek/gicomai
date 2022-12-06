import * as _ from 'lodash';
import { Configuration, OpenAIApi } from "openai";
import * as vscode from 'vscode';
import GitService from '../utils/GitService';

const setAiCommitMessage = ({
  context,
  currentPanel,
  git,
}: {
  context: vscode.ExtensionContext;
  currentPanel: vscode.WebviewPanel | undefined;
  git: GitService;
}) => {  
  return vscode.commands.registerCommand(
    'gicomai.setAiCommitMessage',
    async () => {

      const repo = git.getSelectedRepository();
      let diff = await repo?.diff( true );
      if( _.size(diff) > 3000 ) diff = _.truncate( diff, {length: 3000} );
      if( ! diff ) return;

      git.setSCMInputBoxMessage("...asking GPT3 for a commit message");
      
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_APIKEY
      });
      
      const openai = new OpenAIApi(configuration);

      try {
        const response = await openai.createCompletion({
          model:"text-davinci-003",
          prompt: "commit message for\n\n" + diff
        });

        const message = _.trim( response.data.choices[0].text );  
        
        console.log({diff, message})
        git.setSCMInputBoxMessage( message || 'sorry, didnt work');        
      } catch (error) {
        console.error( error );
        git.setSCMInputBoxMessage('');
      }  

    }
  );
};

export default setAiCommitMessage;
