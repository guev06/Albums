import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import { useState, useEffect } from "react";

// Fetch the album to be edited
const fetchAlbum = async (albumId) => {
    const res = await axios.get(`http://localhost:8000/albums/${albumId}`);
    return res.data;
};

const EditAlbum = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch album data based on the ID (only if in edit mode)
    const { data: albumData, isLoading, isError, error } = useQuery({
        queryKey: ["album", id],
        queryFn: () => fetchAlbum(id),
        enabled: Boolean(id), // Only run the query if there's an album id
    });

    // Mutation for updating the album
    const sendAlbum = async (albumData) => {
        const albumSchema = {
            year: Number(albumData.year),
            title: albumData.title,
            genre: albumData.genre,
            artist: albumData.artist,
            cover: albumData.cover,
            stream: albumData.stream,
        };
        return axios.put(`http://localhost:8000/albums/${id}`, albumSchema);
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

    // Form initialization using Formik
    const albumForm = useFormik({
        initialValues: {
            title: albumData?.title || "",
            artist: albumData?.artist || "",
            year: albumData?.year || "",
            genre: albumData?.genre || "",
            cover: albumData?.cover || "",
            stream: albumData?.stream || "",
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

    if (isLoading) return <div className="loading">Loading...</div>;
    if (isError) return <div className="error">Error: {error.message}</div>;

    const mockGenres = [
        { id: 1, name: "Jazz" },
        { id: 2, name: "Soul" },
        { id: 3, name: "R&B" },
        { id: 4, name: "Alt R&B" },
        { id: 5, name: "Indie Pop" },
        { id: 6, name: "Indie Rock" },
        { id: 7, name: "Alt Rock" },
        { id: 8, name: "Pop" },
        { id: 9, name: "Conscious Hip Hop" },
        { id: 10, name: "Hip Hop" },
        { id: 11, name: "Rap" },
        { id: 12, name: "Alt Hip Hop" },
        { id: 13, name: "Rock" },
        { id: 14, name: "Metal" },
    ];

    return (
        <div className="edit-album-container">
            <style>
                {`
                    /* Dark Mode Styling */
                    .edit-album-container {
                        background-color: #121212;
                        color: #e0e0e0;
                        padding: 2rem;
                        border-radius: 8px;
                        max-width: 600px;
                        margin: 2rem auto;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                    }

                    .edit-album-container h1 {
                        color: #bb86fc;
                        margin-bottom: 1.5rem;
                        font-size: 2rem;
                        text-align: center;
                    }

                    .edit-album-container form {
                        display: flex;
                        flex-direction: column;
                    }

                    .edit-album-container label {
                        color: #bb86fc;
                        margin: 0.75rem 0 0.25rem;
                        font-weight: 500;
                    }

                    .edit-album-container input,
                    .edit-album-container select {
                        background-color: #1e1e1e;
                        border: 1px solid #333;
                        border-radius: 4px;
                        padding: 0.75rem;
                        margin-bottom: 0.5rem;
                        font-size: 1rem;
                        color: #e0e0e0;
                        transition: all 0.3s;
                    }

                    .edit-album-container input:focus,
                    .edit-album-container select:focus {
                        border-color: #bb86fc;
                        outline: none;
                        box-shadow: 0 0 0 2px rgba(187, 134, 252, 0.3);
                    }

                    .edit-album-container button {
                        background-color: #bb86fc;
                        color: #000;
                        border: none;
                        border-radius: 4px;
                        padding: 0.75rem;
                        margin-top: 1.5rem;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    }

                    .edit-album-container button:hover {
                        background-color: #a370db;
                    }

                    .edit-album-container button:disabled {
                        background-color: #555;
                        cursor: not-allowed;
                    }

                    .error-message, div[style*="color: red"] {
                        color: #cf6679 !important;
                        font-size: 0.875rem;
                        margin: 0.25rem 0 0.75rem;
                    }

                    .loading, .error {
                        text-align: center;
                        padding: 2rem;
                        color: #e0e0e0;
                    }

                    .error {
                        color: #cf6679;
                    }

                    /* Placeholder styling */
                    .edit-album-container input::placeholder {
                        color: #888;
                    }

                    /* Option styling */
                    .edit-album-container option {
                        background-color: #1e1e1e;
                        color: #e0e0e0;
                    }
                `}
            </style>
            <h1>Edit Album</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={albumForm.handleSubmit}>
                <label>Title</label>
                <input
                    name="title"
                    value={albumForm.values.title}
                    onChange={albumForm.handleChange}
                    placeholder="Enter album title"
                />
                {albumForm.touched.title && albumForm.errors.title && (
                    <div className="error-message">{albumForm.errors.title}</div>
                )}

                <label>Year</label>
                <input
                    name="year"
                    value={albumForm.values.year}
                    onChange={albumForm.handleChange}
                    placeholder="Enter year"
                />
                {albumForm.touched.year && albumForm.errors.year && (
                    <div className="error-message">{albumForm.errors.year}</div>
                )}

                <label>Artist</label>
                <input
                    name="artist"
                    value={albumForm.values.artist}
                    onChange={albumForm.handleChange}
                    placeholder="Enter artist name"
                />
                {albumForm.touched.artist && albumForm.errors.artist && (
                    <div className="error-message">{albumForm.errors.artist}</div>
                )}

                <label>Genre</label>
                <select
                    name="genre"
                    value={albumForm.values.genre}
                    onChange={(e) => albumForm.setFieldValue("genre", Number(e.target.value))}
                >
                    <option value="">Select a genre</option>
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
                    <div className="error-message">{albumForm.errors.cover}</div>
                )}

                <label>Stream</label>
                <input
                    name="stream"
                    value={albumForm.values.stream}
                    onChange={albumForm.handleChange}
                    placeholder="Enter stream link"
                />
                {albumForm.touched.stream && albumForm.errors.stream && (
                    <div className="error-message">{albumForm.errors.stream}</div>
                )}

                <button type="submit" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default EditAlbum;