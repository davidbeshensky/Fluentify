import React, { useState } from 'react';

const tableHeaderStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
    padding: '10px',
    textAlign: 'left',
};

export const WordTable = ({ words }) => {
    const [wordList, setWordList] = useState(words);

    const handleRemoveRow = (englishWord) => {
        const updatedList = { ...wordList };
        delete updatedList[englishWord];
        setWordList(updatedList);
    };

    return (
        <div style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '200px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead style={{ background: '#f2f2f2' }}>
                    <tr>
                        <th style={tableHeaderStyle}>English Word</th>
                        <th style={tableHeaderStyle}>Foreign Word</th>
                        <th style={tableHeaderStyle}>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(wordList).map(([englishWord, foreignWord]) => (
                        <tr key={englishWord} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={tableCellStyle}>{englishWord}</td>
                            <td style={tableCellStyle}>{foreignWord}</td>
                            <td style={tableCellStyle}>
                                <img width="30px" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" onClick={() => handleRemoveRow(englishWord)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
