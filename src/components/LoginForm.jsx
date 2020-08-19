import React from "react";

function LoginForm(){
    const handleSubmit = event =>{
        event.preventDefault();
        console.log("form Submitted");
    }
    return (
    <div className="container">
    	<form onSubmit={handleSubmit}>
            <div className="from-group">
            <label htmlFor="username" className="display-4">
            <h1>
                Username
            </h1>
            </label>
            <input id="username" type="text" className="form-control"/>
            </div>
            <div className="from-group">
            <label htmlFor="password" className="display-4">
            <h1>
                Password
            </h1>
            </label>
            <input id="password" type="password" className="form-control"/>
            </div>
            <button className="btn btn-primary mt-4">Login</button>
        </form>
    </div>
    );
}
export default LoginForm;