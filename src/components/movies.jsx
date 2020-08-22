import React, { useState, useEffect } from "react";
import {getMovies} from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup  from "./listGroup";
import Paginate from "../utils/paginate";
import {getGenres} from "../services/fakeGenreService";

const Movies=()=>{
    const [moviestp,setmoviestp]=useState({
        allmovies:getMovies(),
        genres:[],
        movielength:4,
        selectedgenre:"",
        currentPage:1

    });
    useEffect(()=>{
         const genres=[{name:"All Genre"},...getGenres()];
        setmoviestp(prev=>{return{...prev,genres}});
    },[]);

    const FilterdMovies=moviestp["selectedgenre"] && moviestp["selectedgenre"]._id?
    moviestp["allmovies"].filter(movie=>movie.genre._id===moviestp["selectedgenre"]._id)
    :moviestp["allmovies"];
    const movies=Paginate(FilterdMovies,moviestp["currentPage"],moviestp["movielength"]);

    const handledelete=(movie)=>{

    }
    const handlelike=(movie)=>{
       let Movies=[...moviestp["allmovies"]];
       let index=Movies.indexOf(movie);
       Movies[index]={...Movies[index]};
       Movies[index].liked=!Movies[index].liked;
       setmoviestp(prev=>{return{...prev,allmovies:Movies}});
       
    }
    function handlepageChange(page){

    setmoviestp( prev =>{
        return {
            ...prev,currentPage:page
        }
    });
    }
    function handleGenreSelect(genre){
        setmoviestp(prev=>{
            return{...prev,selectedgenre:genre,currentPage:1}
        });
    }


    return(
        <div className="row p-4">
        <div className="col-lg-3 col-md-3">
        <ListGroup 
        items={moviestp["genres"]}
        selectedItem={moviestp["selectedgenre"]}
        onItemSelect={handleGenreSelect}
        />
        </div>
        <div className="col">
        {FilterdMovies.length===0?<p>No movies in database</p>:<p>{FilterdMovies.length} movies found</p>}
        <MoviesTable movies={movies} onlike={handlelike} ondelete={handledelete}></MoviesTable>
        <Pagination itemCount={FilterdMovies.length} pagesize={moviestp["movielength"]} currentPage={moviestp["currentPage"]} onPageChange={handlepageChange}/>
        </div>
 
        </div>
    );
}

export default Movies;