import React from "react";
import Like from "./common/likes";

function MoviesTable(props){
    const {movies,onlike,ondelete}=props
    return(
        <table className="table">
        <thead>
            <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            </tr>
        </thead>
        <tbody>
            {
                movies.map(movie=>{
                 return(
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate }</td>
                        <td>
                            <Like 
                            liked={movie.liked}
                            onClick={()=>onlike(movie)}
                            >
                            </Like>
                        </td>
                        <td><button onClick={()=>ondelete({movie})} className="btn btn-danger">Delete</button></td>
                    </tr>)
                })
            }
        </tbody>
        </table>
    );
}

export default MoviesTable;