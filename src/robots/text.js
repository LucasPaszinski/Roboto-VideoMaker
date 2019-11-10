const Algorithmia = require("algorithmia");
const { algorithmiaPassword } = require("../password.json");

async function robot(content) {
  console.log(`Received the content with sucess: ${content.searchTerm}`);

  await fetchContentFromWikipedia(content);
  cleanContentReceived(content);
  breakContentIntoSentences(content);

  async function fetchContentFromWikipedia(content) {
    const algoritimiaClientAuthentication = Algorithmia.client(
      algorithmiaPassword
    );
    const algorithmiaWikipediaParserAPI = algoritimiaClientAuthentication.algo(
      "web/WikipediaParser/0.1.2?timeout=300"
    ); // timeout is optional
    const contentToBeSearched = {
      articleName: content.searchTerm,
      lang: "en"
    };
    const WikipediaSearchResult = await algorithmiaWikipediaParserAPI.pipe(
      contentToBeSearched
    );

    const wikipediaContentOriginal = WikipediaSearchResult.get();
    content.sourceContentOriginal = wikipediaContentOriginal.content;
    console.log(content.sourceContentOriginal);
  }

  function cleanContentReceived(content) {
    const contentWithoutBlankLines = removeBlankLines(
      content.sourceContentOriginal
    );
    const contentWithoutMarkDown = removeMarkDowns(contentWithoutBlankLines);

    function removeBlankLines(text) {
      const allLines = text.split("\n");
      const textWithoutBlankLines = allLines.filter(line => {
        if (line.trim().lenght === 0) {
          return false;
        } else {
          return true;
        }
      });
      return textWithoutBlankLines;
    }

    function removeMarkDowns(text) {
      const textWithoutMarkDown = text.filter((line) => {
        if (line.trim().startsWith("=")) {
          return false;
        } else {
          return true;
        }
      });
      return textWithoutMarkDown;
    }
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    console.log(contentWithoutMarkDown);
  }

  function breakContentIntoSentences(content) {}
}

module.exports = robot;
