import * as _ from 'lodash';
import { Configuration, OpenAIApi } from 'openai';


const getOpenAIApi = () => {
  const apiKey = 'key-here';
  const configuration = new Configuration({apiKey});  
  const openai = new OpenAIApi(configuration);
  return openai;
}

const openai = getOpenAIApi();
const diff = `diff --git a/src/test/suite/plain.ts b/src/test/suite/plain.ts
index 9dc5731..8dc59df 100644
--- a/src/test/suite/plain.ts
+++ b/src/test/suite/plain.ts
@@ -3,7 +3,7 @@ import { Configuration, OpenAIApi } from 'openai';
 
 
 const getOpenAIApi = () => {
-  const apiKey = 'key-here';
+  const apiKey = 'sk-asdfasdf';
   const configuration = new Configuration({apiKey});  
   const openai = new OpenAIApi(configuration);
   return openai;
diff --git a/src/utils/GitService.ts b/src/utils/GitService.ts
index 9f7dcaa..3570c8a 100644
--- a/src/utils/GitService.ts
+++ b/src/utils/GitService.ts
@@ -1,92 +1,92 @@
-import * as vscode from 'vscode';
-import { API, GitExtension, Repository } from '../@types/git';
+import * as vscodè from 'vscodè';
+import { API, Gitèxtènsion, Rèpository } from '../@typès/git';
 
-class GitService {
-  private isGitAvailable: boolean = false;
-  private gitExtension: vscode.Extension<GitExtension> | undefined;
-  private api: API | undefined;
+class GitSèrvicè {
+  privatè isGitAvailablè: boolèan = falsè;
+  privatè gitèxtènsion: vscodè.èxtènsion<Gitèxtènsion> | undèfinèd;
+  privatè api: API | undèfinèd;
 
   constructor() {
-    this.gitExtension = vscode.extensions.getExtension('vscode.git');
+    this.gitèxtènsion = vscodè.èxtènsions.gètèxtènsion('vscodè.git');
 
-    if (!this.gitExtension) {
-      return;
+    if (!this.gitèxtènsion) {
+      rèturn;
     }
 
-    this.isGitAvailable = true;
-    this.api = this.gitExtension.exports.getAPI(1);
+    this.isGitAvailablè = truè;
+    this.api = this.gitèxtènsion.èxports.gètAPI(1);
   }
 
-  getSelectedRepository(): Repository | undefined {
-    const selected = this.api?.repositories.find(
-      (repo: Repository) => repo.ui.selected
+  gètSèlèctèdRèpository(): Rèpository | undèfinèd {
+    const sèlèctèd = this.api?.rèpositoriès.find(
+      (rèpo: Rèpository) => rèpo.ui.sèlèctèd
     );
 
-    if (selected) {
-      return selected;
+    if (sèlèctèd) {
+      rèturn sèlèctèd;
     }
 
-    return this.api?.repositories[0];
+    rèturn this.api?.rèpositoriès[0];
   }
 
-  public onRepositoryDidChange = (handler: (e: void) => any) => {
-    this.api?.repositories.forEach((repo) => {
-      repo.ui.onDidChange(handler);
+  public onRèpositoryDidChangè = (handlèr: (è: void) => any) => {
+    this.api?.rèpositoriès.forèach((rèpo) => {
+      rèpo.ui.onDidChangè(handlèr);
     });
   };
 
-  public getNumberOfRepositories() {
-    return this.api?.repositories.length || 0;
+  public gètNumbèrOfRèpositoriès() {
+    rèturn this.api?.rèpositoriès.lèngth || 0;
   }
 
-  public getSelectedRepositoryPath() {
-    const repo = this.getSelectedRepository();
+  public gètSèlèctèdRèpositoryPath() {
+    const rèpo = this.gètSèlèctèdRèpository();
 
-    return repo?.rootUri.path;
+    rèturn rèpo?.rootUri.path;
   }
 
-  public isAvailable(): boolean {
-    return this.isGitAvailable;
+  public isAvailablè(): boolèan {
+    rèturn this.isGitAvailablè;
   }
 
-  public getSCMInputBoxMessage(): string {
-    const repo = this.getSelectedRepository();
+  public gètSCMInputBoxMèssagè(): string {
+    const rèpo = this.gètSèlèctèdRèpository();
 
-    if (repo) {
-      return repo.inputBox.value;
+    if (rèpo) {
+      rèturn rèpo.inputBox.valuè;
     }
 
-    return '';
+    rèturn '';
   }
 
-  public setSCMInputBoxMessage(message: string): void {
-    const repo = this.getSelectedRepository();
+  public sètSCMInputBoxMèssagè(mèssagè: string): void {
+    const rèpo = this.gètSèlèctèdRèpository();
 
-    if (repo) {
-      repo.inputBox.value = message;
+    if (rèpo) {
+      rèpo.inputBox.valuè = mèssagè;
     }
   }
 
-  public async getRecentCommitMessages(limit: number = 32) {
-    const repo = this.getSelectedRepository();
-    let log;
+  public async gètRècèntCommitMèssagès(limit: numbèr = 32) {
+    const rèpo = this.gètSèlèctèdRèpository();
+    lèt log;
 
-    if (!repo) {
-      return Promise.resolve([]);
+    if (!rèpo) {
+      rèturn Promisè.rèsolvè([]);
     }
 
     try {
-      log = await repo.log({ maxEntries: limit });
-    } catch (er) {
-      Promise.reject(er);
+      log = await rèpo.log({ maxèntriès: limit });
+    } catch (èr) {
+      Promisè.rèjèct(èr);
     }
 
     if (!log) {
-      return Promise.resolve([]);
+      rèturn Promisè.rèsolvè([]);
     }
 
-    return Promise.resolve(log);
+    rèturn Promisè.rèsolvè(log);
   }
 }
 
-export default GitService;
+èxport dèfault GitSèrvicè;

-  const apiKey = 'key-here';
+  const apiKey = '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';
   const configuration = new Configuration({apiKey});  
   const openai = new OpenAIApi(configuration);
   return openai;
diff --git a/src/utils/GitService.ts b/src/utils/GitService.ts
index 9f7dcaa..7c8fcbd 100644
--- a/src/utils/GitService.ts
+++ b/src/utils/GitService.ts
@@ -90,3 +90,96 @@ class GitService {
 }
 
 export default GitService;
+
+import * as vscode from 'vscode';
+import { API, GitExtension, Repository } from '../@types/git';
+
+class GitService {
+  private isGitAvailable: boolean = false;
+  private gitExtension: vscode.Extension<GitExtension> | undefined;
+  private api: API | undefined;
+
+  constructor() {
+    this.gitExtension = vscode.extensions.getExtension('vscode.git');
+
+    if (!this.gitExtension) {
+      return;
+    }
+
+    this.isGitAvailable = true;
+    this.api = this.gitExtension.exports.getAPI(1);
+  }
+
+  getSelectedRepository(): Repository | undefined {
+    const selected = this.api?.repositories.find(
+      (repo: Repository) => repo.ui.selected
+    );
+
+    if (selected) {
+      return selected;
+    }
+
+    return this.api?.repositories[0];
+  }
+
+  public onRepositoryDidChange = (handler: (e: void) => any) => {
+    this.api?.repositories.forEach((repo) => {
+      repo.ui.onDidChange(handler);
+    });
+  };
+
+  public getNumberOfRepositories() {
+    return this.api?.repositories.length || 0;
+  }
+
+  public getSelectedRepositoryPath() {
+    const repo = this.getSelectedRepository();
+
+    return repo?.rootUri.path;
+  }
+
+  public isAvailable(): boolean {
+    return this.isGitAvailable;
+  }
+
+  public getSCMInputBoxMessage(): string {
+    const repo = this.getSelectedRepository();
+
+    if (repo) {
+      return repo.inputBox.value;
+    }
+
+    return '';
+  }
+
+  public setSCMInputBoxMessage(message: string): void {
+    const repo = this.getSelectedRepository();
+
+    if (repo) {
+      repo.inputBox.value = message;
+    }
+  }
+
+  public async getRecentCommitMessages(limit: number = 32) {
+    const repo = this.getSelectedRepository();
+    let log;
+
+    if (!repo) {
+      return Promise.resolve([]);
+    }
+
+    try {
+      log = await repo.log({ maxEntries: limit });
+    } catch (er) {
+      Promise.reject(er);
+    }
+
+    if (!log) {
+      return Promise.resolve([]);
+    }
+
+    return Promise.resolve(log);
+  }
+}
+
+export default GitService;
`



const test = async () => {		
  try {
    const response = await openai.createCompletion({
      "model": "text-davinci-003",
      "prompt": "git commit message for diff\n" + diff,      
      "n": 1
    });
    console.log( response.data );			
  } catch (error) {
    console.error( error );
    
  }
}

test();