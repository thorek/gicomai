import * as assert from 'assert';
import * as _ from 'lodash';
import { Configuration, OpenAIApi } from 'openai';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	const getOpenAIApi = () => {
		const config = vscode.workspace.getConfiguration('gicomai');
  	const apiKey:string = _.toString(config.get('openai_apikey')); 
		console.log({apiKey});
		const configuration = new Configuration({apiKey});  
		const openai = new OpenAIApi(configuration);
		return openai;
	}
	
	const openai = getOpenAIApi();
	const diff = `diff --git a/.env b/.env
	deleted file mode 100644
	index 46682c7..0000000
	--- a/.env
	+++ /dev/null
	@@ -1 +0,0 @@
	-OPENAI_APIKEY=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
	\ No newline at end of file`

	test('get commit message for diff', async () => {		
		try {
			const response = await openai.createCompletion({
				"model": "text-davinci-003",
				"prompt": "git commit message for diff\n" + diff,      
				"n": 1
			});
			assert( response.data.choices[0] !== undefined );
		} catch (error) {
			console.error( error );
			assert( false, _.toString( error ) );
		}
	
	});
});
