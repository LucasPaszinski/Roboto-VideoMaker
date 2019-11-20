const Algorithmia = require("algorithmia");
const { algorithmiaPassword } = require("../password.json");
const { apikey, url } = require("../watson_credentials.json");

const sentenceBoundaryDetection = require("sbd");
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({
    apikey: apikey,
  }),
  url: url,
});

async function robot(content) {
  content.sourceContentOriginal = await fetchContentFromWikipedia(content);
  content.cleanSourceContent = cleanContentReceived(
    content.sourceContentOriginal
  );
  content.sentences =  breakContentIntoSentences(content.cleanSourceContent);
  AddKeywordsToContent(content);

/////

function SingleWatsonRequest(sentence)
{
  const analyzeParams = {
    'text': sentence.text,
    'features': {
      'keywords': {
        'limit': 3
      }
    }
  };

  naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      const keytext = analysisResults.result.keywords.map(keyword=>{return keyword.text});    
      sentence.keywords = keytext;
      console.log(sentence)
    })
    .catch(err => {
      console.log('error:', err);
    });
}


/////


  function AddKeywordsToContent(content) {
    content.sentences.forEach(element => {
      SingleWatsonRequest(element);
    });
  }

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
    return sentences.slice(0,7).map(sentence => (
      {
      text: sentence,
      images: [],
      keywords: []
    }));
  }
}

module.exports = robot;
