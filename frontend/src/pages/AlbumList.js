import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const fetchAlbums = async () => {
    const res = await axios.get('http://localhost:8000/albums')
    return res.data
}

const deleteAlbum = async (id) => {
    await axios.delete(`http://localhost:8000/albums/${id}`)
}


function List() {
    const queryClient = useQueryClient()

    const { data: albums, error, isLoading } = useQuery({
        queryKey: ['albums'],
        queryFn: fetchAlbums,
        staleTime: 5000,
    })

    const mutation = useMutation({
        mutationFn: deleteAlbum,
        onSuccess: () => {
            queryClient.invalidateQueries('albums')
        },
    })

    if (isLoading) return <p>Loading albums...</p>
    if (error) return <p>Error: {error.message}</p>

    const handleDelete = (id) => {
        // Trigger the delete mutation
        mutation.mutate(id)
    }

    return (
        <div>
           
            <ul id="outer-div" style={{ display: 'flex', flexWrap: 'wrap', paddingTop:20}}>
                {albums.map((i) => (
                    <li className="cards" key={i.id} style={{ margin: '10px' }}>
                        <a id="link-container" href={i.stream} target="_blank" style={{ textDecoration: 'none' }}>
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
                    </li>
                ))}
            </ul>

        </div>

    )
}

export default List
