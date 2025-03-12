import axios from "axios";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';


// Fetch album by ID
const fetchAlbum = async (albumId) => {
  const res = await axios.get(`http://localhost:8000/albums/${albumId}`);
  return res.data; // Assumes API returns a single album object, not an array
};

// Delete album function
const deleteAlbum = async (id) => {
  await axios.delete(`http://localhost:8000/albums/${id}`);
};

function SearchById() {
  const [albumId, setId] = useState("");
  const queryClient = useQueryClient(); // Query Client for cache management

  // Fetch album by ID
  const { data: album, error, isLoading } = useQuery({
    queryKey: ["album", albumId],
    queryFn: () => fetchAlbum(Number(albumId)), // Ensure ID is a number
    enabled: albumId !== "" && !isNaN(albumId), // Prevent invalid fetch
  });

  // Delete album mutation
  const mutation = useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(["album"]); // Refresh album data after deletion
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div id="album-search-container">
      <input
        className="search"
        placeholder="Enter Album ID"
        onChange={(e) => setId(e.target.value)}
        value={albumId}
      />

      {isLoading && <p>Loading album...</p>}

      {error && error.response?.status === 404 ? (
        <p>No album found with this ID.</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : null}

      {/* Display album */}
      {album && (
        <div className="album-card">
          <a href={album.stream} target="_blank" rel="noopener noreferrer">
  
            <img className="album-cover" src={album.cover} alt={album.title} />
            <h3>{album.title}</h3>
            <h4>{album.artist}</h4>
            <h5>{album.year}</h5>
          </a>
          <button onClick={() => handleDelete(album.id)} className="delete-button">
            Delete
          </button>
          <button
  style={{
    backgroundColor: "rgba(73, 52, 70, 0)", // Green color for Edit
    color: 'white',
    border: 'none',

    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px'
  }}
>
  <Link to={`/edit/${album.id}`} style={{ textDecoration: 'none', color: 'white' }}> 
    Edit
  </Link>
</button>
        </div>
      )}

      <style>{`
        #album-search-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 20px;
          padding: 20px;
          border-radius: 8px;
        }

        .search {
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 200px;
          font-size: 1rem;
        }

        .album-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          border: 1px solid white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(132, 132, 132, 0.1);
          width: 300px;
        }

        .album-cover {
          width: 200px;
          border-radius: 8px;
          box-shadow: 0px 3px 4px 5px rgba(255, 255, 255, 0.3);
        }

        .delete-button {
          background-color: rgb(128, 0, 0);
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          margin: 10px;
        }
      `}</style>
    </div>
  );
}

export default SearchById;
