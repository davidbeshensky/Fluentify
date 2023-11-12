import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Popup.css';
import languages from '../../assets/languages.json'
import DropdownMenu from './components/DropdownMenu';
import Switch from '@mui/material/Switch';
import SexyFuckingForm from './components/SexyFuckingForm';

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'left',
};



const ItemTable = ({ items }) => {
  return (
    <div style={{ overflowY: 'scroll', maxHeight: '400px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead style={{ background: '#f2f2f2' }}>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tableCellStyle}>{item.id}</td>
              <td style={tableCellStyle}>{item.name}</td>
              <td style={tableCellStyle}>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



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
  const items = [
    { id: 1, name: 'Item 1', category: 'Category A' },
    { id: 2, name: 'Item 2', category: 'Category B' },
    { id: 3, name: 'Item 3', category: 'Category A' },
    // Add more items as needed
  ];

  return (
    <div>
      <h5>Learning Data</h5>
      <DropdownMenu options={languages} />
      <h3>Deck</h3>
      <ItemTable items={items} />
      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Definitions" />
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

  const [selectedLang, setSelectedLang] = useState("en");
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
      <DropdownMenu options={languages} setSelected={setSelectedLang} />
      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked onChange={handleStartStopChange} />} label="Stop/Start" />
      </FormGroup>

    </div>

  );

};

export default Popup;
