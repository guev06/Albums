import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import { useState, useEffect } from "react";

const fetchAlbum = async (albumId) => {
    const res = await axios.get(`http://localhost:8000/albums/${albumId}`);
    return res.data;
};

const EditAlbum = () => {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [errorMessage, setErrorMessage] = useState("");

    const { data: albumData, isLoading, isError, error } = useQuery({
        queryKey: ["album", id],
        queryFn: () => fetchAlbum(id),
        enabled: isEditMode,
    });

    const sendAlbum = async (albumData) => {
        const albumSchema = {
            year: Number(albumData.year),
            title: albumData.title,
            genre: albumData.genre,
            artist: albumData.artist,
            cover: albumData.cover,
            stream: albumData.stream,
        };

        return isEditMode
            ? axios.put(`http://localhost:8000/albums/${id}`, albumSchema)
            : axios.post(`http://localhost:8000/albums`, albumSchema);
    };

    const mutation = useMutation({
        mutationFn: sendAlbum,
        onSuccess: () => {
            queryClient.invalidateQueries(["albums"]);
            navigate("/");
        },
        onError: (error) => {
            setErrorMessage("An error occurred. Please try again.");
            console.error("Mutation error:", error);
        },
    });

    const albumForm = useFormik({
        initialValues: {
            title: "",
            artist: "",
            year: "",
            genre: "",
            cover: "",
            stream: "",
        },
        enableReinitialize: true,
        onSubmit: (form) => {
            mutation.mutate(form);
        },
        validationSchema: object({
            title: string().required("Title is Required"),
            year: number().required("Year is Required").min(1000, "No Viking music!"),
            artist: string().required("Artist is Required"),
            cover: string().required("Cover link is Required"),
            stream: string().required("Streaming link is Required"),
        }),
    });

    useEffect(() => {
        if (albumData && Object.keys(albumForm.values).every(key => !albumForm.values[key])) {
            albumForm.setValues({
                title: albumData.title ,
                artist: albumData.artist ,
                year: albumData.year ,
                genre: albumData.genre ,
                cover: albumData.cover ,
                stream: albumData.stream ,
            });
        }
    }, [albumData, albumForm.setValues]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

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
    return (
        <div>
            <h1>{isEditMode ? "Edit Album" : "Add Album"}</h1>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            <form onSubmit={albumForm.handleSubmit}>
                <label>Title</label>
                <input
                    name="title"
                    value={albumForm.values.title}
                    onChange={albumForm.handleChange}
                    placeholder="Enter album title"
                />
                {albumForm.touched.title && albumForm.errors.title && (
                    <div style={{ color: "red" }}>{albumForm.errors.title}</div>
                )}

                <label>Year</label>
                <input
                    name="year"
                    value={albumForm.values.year}
                    onChange={albumForm.handleChange}
                    placeholder="Enter year"
                />
                {albumForm.touched.year && albumForm.errors.year && (
                    <div style={{ color: "red" }}>{albumForm.errors.year}</div>
                )}

                <label>Artist</label>
                <input
                    name="artist"
                    value={albumForm.values.artist}
                    onChange={albumForm.handleChange}
                    placeholder="Enter artist name"
                />
                {albumForm.touched.artist && albumForm.errors.artist && (
                    <div style={{ color: "red" }}>{albumForm.errors.artist}</div>
                )}
                
                <select
                name="genre"
                value={albumForm.values.genre}
                onChange={(e) => {
                    const value = Number(e.target.value); // Ensure it's a number
                    albumForm.setFieldValue("genre", value); // Use Formik's setFieldValue
                }}
                
            >
                <option value="">Select a genre</option> {/* Default option */}
                {mockGenres.map((g) => (
                    <option key={g.id} value={g.id}>
                        {g.name}
                    </option>
                ))}
            </select>
                <label>Cover</label>
                <input
                    name="cover"
                    value={albumForm.values.cover}
                    onChange={albumForm.handleChange}
                    placeholder="Enter cover link"
                />
                {albumForm.touched.cover && albumForm.errors.cover && (
                    <div style={{ color: "red" }}>{albumForm.errors.cover}</div>
                )}

                <label>Stream</label>
                <input
                    name="stream"
                    value={albumForm.values.stream}
                    onChange={albumForm.handleChange}
                    placeholder="Enter stream link"
                />
                {albumForm.touched.stream && albumForm.errors.stream && (
                    <div style={{ color: "red" }}>{albumForm.errors.stream}</div>
                )}

                <button type="submit" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default EditAlbum;