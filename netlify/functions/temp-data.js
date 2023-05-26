const fs = require('fs');

let updatedCount;

function attemptTmpWriting(){
  try {

    const exists = fs.existsSync('/tmp');
    const fileExists = fs.existsSync('/tmp/counter.txt');

    if(!exists){
      fs.mkdirSync('/tmp', { recursive: true });
    }

    let count = 0;
    if (fileExists) {
      const countTxt = fs.readFileSync('/tmp/counter.txt', 'utf-8');
      if (countTxt !== undefined) {
        count = parseInt(countTxt, 10);
      }
    }

    updatedCount = ++count;
    fs.writeFileSync('/tmp/counter.txt', (updatedCount).toString());

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
    body: JSON.stringify({updatedCount}, null, 2)
  };
}