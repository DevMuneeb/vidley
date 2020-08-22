import React, { Component } from "react";
import joi from "joi-browser";

class Form extends Component {
    state = { data:{},errors:{} }
    validate =()=>{
        const options ={abortEarly:false};
        const {username,password}=this.state.data;
        const result= joi.validate({username,password},this.Schema,options);
        if(!result.error) return null;
        const errors={}
        for(let item of result.error.details){
          errors[item.path[0]]=item.message;
        }
        return errors;
  
     }
    validateProperty=({name,value})=>{
      const obj={[name]:value};
      const {error}=joi.validate(obj,{[name]:this.Schema[name]});
      return error ?error.details[0].message:null;
     }
    handleSubmit = event =>{
        event.preventDefault();
        const errors=this.validate();
        this.setState(prev=>{
            
            return {
                ...prev,errors:errors || {}
            }
        });
        if(errors) return;
        this.doSubmit();
    }
    handleChange= event =>{
        let key=event.target.name;
        let value=event.target.value;
        const errors={...this.state.errors};
        const errorMessage=this.validateProperty(event.target);
        if(errorMessage){ errors[event.target.name]=errorMessage}
        else delete errors[event.target.name];
        const data={...this.state.data};
        data[key]=value;
        this.setState({data,errors});
    }
}
 
export default Form;