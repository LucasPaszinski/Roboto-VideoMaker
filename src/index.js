
const robots = {
  userInput:require('./robots/userInput.js'),
  text : require('./robots/text.js'),
}

function start() {
  const content = {};
  robots.userInput(content);
  console.log(content);
  robots.text(content);
}
start();
