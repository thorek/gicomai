import * as vscode from 'vscode';
import setAiCommitMessage from './commands/set-ai-commit-message';
import GitService from './utils/GitService';
import * as dotenv from "dotenv";



export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "gicomai" is now active!');


	dotenv.config({ path: __dirname+'/../.env' });

  const git = new GitService();
	context.subscriptions.push( setAiCommitMessage({git}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
