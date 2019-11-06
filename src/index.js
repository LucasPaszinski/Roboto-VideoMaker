function start() {
  const content = {};
  content.searchTerm = askAndReturnSearch();

  function askAndReturnSearch() {
    return "Termo";
  }

  console.log(content)
}
start();
