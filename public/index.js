(function() {
  "use strict";

  const BASE_URL = "../";

  /**
   *  Add a function that will be called when the window is loaded.
   */
  window.addEventListener("load", init);

  /**
   *  CHANGE: Describe what your init function does here.
   */
  function init() {
    let problemNumInput = id("problem-number");
    problemNumInput.addEventListener("change", getProblem);
  }

  /**
   * Step 1: Write a function to "fetch" data from a URL (possibly with query/value pairs)
   */
  function getProblem() {
    let problemNum = id("problem-number").value;
    let url = BASE_URL + "problem/" + problemNum;
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(createDownload)
      .catch(console.log);    // use console.log or replace with more user-friendly error function
  }

  /**
   * Step 2: Write a function to do something with the response (if successful)
   */
  function createDownload(responseData) {
    const fileName = "README.md";
    let fileContents = "## " + responseData.title + "\n";
    fileContents += "\n" + "Link: " + responseData.link + "\n";
    fileContents += "\n" + "### Problem Description";
    fileContents += "\n" + responseData.description;
    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
    link.setAttribute('download', fileName);
    link.innerText = "Download generated README!"
    document.body.appendChild(link);
  }

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status === 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

})();
