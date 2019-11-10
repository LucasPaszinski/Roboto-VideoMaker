
const robots = {
  userInput:require('./robots/userInput'),
  text : require('./robots/text'),
}

function start() {
  const content = {};
  // content.sourceContentOriginal = "";
  // content.sourceContentClean = "";
  // content.sentences = [
  //   {
  //     text: "",
  //     keywords: [""],
  //     images: [""]
  //   }
  // ];
  //Robots Initialization
  robots.userInput(content);
  robots.text(content);


}
start();
