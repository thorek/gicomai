# gicomai README

gicomai is a (not very creative) acronym for **gi**t **co**mmit **me**ssages from **AI**

## Features

gicomai takes the `diff` from the current repository and asks https://beta.openai.com to generate a commit message. The AI is usually quite impressive with this task.

If you have changes in your repository, that you want to commit, e.g.

![screenshot](images/screenshot1.png)

 You can trigger the creation of the messages by pressing `Command-Enter` in the **empty** commit input (or selecting) `Commit-Commit` from the git menu. This opens the git commit message text editor. 
 
A commit message for every changed file will be generated and placed on top.

![screenshot](images/screenshot2.png)

You can edit this as you like. 

![screenshot](images/screenshot3.png)

The rest is default behavior. So when closing the editor, you will asked if you want to make the commit. 

![screenshot](images/screenshot4.png)

Note: when you enter your own commit message into the commit input, the generation will not be triggered.

## Requirements

You need an OpenAI account and create your own **api-key** at https://beta.openai.com/account/api-keys

## Extension Settings

Please provide your _api-key_ in the settings:

* `gicomai.openai_apikey`: _your api-key_

## Known Issues

None so far

## Release Notes

### 0.0.2

 - a bit more info in the README
 - add the file a message belongs to
 - no empty lines between messages
 - add message if rate limit is reached

### 0.0.1

Initial release of gicomai

**Enjoy!**
