"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const DeleteNote = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`/api/notes/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.json();
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="px-4 sm:px-20 py-4">
      <h1 className="text-2xl font-bold mb-4">Delete Note</h1>
      <Link href="/">Back</Link>
      <p className="mt-4">Are you sure you want to delete this note?</p>
      <div className="mt-4">
        <button
          onClick={handleDelete}
          className="border-2 border-red-400 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700">
          Delete
        </button>
      </div>
    </section>
  );
};

export default DeleteNote;
