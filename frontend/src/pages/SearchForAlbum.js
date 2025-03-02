import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchAlbum = async (albumId) => {
  const res = await axios.get(`http://localhost:8000/albums/${albumId}`);
  return res.data;
};

function SearchForAlbum() {
  const [albumId, setId] = useState("");

  const { data: album, error, isLoading } = useQuery({
    queryKey: ["album", albumId],
    queryFn: () => fetchAlbum(Number(albumId)),  // Ensure valid number
    enabled: albumId !== "" && !isNaN(albumId),  // Prevent invalid fetch
  });

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

      {album && (
        <div className="album-card">
          <img
            className="album-cover"
            src={album.cover}
            alt={album.title}
            style={{ width: "200px", borderRadius: "8px", marginBottom: "10px" }}
          />
          <div className="album-details">
            <h3>{album.title}</h3>
            <p>Artist: {album.artist}</p>
            <p>Year: {album.year}</p>
            {/* <p>Genre: {album.genre}</p> */}
          </div>
        </div>
      )}

<style jsx>{`
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
          width: 100%;
          border-radius: 8px;
          box-shadow: 0px 3px 4px 5px  rgba(255, 255, 255, 0.3);
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

export default SearchForAlbum;
