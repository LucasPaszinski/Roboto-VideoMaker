
const robots = {
  userInput:require('./robots/userInput'),
  text : require('./robots/text'),
}

function start() {
  const content = {};
  //Robots Initialization
  robots.userInput(content);
  robots.text(content);


}
start();
