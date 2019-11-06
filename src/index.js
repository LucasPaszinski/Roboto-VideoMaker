const readline = require("readline-sync");

function start() {
  const content = {};
  content.searchTerm = askAndReturnSearch();
  content.searchPrefix = askAndReturnPrefix();

  function askAndReturnSearch() {
    return readline.question("Type a Wikipedia search term:");
  }

  function askAndReturnPrefix()
  {
      const prefixes = ['Who is', 'What is','The History of']
      const selectedPrefixIndex = readline.keyInSelect(prefixes,'Choose one option:')
      const selectedPrefix = prefixes[selectedPrefixIndex];
      return selectedPrefix;
  }

  console.log(content);
}
start();
