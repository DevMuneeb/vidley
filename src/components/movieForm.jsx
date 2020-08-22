import React,{Component} from "react";
import {getMovie,saveMovie} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import Input from "./common/input";
class MovieForm extends Component {
    state = { 
        data:{
            title: "",
            genreId:"",
            numberInStock:"",
            dailyRentalRate:""
        },
        genres:[],
        errors:{}
     }
    componentDidMount() {
        const genres=getGenres();
        this.setState({genres});
        if(this.props.match.params.id==="new") return ;
        const movie=getMovie(this.props.match.params.id);
        if(movie===undefined) this.props.history.replace("/not-found")
        else this.setState({data:this.mapToViewModel(movie)});
    }
    mapToViewModel=(movie)=>{
        return{
            _id:movie._id,
            title:movie.title,
            genreId:movie.genre._id,
            numberInStock:movie.numberInStock,
            dailyRentalRate:movie.dailyRentalRate
        }
    }
    handleChange=(event)=>{
        const data={...this.state.data};
        const {name}=event.target;
        if(name===""){
            data["genreId"]=event.target.value;
        }else{
            data[name]=event.target.value;
        }
        this.setState({data})
        console.log(this.state);        
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        saveMovie(this.state.data);
        this.props.history.push("/movies");

    }
    render() { 
        
        return ( 
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className="container">
                    <h1>MovieForm</h1>
                    <Input 
                    name="title" 
                    type="text"
                    label="Title"
                    value={this.state.data.title}
                    onChange={this.handleChange}
                    error={this.state.errors.title}
                    />
                    <div className="mt-4">
                    <label htmlFor="genre">Genre</label>
                    <select id="genre" onChange={this.handleChange} className="custom-select">
                    {
                        this.state.genres.map((genre)=>{
                            return(
                                <option  key={genre._id} name={genre.title} value={genre._id}>
                                {genre.name}
                                </option>                      
                            );
                        })

                    }
                    </select>
                    <Input 
                    name="numberInStock" 
                    type="number"
                    label="Number in Stock"
                    value={this.state.data.numberInStock}
                    onChange={this.handleChange}
                    error={this.state.errors.numberInStock}
                    />
                   <Input 
                    name="dailyRentalRate" 
                    type="number"
                    label="Rate"
                    value={this.state.data.dailyRentalRate}
                    onChange={this.handleChange}
                    error={this.state.errors.dailyRentalRate}
                    />
                    </div>
                    <button className="btn-primary btn-lg mt-4">Save</button>
                </form>
            </React.Fragment>
            
            );
    }
}
 
export default MovieForm;