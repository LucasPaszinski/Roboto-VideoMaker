const Algorithmia = require("algorithmia");
const { algorithmiaPassword } = require("../password.json");
const sentenceBoundaryDetection = require("sbd");

async function robot(content) {
  content.sourceContentOriginal = await fetchContentFromWikipedia(content);
  content.cleanSourceContent = cleanContentReceived(
    content.sourceContentOriginal
  );
  content.sentences = breakContentIntoSentences(content.cleanSourceContent);

  console.log(content.sentences);
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
    return wikipediaContentOriginal.content;
  }

  function cleanContentReceived(content) {
    const contentWithoutBlankLinesAndMarkDowns = removeBlankLinesAndMarkDowns(
      content
    );
    const cleanContent = removeDateInsideParantesis(
      contentWithoutBlankLinesAndMarkDowns
    );

    return cleanContent;

    function removeBlankLinesAndMarkDowns(text) {
      const allLines = text.split("\n");
      const textWithoutBlankLines = allLines.filter(line => {
        if (line.trim().lenght === 0 || line.trim().startsWith("=")) {
          return false;
        } else {
          return true;
        }
      });
      return textWithoutBlankLines.join(" ");
    }

    function removeDateInsideParantesis(text) {
      return text
        .replace(/\((?:\([^()]*\)|[^()])*\)/gm, "")
        .replace(/  /g, " ");
    }
  }

  function breakContentIntoSentences(content) {
    content.sentences = [];
    const sentences = sentenceBoundaryDetection.sentences(content);
    return sentences.map(sentence => ({
      text: sentence,
      images: [],
      keyword: []
    }));
  }
}

module.exports = robot;
