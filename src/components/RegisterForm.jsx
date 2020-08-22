import React,{Component} from "react";
import Input from "./common/input";
import joi from "joi-browser";

class  RegisterForm extends Component {
    state = { 
        data:{username:"",password:"",email:""},
        errors:{}
     }
     Schema={
        username:joi.string().required(),
        password:joi.string().required(),
        email:joi.string().email()  
        
     };
     handleChange=(event)=>{
         const errors={...this.state.errors};
         const errorMessgae=this.validateProperty(event.target);
         if (errorMessgae)errors[event.target.name]=errorMessgae
         else delete errors[event.target.name]
         const {name,value}=event.target;
         const data={...this.state.data};
         data[name]=value;
         this.setState({data,errors});
     }
     handleSubmit=(event)=>{
        event.preventDefault();
        const errors=this.validate();
        if(errors) {
            this.state({...this.state.data,errors});
            return;
        }
        console.log(this.state.errors);
        this.doSubmit();
     }
     doSubmit=()=>{
         console.log("Submited");
     }
     validate=()=>{
         const {error}=joi.validate(this.state.data,this.Schema,{abortEarly:false});
         if(!error) return null;
         const errors={};
         for(let item of error.details){
             errors[item.path]=item.message;
         }
         return errors;

     }
     validateProperty=({name,value})=>{
         const obj={[name]:value};
         const {error}=joi.validate(obj,{[name]:this.Schema[name]});
         return error ?error.details[0].message:null;
     }
    render() { 
        return ( 
            <form onSubmit={this.handleSubmit} className="container">
            <Input 
            name="username" 
            value={this.state.data.username} 
            label="Username"   
            type="text"
            onChange={this.handleChange}
            error={this.state.errors.username}
            />
            <Input 
            name="password" 
            value={this.state.data.password} 
            label="Password"   
            type="password"
            onChange={this.handleChange}
            error={this.state.errors.password}
            />
            <Input 
            name="email" 
            value={this.state.data.emial} 
            label="Email"   
            type="email"
            onChange={this.handleChange}
            error={this.state.errors.email}
            />
            <button disabled={this.validate()} className="btn btn-primary mt-4">Register</button>
            </form>
         );
    }
}
 
export default RegisterForm;