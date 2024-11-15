const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

const makeCommit = n => {
  if (n === 0) return simpleGit().push();
  
  // Using Math.random() to generate a random integer between min and max
  const x = Math.floor(Math.random() * (55)); // Random number between 0 and 54
  const y = Math.floor(Math.random() * (7));  // Random number between 0 and 6
  
  const DATE = moment().subtract(1, 'y').add(1, 'd').add(x, 'w').add(y, 'd').format();

  const data = { date: DATE };

  console.log(DATE);

  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { '--date': DATE }) // Corrected the commit options
      .then(() => makeCommit(n - 1));  // Recursively call makeCommit
  });
}

makeCommit(100);
