const fs = require('fs');
const os = require('os');

let updatedCount;
const tmpDir = os.tmpdir() + '/tmp';
const fileDataPath = tmpDir + '/counter.txt';

function attemptTmpWriting(){
  try {

    const exists = fs.existsSync(tmpDir);
    const fileExists = fs.existsSync(fileDataPath);

    if(!exists){
      console.log('directory does not exist, making it')
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    let count = 0;
    if (fileExists) {
      console.log('file exists')
      const countTxt = fs.readFileSync(fileDataPath, 'utf-8');
      if (countTxt !== undefined) {
        count = parseInt(countTxt, 10);
      }
    }

    updatedCount = ++count;
    fs.writeFileSync(fileDataPath, (updatedCount).toString(), { encoding: 'utf8' });

  } catch (e) {
    console.error(e);
  }
}


exports.handler = async function (event, context) {

  attemptTmpWriting();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({updatedCount, tmpDir}, null, 2)
  };
}