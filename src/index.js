
const robots = {
  userInput:require('./robots/userInput.js'),
  text : require('./robots/text.js'),
}

function start() {
  const content = {};
  robots.userInput(content);
  robots.text(content);
  console.log(content.sentences)
}
start();
