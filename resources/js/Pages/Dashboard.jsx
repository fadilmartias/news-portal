import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            title,
            description,
            category,
        };

        Inertia.post("/news", data);
        setIsNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    useEffect(() => {
        if(!props.myNews) {
            Inertia.get('/news') 
        } 
        console.log(props);
        return ;
    }, [])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {isNotif && (
                                <div className="alert alert-success shadow-lg">
                                    <div className="text-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="stroke-current flex-shrink-0 h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>{props.flash.message}!</span>
                                    </div>
                                </div>
                            )}

                            <input
                                type="text"
                                placeholder="Judul"
                                className="input input-bordered w-full m-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Deskripsi"
                                className="input input-bordered w-full m-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Kategori"
                                className="input input-bordered w-full m-2"
                                value={category}
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
                <div className="p-5">
                    {props.myNews && props.myNews.length > 0 ? props.myNews.map((news, i) => {
                         return (
                            <div key={i}
                        className="card w-full lg:w-96 bg-base-100 shadow-xl m-3"
                    >
                        <div className="card-body">
                            <h2 className="card-title">
                                {news.title}
                            </h2>
                            <p>{news.description}</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-inline">{news.category}</div>
                                <div className="badge badge-outline">
                                    <Link href={route('edit.news')} method="get" as="button" data={{ id:news.id }}>edit</Link>
                                </div>
                                <div className="badge badge-outline">
                                <Link href={route('delete.news')} method="post" as="button" data={{ id:news.id }} onClick={() => setIsNotif(true)}>delete</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                         )
                    }) : <p>Anda belum memiliki berita</p>}
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
