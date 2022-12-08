# gicomai README

gicomai is a not very creative acronym for **gi**t **co**mmit **me**ssages from **ai**


## Features

 gicomai takes your `diff` from the current repository and asks (https://beta.openai.com) to generate a commit message. The AI is usually quite impressive with this task.

 This is triggered by pressing `Command-Enter` in the commit input (or selecting) `Commit - Commit` from the git menu. This opens the git commit message editor. gicomai will place the ai generated commit message on top of this file. Feel free to edit it. When closing the editor - the commit is performed. 

## Requirements

You need an OpenAI account and create your own _**api-key**_ at https://beta.openai.com/account/api-keys

## Extension Settings

Please provide your _api-key_ in the settings:

* `gicomai.openai_apikey`: your _api-key_

## Known Issues

None so far

## Release Notes

### 1.0.0

Initial release of gicomai

**Enjoy!**
