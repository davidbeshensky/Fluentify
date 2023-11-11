import React from 'react';
import './Popup.css';
import '../../assets/languages.json'
import DropdownMenu from './components/DropdownMenu';
import Button from 'react-bootstrap/Button';
// import Select from 'react-dropdown-select';

const retrieveWordsKnown = () => {
  const wc = localStorage.getItem("word_count");
  if (wc === null) {
    localStorage.setItem("word_count", 0);
    return 0;
  }
  else {
    return wc;
  }
}

const Popup = () => {
  return (
    <div>
      <h1>Fluentify</h1>
      <p style={{ marginRight: '10px' }}>Words known: {retrieveWordsKnown()}</p>
      <div>
        <p>Target Language</p>
        <DropdownMenu />
      </div>

      <div>
        <p>Choose Deck</p>
        <DropdownMenu />
      </div>
      <div class="d-flex flex-row align-items-center justify-content-center">
        <Button class="mr-3" href="#">View</Button>
        <Button class="mr-3" href="#">Edit</Button>
        <Button class="mr-3" href="#">Create</Button>
      </div>
    </div>
  );
};

export default Popup;
