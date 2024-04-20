import React from 'react';
import { Link, useParams } from 'react-router-dom';

const MovieDetailsPage = ({ movies }) => { //at first we define the MovieDetailsPage's component


//we are here using { id } to take the value of the id parameter from the URL, it helps us identify which movie details to display based on the ID in the URL
//the useParams() hook helps us access parameters in the URL
//for this exemple, if our URL is "/movie/123", id will contain the value "123"
//so we can identify which movie details to display based on the ID in the URL
  const { id } = useParams();

//the movie.find part starts a search operation inside the movies array
//we use the parseInt(id) to convert the id extracted from the URL, which is initially a string, into an integer
//(it is very necessary because movie.id is typically stored as a number, and we want to ensure that we're comparing two values of the same data type (both integers) when searching for the corresponding movie in the movies array)
//so the whole thing: movie.id === parseInt(id): this condition checks if the id property of the current movie object is equal to the id value extracted from the URL
  const movie = movies.find(movie => movie.id === parseInt(id));



//the following part means, if there's no details available for the movie, we display a message saying "Movie nit found!"
  if (!movie) {
    return <div>Movie not found!</div>;
  }



 //here we are rendering the details of the selected movie, including its title, description, and rating, in addiction we provide a link tagged with "Previous" to navigate back to the home page
  return (
    <div>
  
      <h2 style={{color: 'white'}}>{movie.name}</h2>

      <p style={{color: 'white'}}>{movie.description}</p>
      <p style={{color: 'white'}}>Rating: {movie.rating}</p>
        
      <Link to="/" className="btn btn-primary">Previous</Link>
      <div>
      <iframe width="560" height="315" src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 
      </div>
    </div>
  );
};

export default MovieDetailsPage;