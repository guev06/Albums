import axios from "axios"
import { useState, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import * as Yup from "yup";

// Function to send new album data to backend
const sendNewAlbum = async (albumData) => {
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
    const res = await axios.post("http://localhost:8000/albums/", albumSchema)
    return res.data
}

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
    { id: 14, name: "Metal" }
]

const AddAlbum = () => {
    // Mutation for adding album
    const mutation = useMutation({
        mutationFn: sendNewAlbum,
        onSuccess: () => {
            console.log("Album added successfully");
            alert("Album successfully added");
        },
        onError: (error) => {
            console.error("Error adding album:", error);
            alert("Failed to add album");
        }
    });

    const currentYear = new Date().getFullYear();

    // Formik initialization
    const AlbumForm = useFormik({
        initialValues: {
            title: "",
            artist: "",
            year: "",
            genre: "",
            cover: "",
            stream: ""
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required("Title is Required")
                .min(2, "Title must be at least 2 characters long")
                .max(100, "Title is too long!"),

            year: Yup.number()
                .required("Year is Required")
                .min(1000, "What? Why you tryna add Viking music?")
                .max(currentYear, "The year cannot be in the future!")
                .integer("Year must be a whole number"),

            artist: Yup.string()
                .required("Artist is Required")
                .min(2, "Artist name must be at least 2 characters")
                .max(100, "Artist name is too long!"),

            cover: Yup.string()
                .required("Cover link is Required")
                .url("Cover must be a valid URL")
                .test('is-image', 'Cover must be an image URL', async (value) => {
                    const isImageUrl = async (url) => {
                        try {
                            const response = await fetch(url, { method: 'HEAD' });
                            const contentType = response.headers.get('content-type');
                            return contentType && contentType.startsWith('image/');
                        } catch (error) {
                            return false;
                        }
                    };
                    return value ? await isImageUrl(value) : false;
                }),

            stream: Yup.string()
                .required("Streaming website link is Required")
                .url("Stream link must be a valid URL")
                .test('is-spotify', 'Stream link must be a valid Spotify URL', (value) => {
                    const isSpotifyLink = (url) => {
                        const spotifyRegex = /^https:\/\/open\.spotify\.com\/(album|track|playlist)\/[a-zA-Z0-9]+/;
                        return spotifyRegex.test(url);
                    };
                    return value ? isSpotifyLink(value) : false;
                })
        }),

        onSubmit: async (form) => {
            console.log("submitted");
            try {
                await mutation.mutateAsync(form); // Ensure mutation finishes before showing alert
                AlbumForm.resetForm(); // Reset form after successful submission
            } catch (error) {
                console.error("Error adding album:", error);
            }
        }
    });

    return (
        <div className="add-album-container">
            <h1>Add Album</h1>
            <form onSubmit={AlbumForm.handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        name="title"
                        type="text"
                        value={AlbumForm.values.title}
                        onChange={AlbumForm.handleChange}
                        onBlur={AlbumForm.handleBlur}
                        placeholder="Enter album title"
                    />
                    {AlbumForm.touched.title && AlbumForm.errors.title && (
                        <div className="error-message">{AlbumForm.errors.title}</div>
                    )}
                </div>

                <div className="form-group">
                    <label>Year</label>
                    <input
                        name="year"
                        type="text"
                        value={AlbumForm.values.year}
                        onChange={AlbumForm.handleChange}
                        onBlur={AlbumForm.handleBlur}
                        placeholder="Enter release year"
                    />
                    {AlbumForm.touched.year && AlbumForm.errors.year && (
                        <div className="error-message">{AlbumForm.errors.year}</div>
                    )}
                </div>

                <div className="form-group">
                    <label>Artist</label>
                    <input
                        name="artist"
                        type="text"
                        value={AlbumForm.values.artist}
                        onChange={AlbumForm.handleChange}
                        onBlur={AlbumForm.handleBlur}
                        placeholder="Enter artist name"
                    />
                    {AlbumForm.touched.artist && AlbumForm.errors.artist && (
                        <div className="error-message">{AlbumForm.errors.artist}</div>
                    )}
                </div>

                <div className="form-group">
                    <label>Genre</label>
                    <select
                        name="genre"
                        value={AlbumForm.values.genre || ""}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            AlbumForm.setFieldValue("genre", value);
                        }}
                        onBlur={AlbumForm.handleBlur}
                    >
                        <option value="">Select a genre</option>
                        {mockGenres.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Cover</label>
                    <input
                        name="cover"
                        type="text"
                        value={AlbumForm.values.cover}
                        onChange={AlbumForm.handleChange}
                        onBlur={AlbumForm.handleBlur}
                        placeholder="Enter album cover URL"
                    />
                    {AlbumForm.touched.cover && AlbumForm.errors.cover && (
                        <div className="error-message">{AlbumForm.errors.cover}</div>
                    )}
                </div>

                <div className="form-group">
                    <label>Stream</label>
                    <input
                        name="stream"
                        type="text"
                        value={AlbumForm.values.stream}
                        onChange={AlbumForm.handleChange}
                        onBlur={AlbumForm.handleBlur}
                        placeholder="Enter Spotify URL"
                    />
                    {AlbumForm.touched.stream && AlbumForm.errors.stream && (
                        <div className="error-message">{AlbumForm.errors.stream}</div>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={!AlbumForm.isValid || AlbumForm.isSubmitting}
                    className={mutation.isLoading ? "loading" : ""}
                >
                    {mutation.isLoading ? "Adding..." : "Add Album"}
                </button>
            </form>

            <style>{`
                /* Dark Mode Styling */
                .add-album-container {
                    background-color: #121212;
                    color: #e0e0e0;
                    padding: 2rem;
                    border-radius: 8px;
                    max-width: 600px;
                    margin: 2rem auto;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                }

                .add-album-container h1 {
                    color: #bb86fc;
                    margin-bottom: 1.5rem;
                    font-size: 2rem;
                    text-align: center;
                }

                .add-album-container form {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    width: 100%;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 1rem;
                    width: 100%;
                }

                .add-album-container label {
                    color: #bb86fc;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                }

                .add-album-container input,
                .add-album-container select {
                    background-color: #1e1e1e;
                    border: 1px solid #333;
                    border-radius: 4px;
                    padding: 0.75rem;
                    font-size: 1rem;
                    color: #e0e0e0;
                    transition: all 0.3s;
                    width: 100%;
                }

                .add-album-container input:focus,
                .add-album-container select:focus {
                    border-color: #bb86fc;
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(187, 134, 252, 0.3);
                }

                .add-album-container button {
                    background-color: #bb86fc;
                    color: #000;
                    border: none;
                    border-radius: 4px;
                    padding: 0.75rem;
                    margin-top: 1rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    width: 100%;
                }

                .add-album-container button:hover:not(:disabled) {
                    background-color: #a370db;
                    transform: translateY(-2px);
                }

                .add-album-container button:disabled {
                    background-color: #555;
                    cursor: not-allowed;
                    opacity: 0.7;
                }

                .add-album-container button.loading {
                    background-color: #6b46c1;
                    position: relative;
                    overflow: hidden;
                }

                .add-album-container button.loading::after {
                    content: "";
                    position: absolute;
                    left: -45%;
                    width: 45%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    top: 0;
                    animation: loading 1s infinite;
                }

                @keyframes loading {
                    0% {
                        left: -45%;
                    }
                    100% {
                        left: 100%;
                    }
                }

                .error-message {
                    color: #cf6679;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                }

                /* Placeholder styling */
                .add-album-container input::placeholder {
                    color: #888;
                }

                /* Option styling */
                .add-album-container option {
                    background-color: #1e1e1e;
                    color: #e0e0e0;
                }
            `}</style>
        </div>
    );
};

export default AddAlbum;