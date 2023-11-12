import React, { useState } from 'react';

const SexyFuckingForm = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted with values:', values);
        // Add your form submission logic here
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={values.firstName}
                onChange={handleChange}
                style={inputStyle}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
                style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
                Submit
            </button>
        </form>
    );
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '260',
    margin: '20px',
};

const inputStyle = {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const buttonStyle = {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    backgroundColor: '#4caf50',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
};

export default SexyFuckingForm;
