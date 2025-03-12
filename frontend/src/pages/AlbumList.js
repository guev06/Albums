import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import { useState } from "react";

const fetchAlbums = async () => {
  const res = await axios.get('http://localhost:8000/albums');
  return res.data;
};

const deleteAlbum = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/albums/${id}`);
    alert("Album Successfully Deleted");
  } catch (error) {
    console.error("Error deleting album:", error);
  }
};

function List() {
  const queryClient = useQueryClient();
  const { data: albums, error, isLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
    staleTime: 5000,
  });

  const mutation = useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries('albums');
    },
  });

  const [sortType, setSortType] = useState("year-asc");

  if (isLoading) return <p>Loading albums...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const sortedAlbums = [...albums].sort((a, b) => {
    if (sortType === "year-asc") return a.year - b.year;
    if (sortType === "year-desc") return b.year - a.year;
    if (sortType === "title-asc") return a.title.localeCompare(b.title);
    if (sortType === "title-desc") return b.title.localeCompare(a.title);
    if (sortType === "id-desc") return b.id - a.id;
  });

  return (
    <div>
      <div style={{ marginBottom: "10px", textAlign: "center", fontWeight:"bold",marginTop:90 }}>
        <label style={{ color: "purple", marginRight: "10px",fontWeight:"bold",margin:5}}>Sort by:</label>
        <select className="outer-div"
          onChange={(e) => setSortType(e.target.value)} 
          value={sortType} 
          style={{ padding: "5px", borderRadius: "5px", color:"purple",boxShadow: "0 0 8px 4px rgba(128, 0, 128, 0.7)", marginLeft:40,marginTop:20 }}
        >
          <option value="year-asc">Year (Ascending)</option>
          <option value="year-desc">Year (Descending)</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="id-desc">Recently Added</option>
        </select>
      </div>

      <ul className="outer-div" style={{ display: 'flex', flexWrap: 'wrap'}}>
        {sortedAlbums.map((i) => (
          <li className="cards" key={i.id} style={{ margin: '10px', position: 'relative' }}>
            <a 
              className="link-container" 
              href={i.stream} 
              target="_blank" 
              style={{ textDecoration: 'none', position: 'relative', display: 'block' }}
            >
              <img
                id="img"
                src={i.cover}
                alt={i.title}
                style={{ width: "200px", height: "auto", borderRadius: '5px' }}
              />
              <h3 className="cards-info" style={{ fontSize: '1.1em', color: 'white' }}>{i.title}</h3>
              <h4 className="cards-info" style={{ fontSize: '1em', color: '#777' }}>{i.artist}</h4>
              <h5 className="cards-info" style={{ fontSize: '0.9em', color: '#888' }}>{i.year}</h5>
            </a>
            
            <button
              onClick={() => handleDelete(i.id)}
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
                backgroundColor: "rgba(73, 52, 70, 0)",
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                margin: '10px'
              }}
            >
              <Link to={`/edit/${i.id}`} style={{ textDecoration: 'none', color: 'white' }}> 
                Edit
              </Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
