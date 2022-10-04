import React, { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Navbar from "@/Components/Navbar";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = () => {
        const data = {
            id: props.myNews.id,
            title,
            description,
            category,
        };

        Inertia.post("/news/update", data);
        setTitle("");
        setDescription("");
        setCategory("");
    }; console.log(props);
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="p-5">
                <div className="card w-full lg:w-96 bg-base-100 shadow-xl m-3">
                <div className="card-body">
                    <input
                        type="text"
                        placeholder="Judul"
                        className="input input-bordered w-full m-2"
                        defaultValue={props.myNews.title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Deskripsi"
                        className="input input-bordered w-full m-2"
                        defaultValue={props.myNews.description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Kategori"
                        className="input input-bordered w-full m-2"
                        defaultValue={props.myNews.category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <button
                        className="btn btn-primary m-2"
                        type="submit"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}
