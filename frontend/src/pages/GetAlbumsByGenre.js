import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import cat from "./drawings/loading_cat.gif";

const fetchAlbumsByGenre = async (genreId) => {
  const res = await axios.get(`http://localhost:8000/albums/genres/${genreId}`);
  return res.data;
};

function GetAlbumsByGenre({ albumGenre }) {
  const [showLoading, setShowLoading] = useState(true);
  
  // Fix the genreId extraction
  let genreId;
  try {
    // Check if albumGenre is a number or an object
    if (typeof albumGenre === 'number') {
      genreId = albumGenre;
    } else if (albumGenre && typeof albumGenre === 'object') {
      genreId = parseInt(Object.keys(albumGenre)[0], 10);
    } else {
      console.error("Invalid albumGenre:", albumGenre);
      genreId = undefined;
    }
  } catch (error) {
    console.error("Error extracting genreId:", error);
    genreId = undefined;
  }

  // Query for the albums
  const { data: albums, error, isLoading, refetch } = useQuery({
    queryKey: ["albumsByGenre", genreId],
    queryFn: () => fetchAlbumsByGenre(genreId),
    enabled: genreId !== undefined && !isNaN(genreId),
  });

  // Ensure loading state for at least 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);

  // Handle refresh function
  const handleRefresh = () => {
    window.location.reload();
  };

  // Render invalid genre ID message
  if (genreId === undefined) {
    return (
      <div className="error-container">
        <h2>Invalid Genre</h2>
        <p>Please select a valid genre to view albums.</p>
        <button onClick={() => window.history.back()} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="albums-by-genre-container">
      <h1 className="genre-title">
        {albums && albums.length > 0 ? 
          `Recommendations for you` : 
          'Loading Albums...'}
      </h1>
      
      {/* Content section */}
      <div className="albums-container">
        {(showLoading || isLoading) ? (
          <div className="loading-container">
            <img className="loading-cat" src={cat} alt="Loading..." />
            <p>Fetching amazing albums for you...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <h3>Oops! Something went wrong</h3>
            <p>{error.message}</p>
            <button onClick={() => refetch()} className="retry-button">Try Again</button>
          </div>
        ) : albums && albums.length > 0 ? (
          albums.map((album) => (
            <div className="album-card" key={album.id}>
              <a href={album.stream} target="_blank" rel="noopener noreferrer" className="album-link">
                <div className="album-details">
                  <img
                    className="album-cover"
                    src={album.cover}
                    alt={album.title}
                    loading="lazy"
                  />
                  <h3 className="album-title">{album.title}</h3>
                  <p className="album-artist">{album.artist}</p>
                  <p className="album-year">{album.year}</p>
                </div>
              </a>
              
            </div>
          ))
        ) : (
          <div className="no-albums">
            <h3>No Albums Found</h3>
            <p>There are no albums available in this genre.</p>
            <button onClick={() => window.history.back()} className="back-button">
              Browse Other Genres
            </button>
          </div>
        )}
       
      </div>
      <button onClick={handleRefresh} className="refresh-button">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="refresh-icon">
                  <path d="M23 4v6h-6"></path>
                  <path d="M1 20v-6h6"></path>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
                Retake ALQU!Z
              </button>
      <style jsx>{`
        /* Dark Mode Styling */
        .albums-by-genre-container {
          background-color: #121212;
          color: #e0e0e0;
          min-height: 100vh;
          padding: 2rem 1rem;
        }

        .genre-title {
          color: #bb86fc;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2.5rem;
          font-weight: 700;
        }

        .albums-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem;
        }

        .album-card {
          background-color: #1e1e1e;
          border-radius: 12px;
          overflow: hidden;
          width: 250px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        .album-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(187, 134, 252, 0.2);
        }

        .album-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .album-details {
          padding: 1rem 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .album-cover {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s;
        }

        .album-card:hover .album-cover {
          transform: scale(1.03);
        }

        .album-title {
          color: #bb86fc;
          margin: 0.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .album-artist, .album-year {
          margin: 0.25rem 0;
          font-size: 0.95rem;
          opacity: 0.8;
        }

        .refresh-button {
          background-color: transparent;
          color: #bb86fc;
          border: 1px solid #bb86fc;
          padding: 0.6rem 1rem;
          border-radius: 30px;
          
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          height:142px;
          margin-left:42%;
        }

        .refresh-button:hover {
          background-color: rgba(187, 134, 252, 0.1);
          transform: translateY(-2px);
        }

        .refresh-icon {
          animation: spin 6s linear infinite;
          animation-play-state: paused;
        }

        .refresh-button:hover .refresh-icon {
          animation-play-state: running;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 50vh;
        }

        .loading-cat {
          width: 200px;
          height: 200px;
          object-fit: contain;
        }

        .error-container, .error-message, .no-albums {
          background-color: #1e1e1e;
          border-radius: 8px;
          padding: 2rem;
          margin: 2rem auto;
          max-width: 500px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        .error-container h2, .error-message h3, .no-albums h3 {
          color: #cf6679;
          margin-bottom: 1rem;
        }

        .back-button, .retry-button {
          background-color: #bb86fc;
          color: #121212;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          margin-top: 1rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .back-button:hover, .retry-button:hover {
          background-color: #a370db;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .albums-container {
            gap: 1rem;
            padding: 0.5rem;
          }
          
          .album-card {
            width: calc(50% - 1rem);
          }
          
          .genre-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .album-card {
            width: 100%;
          }
          
          .loading-cat {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
}

export default GetAlbumsByGenre;