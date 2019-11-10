const Algorithmia = require("algorithmia");
const { algorithmiaPassword } = require('../password.json');

function robot(content) {
  console.log(`Received the content with sucess: ${content.searchTerm}`);

  fetchContentFromWikipedia(content);
  cleanContentReceived(content);
  breakContentIntoSentences(content);

  async function fetchContentFromWikipedia(content) {
    const algoritimiaClientAuthentication = Algorithmia.client(algorithmiaPassword);
    const algorithmiaWikipediaParserAPI = algoritimiaClientAuthentication.algo(
      "web/WikipediaParser/0.1.2?timeout=300"
    ); // timeout is optional
    const contentToBeSearched = {
      articleName: content.searchTerm,
      lang: "en"
    };
     const WikipediaSearchResult = await algorithmiaWikipediaParserAPI.pipe(
      contentToBeSearched
    )

    const wikipediaContentOriginal = WikipediaSearchResult.get();
    content.sourceContentOriginal = wikipediaContentOriginal;
    console.log(content.sourceContentOriginal);
  }

  function cleanContentReceived(content) {}

  function breakContentIntoSentences(content) {}
}

module.exports = robot;
