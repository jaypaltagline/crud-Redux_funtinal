import React from 'react'

export default function Logininput({ name, label, type, value, error, showError,msg , onChange }) {

    return (

        <React.Fragment>
            <label>{label}:</label>
            <br />
            
            <input name={name} msg={msg} type={type}  value={value} onChange={onChange} error={error} />
            
            <br />
            <label>{showError && error}</label><br></br>
          
        </React.Fragment>

    )

}
