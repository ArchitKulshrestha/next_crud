"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/notes/get", {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.allNotes);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="px-4 sm:px-20 py-4">
      <nav className="flex justify-between items-center">
        <h1>
          <span className="text-2xl font-bold">Next Notes</span>
          <span className="text-sm font-light">v1.0.0</span>
        </h1>
        <div className="flex gap-4 items-center">
          <Link
            className="border-2 border-gray-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700"
            href="/notes/create">
            Create{" "}
          </Link>
          <Link
            className="border-2 border-gray-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700"
            href="/notes/create">
            SignIn{" "}
          </Link>
        </div>
      </nav>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-xl font-bold">Loading...</h1>
        </div>
      ) : (
        <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className=" rounded-lg shadow-md p-4 border-2 border-gray-200 min-h-32">
              <h2 className="text-xl font-bold">{note.title}</h2>
              <p className="text-base font-light">{note.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs font-light">
                  {new Date(note.createdAt).toString().split("GMT")[0]}
                </span>
                <Link
                  href={`notes/delete/${note._id}`}
                  className="text-xs font-bold text-red-500">
                  Delete
                </Link>
                <Link
                  href={`notes/edit/${note._id}`}
                  className="text-xs font-bold text-blue-500">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
