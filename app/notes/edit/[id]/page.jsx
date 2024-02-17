"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export const dynamic = "force-dynamic";
import { useSnackbar } from "notistack";

const EditNote = ({ params }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = params;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetch(`/api/notes/get/${id}`, {
      cache: "no-store",
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.Note.title);
        setDescription(data.Note.description);
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(title, description);

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`/api/notes/edit/${id}`, {
      body: JSON.stringify({
        title,
        description,
      }),
      method: "PUT",
    })
      .then((res) => {
        res.json();
        router.push("/");
        enqueueSnackbar("Note updated successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error updating note", { variant: "error" });
      });
  };

  return (
    <section className="px-4 sm:px-20 py-4">
      <h1 className="text-2xl font-bold mb-4">Update Note</h1>
      <Link
        className="border-2  px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700"
        href="/">
        Back
      </Link>
      <form onSubmit={handleUpdate} className="mt-10 w-full sm:w-1/2">
        <div className="flex flex-col">
          <label className="text-sm font-bold" htmlFor="title">
            Title
          </label>
          <input
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-200 rounded-lg p-2 mt-2 text-gray-900"
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-bold" htmlFor="description">
            Description
          </label>
          <textarea
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-200 rounded-lg p-2 mt-2 text-gray-900"
            id="description"
            name="description"
            placeholder="Enter description"></textarea>
        </div>
        <div className="mt-4">
          <button className="border-2 border-blue-400 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700">
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditNote;
