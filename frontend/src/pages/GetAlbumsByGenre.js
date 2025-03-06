import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

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
    <div id="album-search-container">
      {showLoading || isLoading ? (
        <img src="./drawings/loading_cat.gif" alt="Loading..." style={{ width: "100px" }} />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : albums && albums.length > 0 ? (
        albums.map((album) => (
          <div className="album-card" key={album.id}>
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
            </div>
          </div>
        ))
      ) : (
        <p>No albums available for this genre.</p>
      )}
    </div>
  );
}

export default GetAlbumsByGenre;
