import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';


// Fetch albums by title
const fetchAlbum = async (title) => {
  const res = await axios.get(`http://localhost:8000/albums/search/title/${title}`);
  return res.data;
};

// Function to delete an album
const deleteAlbum = async (albumId) => {
  await axios.delete(`http://localhost:8000/albums/${albumId}`);
};

function SearchByTitle() {
  const [title, setTitle] = useState("");  
  const queryClient = useQueryClient(); // Fix: Define queryClient

  const { data: albums, error, isLoading } = useQuery({
    queryKey: ["album", title],
    queryFn: () => fetchAlbum(title),
    enabled: title.trim() !== "",  
  });

  const mutation = useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(["album", title]);
    },
  });

  // Ensure albums is always an array
  const displayAlbums = Array.isArray(albums) ? albums : albums ? [albums] : [];

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return ( 
    <div id="album-search-container">
      <input
        className="search"
        placeholder="Enter Album Title"
        onChange={(e) => setTitle(e.target.value)}  
        value={title}  
      />

      {isLoading && <p>Loading albums...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && displayAlbums.length === 0 && title.trim() !== "" && <p>No albums found.</p>}

      {displayAlbums.length > 0 && (
        <ul id="outer-div" style={{ display: 'flex', flexWrap: 'wrap', paddingTop: 20 }}>
          {displayAlbums.map((album) => (
            <li className="album-card" key={album.id} style={{ margin: '10px', position: 'relative' }}>
              <a 
                id="link-container" 
                href={album.stream} 
                target="_blank" 
                style={{ textDecoration: 'none', position: 'relative', display: 'block' }}
              >
                
                <img
                  id="img"
                  src={album.cover}
                  alt={album.title}
                  style={{ width: "200px", height: "auto", borderRadius: '5px' }}
                />
                <h3 className="cards-info" style={{ fontSize: '1.1em', color: 'white' }}>{album.title}</h3>
                <h4 className="cards-info" style={{ fontSize: '1em', color: '#777' }}>{album.artist}</h4>
                <h5 className="cards-info" style={{ fontSize: '0.9em', color: '#888' }}>{album.year}</h5>
              </a>
              <button
                onClick={() => handleDelete(album.id)}
                style={{
                  backgroundColor: "rgb(128, 0, 0)",
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  margin: '10px'
                }}
              >
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
            </li>
          ))}
        </ul>
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
          width: 250px;
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
          width: 100%;
          border-radius: 8px;
          box-shadow: 0px 3px 4px 5px rgba(255, 255, 255, 0.3);
        }

        .album-details {
          margin-top: 15px;
          text-align: center;
        }

        .album-details h3 {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .album-details p {
          font-size: 1rem;
          color: #555;
        }

        p {
          font-size: 1rem;
          color: #333;
        }
      `}</style>
    </div>
  );
}

export default SearchByTitle;
