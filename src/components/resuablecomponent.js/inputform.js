import React from 'react'

export default function Logininput({ name, label, type, value, error, showError, onChange }) {

    const errorsDetection = () => {
        if (!showError === false) {
            return error
        }
    }
    
    return (

        <React.Fragment>
            <label>{label}</label>
            <br />
            <input name={name} type={type} value={value} onChange={onChange} error={error}/>
            <br />
            <label>{errorsDetection()}</label>
            <br />
        </React.Fragment>

    )

}
