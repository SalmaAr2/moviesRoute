import React from 'react';
import { Link } from 'react-router-dom';


//Ce composant affiche les détails de nos films, y compris son image, son titre, sa note et des boutons pour voir la description et regarder la bande-annonce
const MovieCard = ({ movie }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={movie.poster} className="card-img-top" alt={movie.name} />
      <div className="card-body">
        <h5 className="card-title">{movie.name}</h5>
        <p className="card-text">Rating: {movie.rating}</p>
        {/* Button to navigate to movie description */}
        <Link to={`/movie/${movie.id}`} className="btn btn-primary mr-2">See Description</Link>
        {/* Button pr ouvrir trailer dans une nvl page */}
        <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Watch Trailer</a>
      </div>
    </div>
  );
};

export default MovieCard;