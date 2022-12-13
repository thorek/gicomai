import * as _ from 'lodash';
import { Configuration, OpenAIApi } from 'openai';


const getOpenAIApi = () => {
  const apiKey = 'key-here';
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
-OPENAI_APIKEY=0000000000000000
\ No newline at end of file`



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