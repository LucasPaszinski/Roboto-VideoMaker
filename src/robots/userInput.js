const readline = require("readline-sync");

function userInput(content) {
  function askAndReturnSearch() {
    return readline.question("Type a Wikipedia search term:");
  }

  function askAndReturnPrefix() {
    const prefixes = ["Who is", "What is", "The History of"];
    const selectedPrefixIndex = readline.keyInSelect(
      prefixes,
      "Choose one option:"
    );
    const selectedPrefix = prefixes[selectedPrefixIndex];
    return selectedPrefix;
  }

  content.searchTerm = askAndReturnSearch();
  content.searchPrefix = askAndReturnPrefix();
  console.log(content);
}

module.exports = userInput