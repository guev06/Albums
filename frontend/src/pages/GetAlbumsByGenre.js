import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import cat from "./drawings/loading_cat.gif"
const fetchAlbumsByGenre = async (genreId) => {
  const res = await axios.get(`http://localhost:8000/albums/genres/${genreId}`);
  return res.data;
};

function GetAlbumsByGenre({ albumGenre }) {  // Destructure albumGenre from props
  console.log("albumGenre:", albumGenre);
  const [showLoading, setShowLoading] = useState(true);
  let genreId;
  try {
    genreId = parseInt(Object.keys(albumGenre)[0], 10); // Extract and convert to number
  } catch (error) {
    console.error("Invalid albumGenre object:", albumGenre);
    genreId = undefined;
  }

  console.log("Extracted genreId:", genreId, typeof genreId);

  const { data: albums, error, isLoading } = useQuery({
    queryKey: ["albumsByGenre", genreId],
    queryFn: () => fetchAlbumsByGenre(genreId), // genreId is already a number
    enabled: genreId !== undefined && !isNaN(genreId),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000); // Ensure loading state lasts at least 3 seconds
  
    return () => clearTimeout(timer); // Cleanup timeout
  }, []); // Empty dependency array to run once on component mount
  
  if (genreId === undefined) {
    return <p>Invalid genre ID.</p>;
  }

  return (
    <div id="album-container">
      {showLoading || isLoading ? (
        <img id="the-loading-cat" src={cat} alt="Loading..." style={{ width: "100px" }} />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : albums && albums.length > 0 ? (
        albums.map((album) => (
          <div className="album-card" key={album.id}>
            <a href={album.stream} target="_blank" style={{ textDecoration: 'none' }}><div className="album-details">
            <img
              className="album-cover"
              src={album.cover}
              alt={album.title}
              style={{ width: "200px", borderRadius: "8px", marginBottom: "10px" }}
            />
              <h3>{album.title}</h3>
              <p>Artist: {album.artist}</p>
              <p>Year: {album.year}</p>
            </div></a>
          </div>
        ))
      ) : (
        <p>No albums available for this genre.</p>
      )}
      <style>{`
      #album-container {
        padding: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: center; 
        margin-top: 50px;
        border-radius: 7px;
        width: 100%;
        gap: 20px;
        flex-wrap: wrap;
      }

      .album-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center; 
        margin-top: 30px;
        box-shadow: 0px 0px 6px 5px rgba(255, 255, 255, 0.5);
        border-color: rgb(255, 255, 255);
        border-radius: 7px;
        width: 22%;
      }

      #the-loading-cat {
          
          width: 500px !important;  /* Force width */
          height: 500px !important; /* Force height */
          display: block;
          margin: 800px auto;
          flex-shrink: 0;  /* Prevent shrinking */
        }

      .album-cover {
        margin-top: 18px;
        box-shadow: 0px 0px 6px 5px rgba(255, 255, 255, 0.5);
        border-color: rgba(255, 255, 255, 0.29);
      }
    `}</style>
    </div>
  );
}

export default GetAlbumsByGenre;
