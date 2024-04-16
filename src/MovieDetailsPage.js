import React from 'react';
import { Link, useParams } from 'react-router-dom';

const MovieDetailsPage = ({ movies }) => {


// Nous utilisons ici { id } pour prendre la valeur du paramètre id de l'URL, cela nous aide à identifier les détails du film à afficher en fonction de l'ID dans l'URL.
// Le hook useParams() nous aide à accéder aux paramètres dans l'URL.
// Dans cet exemple, si notre URL est "/movie/123", id contiendra la valeur "123".
// Ainsi, nous pouvons identifier les détails du film à afficher en fonction de l'ID dans l'URL.
  const { id } = useParams();

// La partie movie.find lance une opération de recherche à l'intérieur du tableau movies.
// Nous utilisons parseInt(id) pour convertir l'ID extrait de l'URL, qui est initialement une chaîne de caractères, en un entier.
// Donc, l'ensemble de la condition : movie.id === parseInt(id) : cette condition vérifie si la propriété id de l'objet film actuel est égale à la valeur id extraite de l'URL.
  const movie = movies.find(movie => movie.id === parseInt(id));



//La partie suivante signifie que si aucun détail n'est disponible pour le film, nous affichons un message indiquant "Film non trouvé 
  if (!movie) {
    return <div>Movie not found!</div>;
  }



 //nous rendons les détails du film sélectionné, y compris son titre, sa description et sa note. De plus, nous fournissons un lien étiqueté "Précédent" pour naviguer vers la page d'accueil.
  return (
    <div>
        {/*displaying the movie title*/}
      <h2>{movie.name}</h2>
      <p>{movie.description}</p>
      <p>Genre: {movie.genre}</p>
        {/* link to navigate back to the home page*/}
      <Link to="/" className="btn btn-primary">Previous</Link>
      <div>
      <iframe width="560" height="315" src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 
      </div>
    </div>
  );
};

export default MovieDetailsPage;