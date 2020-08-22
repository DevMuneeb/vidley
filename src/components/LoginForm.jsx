import React, { useState } from "react";
import Input from "./common/input";
import joi from "joi-browser";

function LoginForm(){

    const [account,setaccount]=useState({
        username:'',
        password:'',
        errors:{}

    });
    const Schema={
        username:joi.string().required(),
        password:joi.string().required()
    };
   const  validate =()=>{
      const options ={abortEarly:false};
      const {username,password}=account;
      const result= joi.validate({username,password},Schema,options);
      if(!result.error) return null;
      const errors={}
      for(let item of result.error.details){
        errors[item.path[0]]=item.message;
      }
      return errors;

   }
   const validateProperty=({name,value})=>{
    const obj={[name]:value};
    const {error}=joi.validate(obj,{[name]:Schema[name]});
    return error ?error.details[0].message:null;
   }
    const handleSubmit = event =>{
        event.preventDefault();
        const errors=validate();
        setaccount(prev=>{
            
            return {

                ...prev,errors:errors || {}
            }
        });
        if(errors) return;
        console.log("form Submitted");
    }
    const handleChange= event =>{
        let key=event.target.name;
        let value=event.target.value;
        const errors={...account["errors"]};
        const errorMessage=validateProperty(event.target);
        if(errorMessage){ errors[event.target.name]=errorMessage}
        else delete errors[event.target.name];
        setaccount(prev=>{
            return {
                ...prev,[key]:value,errors
            }
        });
    }
    return (
    <div className="container">
    	<form onSubmit={handleSubmit}>
        <Input error={account.errors.username} name="username"  label="Username" value={account.username} type="text" onChange={handleChange}/>
        <Input error={account.errors.password} name="password" label="Password" value={account.password} type="password" onChange={handleChange}/>
        
            <button
             disabled={validate()}
             className="btn btn-primary mt-4">Login
            </button>
        </form>
    </div>
    );
}
export default LoginForm;