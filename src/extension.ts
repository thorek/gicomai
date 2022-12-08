import * as vscode from 'vscode';
import aiCommitMessageActivate from './commands/set-ai-commit-message';
import GitService from './utils/GitService';
import * as dotenv from "dotenv";

export function activate(context: vscode.ExtensionContext) {

	dotenv.config({ path: __dirname+'/../.env' });

	console.log('Congratulations, your extension "gicomai" is now active!');

  const git = new GitService();
	aiCommitMessageActivate({git});	
}

// This method is called when your extension is deactivated
export function deactivate() {}
