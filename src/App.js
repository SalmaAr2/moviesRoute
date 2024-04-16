import bg from "./Image/bg.jpg";
import React, { useState } from 'react';
import MovieList from './MovieList';
import Filter from './Filter';
import Movies from './Movies';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetailsPage from "./MovieDetailsPage";
import MovieCard from "./MovieCard";

const App =()=> {
  const moviesData = Movies(); // movie data from Movies component
  const [movies, setMovies] = useState(Movies); // State pour stocker la liste de films
  const [filteredMovies, setFilteredMovies] = useState(movies); // State pour stocker les films filtrés
  const [showForm, setShowForm] = useState(false); // State pour contrôler l'affichage du formulaire
  const [formData, setFormData] = useState({ // State pour stocker les données du formulaire tant que l'ID, le nom, la description, la note, l'image et le genre
    id: movies.length + 1,
    name: '',
    description: '',
    rating: '',
    imageURL: '',
    genre: ''
  });

  //Gestion des changements dans les champs du formulaire en mettant à jour les données par défaut avec les nouvelles valeurs entrées par le user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  //Fonction permettant d'ajouter un nouveau film à la liste des films
  const addMovie = () => {
    // Vérification des champs requis
    if (!formData.name || !formData.description || !formData.rating || !formData.imageURL || !formData.genre) {
      alert('Make sure to fill out all fields.'); // Affiche une alerte si un champ requis est vide
      return;
    }

   //Création d'un nouvel objet représentant le film à ajouter à la liste 
    const newMovie = {
      id: formData.id,
      ...formData,
      imageUrl: URL.createObjectURL(formData.image), // we are assuming that the image is stored locally for now
    };

    setMovies([...movies, newMovie]); // Mise à jour de la liste des films avec le nouveau film ajouté
    setFilteredMovies([...movies, newMovie]); // Mise à jour de la liste filtrée des films avec le nouveau film ajouté

    // Réinitialisation du formulaire et masquage du formulaire d'ajout de film après l'ajout d'un film
   
    setFormData({
      id: movies.length + 1,
      name: "",
      description: "",
      rating: "",
      trailer: "",
      genre: "",
      image: null,
    });
    setShowForm(false);
  };

  const handleFilterChange = (type, value) => {
    //we define the function to handle filter changes
    let filtered;
    if (type === "title") {
      filtered = movies.filter((movie) => movie.name.includes(value));
    } else if (type === "rating") {
      filtered = movies.filter((movie) => movie.rating === value);
    }
    setFilteredMovies(filtered);
  };

  const toggleForm = () => {
    if (showForm) {
      setFormData({
        //here's the code that reset the form when we close it
        id: movies.length + 1,
        name: "",
        description: "",
        rating: "",
        trailer: "",
        genre: "",
        image: null,
      });
    }
    setShowForm(!showForm);
  };

  return (
    <Router>
<>
    
    <section style={{ //background
          backgroundImage: `url(${bg})`,
          position: "relative",
          backgroundPosition: "center",
          overflow: "hidden",
        }}>
         <Container className='my-5'>

        
         <h1 className='text-capitalize text-center fw-bold' style={{color: '#FF0303'}}>You Favourite Movies</h1>
         <button onClick={toggleForm}>
          {showForm ? "Close Form" : "Add New Movie"}
        </button>
      {/* Affichage du formulaire avec une opacité réduite en arrière-plan */}
      {showForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} required />
              <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} required />
              <input type="text" name="rating" placeholder="Rating" value={formData.rating} onChange={handleInputChange} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} required />
              <label for="fileUpload"></label>
              <input type="file" name="imageURL" placeholder="Image " value={formData.imageURL} onChange={handleInputChange} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} required />
              <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleInputChange} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} required />
              <button style={{ backgroundColor: '#f1948a', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={addMovie}>Add Movie</button>
            </div>
          </div>
        </div>
      )}
      
       {!showForm && (
        <button style={{ backgroundColor: '#d98880', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px'  }} onClick={() => setShowForm(true)}>Add Movie</button>
      )} 
      <Filter onFilterChange={handleFilterChange} />
      <MovieList movies={filteredMovies} />
      
         </Container>

         </section>

     
       
         <Routes>
          {/*'exact' garantit que le chemin doit correspondre exactement.
'path' spécifie le chemin de l'URL ("/").
'element' rend une <div> avec des cartes de films.
*/}
          <Route
            exact
            path="/"
            element={
              <div className="movie-grid">
                {filteredMovies.map((movie) => (
                  <div className="movie-card" key={movie.id}>
                    <MovieCard movie={movie} />{" "}
                    {/* Affichez la carte de film pour chaque film dans la liste. */}
                  </div>
                ))}
              </div>
            }
          />
          {/*Une route créée pour afficher la description de chaque film.
La partie "element" spécifie que une fois que la route est trouvée, elle rendra le composant MovieDetailsPage, en transmettant moviesData en tant que prop*/}
          <Route
            path="/movie/:id"
            element={<MovieDetailsPage movies={filteredMovies} />}
          />
        </Routes>
    </>
    </Router>
    

  );
}


export default App;