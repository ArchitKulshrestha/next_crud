"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";

export const dynamic = "force-dynamic";

const Create = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreation = (e) => {
    e.preventDefault();

    fetch("/api/notes/create", {
      body: JSON.stringify({
        title,
        description,
        userId: session?.user.id,
      }),
      method: "POST",
    })
      .then((res) => {
        res.json();
        router.push("/");
        enqueueSnackbar("Note created successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error creating note", { variant: "error" });
      });
  };
  return (
    <section className="px-4 sm:px-20 py-4">
      <h1 className="text-2xl font-bold mb-4">Create Note</h1>
      <Link href="/">Back</Link>
      <form className="mt-10 w-full sm:w-1/2" onSubmit={handleCreation}>
        <div className="flex flex-col">
          <label className="text-sm font-bold" htmlFor="title">
            Title
          </label>
          <input
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
            required
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-200 rounded-lg p-2 mt-2 text-gray-900"
            id="description"
            name="description"
            placeholder="Enter description"></textarea>
        </div>
        <div className="mt-4">
          <button className="border-2 border-gray-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700">
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default Create;
