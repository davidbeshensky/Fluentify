import React, { useState } from 'react';
import Select from 'react-select'

//https://react-select.com/home


const DropdownMenu = ({ options }) => {
    const [selected, setSelectOption] = useState("");
    //Pass this to props

    const handleSelectChange = (selectedOption) => {
        setSelectOption(selectedOption.value);
    };
    return (
        <div>
            <Select options={options} onChange={handleSelectChange} unstyled={false} />
        </div>
    );
};

export default DropdownMenu;
