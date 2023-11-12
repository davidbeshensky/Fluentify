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
        popupDefinition.innerText = wordData.meanings.definitions[0].definition;
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
        const replacedText = text.replace(
          new RegExp(findWord, 'gi'),
          replaceWord
        );

        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
}

function replaceWordsFromJson(fetchedWordsData) {
  console.log('Words Data Recieved:', fetchedWordsData);

  fetchedWordsData.forEach((entry) => {
    if (!entry || !entry.word || !entry.translated) {
      console.warn('Invalid entry or missing data:', entry);
      return; // Skip this iteration if data is incomplete or invalid
    }
    const findWord = entry.word.toLowerCase();
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

fetchDataFromLocalApi(['automobile', 'car'], 'en', 'ja').then(
  (fetchedWordsData) => {
    if (fetchedWordsData && fetchedWordsData.every((entry) => entry)) {
      main(fetchedWordsData);
    } else {
      console.error('Fetched data is invalid or incomplete:', fetchedWordsData);
    }
  }
);
