import axios from "axios"
import {useState, useEffect} from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {useFormik, Field} from "formik"
import {object,string,number} from "yup"

const AddAlbum = () => {
    
    const sendNewAlbum = async(albumData) => {
        console.log("mutation called")
        const albumSchema = {
            year: albumData.year,
            title: albumData.title,
            genre: albumData.genre,
            artist: albumData.artist,
            cover: albumData.cover,
            stream: albumData.stream,
            deleted: false 

        }
        const res = await axios.post("http://localhost:8000/albums/",albumSchema)
        return res.data
    }


    const mockGenres = [{id:1, name:"Jazz"},
         {id:2, name:"Soul"},
         {id:3, name:"R&B"},
         {id:4, name:"Alt R&B"},
         {id:5, name:"Indie Pop"},
         {id:6, name:"Indie Rock"},
         {id:7, name:"Alt Rock"},
         {id:8, name:"Pop"},
         {id:9, name:"Conscious Hip Hop"},
         {id:10, name:"Hip Hop"},
         {id:11, name:"Rap"},
         {id:12, name:"Alt Hip Hop"},
         {id:13, name:"Rock"},
         {id:14, name:"Metal"}
    ]

    //const mutation = useMutation({mutationFn: (form) => sendNewAlbum(form), invalidateQueries:['albums']});
    const mutation = useMutation({
        mutationFn: (form) => sendNewAlbum(form),
        onSuccess: () => {
          console.log("Album added successfully");
        },
        onError: (error) => {
          console.error("Error adding album:", error);
          console.error("Error adding album:", error.response?.data || error.message);
          alert(JSON.stringify(error.response?.data, null, 2)); // Show error in an alert
          // Display an error message to the user
        },
        invalidateQueries: ['albums']
    });

    const AlbumForm = useFormik({
        initialValues:{
            title:"",
            artist:"",
            year:"",
            genre:"",
            cover:"",
            stream:""
        },
        onSubmit: async(form) =>{
            console.log("submitted")
         mutation.mutate(form)
        },
        validationSchema: object({
            title: string().required("Title is Required"),
            year: number().required("Year is Required").min(1000, "What? Why you tryna add viking music?"),
            artist: string().required("Artist is Required"),
            cover: string().required("Cover link is Required"),
            stream: string().required("Streaming website link is Required"),
        })
    })

    return <>
    <h1 className="page-headings">Add Album</h1>
    <form style={{display:"flex",flexDirection: 'column',
          gap:10,justifyContent: 'center',alignItems: 'center'}} onSubmit={AlbumForm.handleSubmit}>

    <label>{"Title"}</label>
    <input className="add-input" name = "title" type="text" onChange={AlbumForm.handleChange} placeholder="enter title"></input>
    { AlbumForm.errors.title && (
        <div style={{color:'red'}}>{AlbumForm.errors.title}</div>
    )}
    <label>{"Year"}</label>
    <input className="add-input" name = "year" type="text" onChange={AlbumForm.handleChange} placeholder="enter year"></input>
    { AlbumForm.errors.year && (
        <div style={{color:'red'}}>{AlbumForm.errors.year}</div>
    )} 
    
    <label>{"Artist"}</label>
    <input className="add-input" name = "artist" type="text" onChange={AlbumForm.handleChange} placeholder="enter artist"></input>
    { AlbumForm.errors.artist && (
        <div style={{color:'red'}}>{AlbumForm.errors.artist}</div>
    )} 

    <label>{"Cover"}</label>
    <input className="add-input" name = "cover" type="text" onChange={AlbumForm.handleChange} placeholder="enter cover"></input>
    { AlbumForm.errors.cover && (
        <div style={{color:'red'}}>{AlbumForm.errors.cover}</div>
    )} 

    <label>{"Stream"}</label>
    <input className="add-input" name = "stream" type="text" onChange={AlbumForm.handleChange} placeholder="enter stream"></input>
    { AlbumForm.errors.stream && (
        <div style={{color:'red'}}>{AlbumForm.errors.stream}</div>
    )} 


<select
        name="genre"
        onChange={(e) => {
            const value = Number(e.target.value); // Ensure it's a number
            AlbumForm.setFieldValue("genre", value); // Use Formik's setFieldValue
        }}
        onBlur={AlbumForm.handleBlur}
        value={AlbumForm.values?.genre || ""}
    >
        <option value="">Select a genre</option> {/* Default option */}
        {mockGenres.map((g) => (
            <option key={g.id} value={g.id}>
                {g.name}
            </option>
        ))}
    </select>
    <br></br><button disabled={!AlbumForm.isValid} type="submit">Submit</button>
</form>

<style>{`
    #album-container {
        padding: 0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
        border-radius: 7px;
        width: 100%;
        gap: 20px;
        flex-wrap: wrap;
    }

    #the-loading-cat {
        width: 800px; /* Adjust size as needed */
        height: 800px;
        display: block;
        margin: 100px auto; /* Center horizontally */
        flex-shrink: 0;
    }

    /* ... your other styles ... */
`}</style>
    </>
}
export default AddAlbum



