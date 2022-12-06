import * as vscode from 'vscode';
import createCopyFromSCMInputBoxCommand from './commands/createCopyFromSCMInputBoxCommand';
import createOpenEditorCommand from './commands/createOpenEditorCommand';
import setAiCommitMessage from './commands/set-ai-commit-message';
import GitService from './utils/GitService';
import * as dotenv from "dotenv";



export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "gicomai" is now active!');
	
	dotenv.config({ path: __dirname+'/../.env' });

  const git = new GitService();
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

	context.subscriptions.push( setAiCommitMessage({context, currentPanel, git}));

	context.subscriptions.push(
    createOpenEditorCommand({ context, currentPanel, git })
  );
  context.subscriptions.push(
    createCopyFromSCMInputBoxCommand({ currentPanel, git })
  );

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('gicomai.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Aloha, from gicomai!');
	});

	console.log( context );

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
