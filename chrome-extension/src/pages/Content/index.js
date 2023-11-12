import { printLine } from './modules/print';

console.log('Content script works!');
printLine("Using the 'printLine' function from the Print Module");

function fetchDataFromLocalApi(words, sourceLang, targetLang) {
  const url = 'http://localhost:8080/dictionary'; // Replace with your actual endpoint URL
  return Promise.all(
    words.map(async (word) => {
      const data = {
        word: word,
        source_lang: sourceLang,
        target_lang: targetLang,
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })
  );
}

function createSmileyPopup() {
  const popupDefinition = document.createElement('div');
  popupDefinition.style.cssText = `
    position: absolute; 
    display: none; 
    z-index: 1000;
    color: white;
    background: rgba(0, 0, 0, 0.7); // Transparent gray background
    border: 1px solid black; 
    padding: 5px;
    border-radius: 10px; // Rounded edges
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.8); // Box shadow
  `; // Updated styling with box shadow
  document.body.appendChild(popupDefinition);
  return popupDefinition;
}

function addEventListeners(popupDefinition, fetchedWordsData) {
  const words = document.querySelectorAll('.hover-word');
  words.forEach((wordElement) => {
    wordElement.addEventListener('mouseenter', (event) => {
      const wordData = fetchedWordsData.find(
        (item) =>
          item.translated === wordElement.textContent?.trim().toLowerCase()
      );
      if (
        wordData &&
        wordData.meanings &&
        wordData.meanings.definitions &&
        wordData.meanings.definitions.length > 0
      ) {
        popupDefinition.innerText = wordData.word;
      } else {
        popupDefinition.innerText = 'Definition not found';
      }

      // Position the pop-up near the word and show it
      popupDefinition.style.left = `${event.pageX}px`;
      popupDefinition.style.top = `${event.pageY}px`;
      popupDefinition.style.display = 'block';
    });

    wordElement.addEventListener('mouseleave', () => {
      // Hide the pop-up
      popupDefinition.style.display = 'none';
    });
  });
}

function wrapWords(wordsList) {
  const wordsRegex = new RegExp(`\\b(${wordsList.join('|')})\\b`, 'gi');
  document.body.innerHTML = document.body.innerHTML.replace(
    wordsRegex,
    "<span class='hover-word'>$1</span>"
  );
}

function replaceTextOnPage(findWord, replaceWord) {
  const elements = document.getElementsByTagName('*');

  for (let element of elements) {
    for (let node of element.childNodes) {
      if (node.nodeType === 3) {
        // Text node
        const text = node.nodeValue;
        const pluralSuffix = isPlural ? 's?' : '';
        const replacedText = text.replace(
          new RegExp(`\\b${findWord}${pluralSuffix}\\b`, 'gi'),
          replaceWord
        );

        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
}
var isPlural;
function replaceWordsFromJson(fetchedWordsData) {
  console.log('Words Data Recieved:', fetchedWordsData);

  fetchedWordsData.forEach((entry) => {
    if (!entry || !entry.word || !entry.translated) {
      console.warn('Invalid entry or missing data:', entry);
      return; // Skip this iteration if data is incomplete or invalid
    }
    const findWord = entry.word.toLowerCase();
    isPlural = findWord.endsWith('s');
    const replaceWord = entry.translated;
    replaceTextOnPage(findWord, replaceWord);
  });
}

function main(fetchedWordsData) {
  const wordsList = fetchedWordsData.map((item) => item.word.toLowerCase());
  wrapWords(wordsList);
  const popupDefinition = createSmileyPopup();
  addEventListeners(popupDefinition, fetchedWordsData);
  replaceWordsFromJson(fetchedWordsData);
}

function deactivate() {
  // Remove the smiley popup if it exists
  const popupDefinition = document.querySelector('.smiley-popup');
  if (popupDefinition != null) {
    document.body.removeChild(popupDefinition);
  }

  // Remove the hover-word class and event listeners from all words
  const words = document.querySelectorAll('.hover-word');
  words.forEach((wordElement) => {
    // Clone the node to remove event listeners
    const newElement = wordElement.cloneNode(true);
    // Replace the word element with its clone (without event listeners)
    wordElement.parentNode.replaceChild(newElement, wordElement);
  });

  // Remove the 'hover-word' spans, reverting to the original text
  document.body.innerHTML = document.body.innerHTML.replace(
    /<span class='hover-word'>(.*?)<\/span>/gi,
    '$1'
  );
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'storeData') {
    // or do other stuff
    if (request.activate === false) {
      deactivate();
      window.location.reload(); // Reload the page
    } else {
      fetchDataFromLocalApi(request.data, 'en', request.language).then(
        (fetchedWordsData) => {
          if (fetchedWordsData && fetchedWordsData.every((entry) => entry)) {
            main(fetchedWordsData);
          } else {
            console.error(
              'Fetched data is invalid or incomplete:',
              fetchedWordsData
            );
          }
        }
      );
    }
  }
});
