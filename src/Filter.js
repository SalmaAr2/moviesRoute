import React from 'react';

//this component allows users to filter movies by title and rating
const Filter = ({ onFilterChange }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <input
        type="text"
        placeholder="Search by title..."
        style={{
          marginRight: '10px',
          padding: '5px 10px',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}

    //when the user types something in the search bar, it updates the filter for movie titles
        onChange={(e) => onFilterChange('title', e.target.value)}/>
      <select
    //when the user choose a rating, it updates the movie list to display only movies with that rating
        onChange={(e) => onFilterChange('rating', e.target.value)}
        style={{
          marginRight: '10px',
          padding: '5px 10px',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}>

        <option value="">Filter by rating...</option>
        <option value="5/5">5/5</option>
        <option value="4/5">4/5</option>
        <option value="3/5">3/5</option>
        <option value="2/5">2/5</option>
        <option value="1/5">1/5</option>
      </select>
    </div>
  );
};

export default Filter;