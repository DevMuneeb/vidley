import React from "react";

function Input ({name,value,label,type,onChange,error}){
    return(
    <div className="from-group mt-4">
    <label htmlFor={name} >
        {label}
    </label>
    <input id={name} type={type} value={value} onChange={onChange}  name={name} className="form-control"/>
    {error && <div className="alert alert-danger">{error}</div>}
    </div>);
}

export default Input;

 