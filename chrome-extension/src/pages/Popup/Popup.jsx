import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Popup.css';
import languages from '../../assets/languages.json'
import DropdownMenu from './components/DropdownMenu';
import Switch from '@mui/material/Switch';
import SexyFuckingForm from './components/SexyFuckingForm';
import { WordTable } from './components/wordTable';
import french100 from '../../assets/noun_frequency_lists/french_100.json';
import german100 from '../../assets/noun_frequency_lists/german_100.json';
import spanish100 from '../../assets/noun_frequency_lists/spanish_100.json';
import korean100 from '../../assets/noun_frequency_lists/korean_100.json';
import japanese100 from '../../assets/noun_frequency_lists/japanese_100.json';


if (localStorage.getItem('firstRun') === null) {
  localStorage.setItem("active_deck", "deck_spanish");
  localStorage.setItem("active", "yes");
  localStorage.setItem("definitions", "on");
  localStorage.setItem("deck_french", JSON.stringify(french100));
  localStorage.setItem("deck_german", JSON.stringify(german100));
  localStorage.setItem("deck_spanish", JSON.stringify(spanish100));
  localStorage.setItem("deck_korean", JSON.stringify(korean100));
  localStorage.setItem("deck_japanese", JSON.stringify(japanese100));
  localStorage.setItem('firstRun', "dsaijoisaj");
}



const retrieveWordsKnown = () => {
  const wc = localStorage.getItem("wordCount");
  if (wc === null) {
    localStorage.setItem("wordCount", 87);
    return 87;
  }
  else {
    return wc;
  }
}

const retrieveLanguageDecks = (lang) => {
  const wc = localStorage.getItem(`deck_${lang}`);
  if (wc === null) {
    const defaultItem = ([{
      "value": "spanish",
      "label": "spanish"
    }]);
    localStorage.setItem(`deck_${lang}`, JSON.stringify(defaultItem));

    return (defaultItem);
  }
  return JSON.parse(wc);
}

const SettingsPage = () => {

  const handleSelectedLangChange = (change) => {

  }


  const [selectedDeckLang, setSelectedLang] = useState("English");

  return (
    <div>
      <h5>Learning Data</h5>
      <DropdownMenu options={languages} setSelected={setSelectedLang} />
      <h4>Deck</h4>
      <WordTable words={french100} />
      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Highlight Definitions" />
      </FormGroup>
      <SexyFuckingForm />

    </div>
  )
}

const LogoDisplay = ({ setSettings }) => {
  return (
    <div style={{ "display": "flex", "flex": "1", "height": "auto" }}>
      <div>
        <h3>Fluentify</h3>
      </div>
      <div onClick={() => setSettings()}>
        <img
          src={"https://cdn-icons-png.flaticon.com/512/70/70314.png"}
          alt="Your Image"
          style={{
            width: '20%'
          }}
        />
      </div>
    </div>

  )
}

const handleStartStopChange = () => {
  const wc = localStorage.getItem(`extension_active`);
  if (wc === null) {
    const defaultItem = ([{
      "value": "spanish",
      "label": "spanish"
    }]);
    localStorage.setItem(`deck_${lang}`, JSON.stringify(defaultItem));

    return (defaultItem);
  }
  return JSON.parse(wc);
}

const Popup = () => {

  const [selectedLang, setSelectedLang] = useState("English");
  const [settings, setSettings] = useState(false);

  const toggleSettings = () => setSettings(!settings);

  if (settings) {
    return (
      <div>
        <LogoDisplay setSettings={toggleSettings} />
        <SettingsPage />
      </div>
    )
  }

  return (
    <div>

      <LogoDisplay setSettings={toggleSettings} />
      <p style={{ marginRight: '10px' }}>Words known: {retrieveWordsKnown()}</p>
      <p>Target Language</p>
      {/* FIX THIS */}
      <DropdownMenu options={languages} setSelected={setSelectedLang} />
      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked onChange={handleStartStopChange} />} label="Stop/Start" />
      </FormGroup>

    </div>

  );

};

export default Popup;
