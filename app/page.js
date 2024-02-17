"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
export const dynamic = "force-dynamic";

export default function Home() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState(null);
  const id = session?.user?.id || "";

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/notes/byuser/${id}`, {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.Note);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <section className="px-4 sm:px-20 py-4">
      <nav className="flex justify-between items-center">
        <h1>
          <span className="md:text-2xl text-xl font-bold">Next Notes</span>
        </h1>
        {session ? (
          <div className="flex items-center gap-4">
            <span className="md:text-sm hidden sm:block text-xs font-bold">
              {session.user.name}
            </span>
            <button
              onClick={() => signOut()}
              className=" bg-red-500 text-whiteborder-2 border-gray-200 px-3 py-2 rounded-lg text-sm font-bold hover:bg-red-700">
              Sign Out
            </button>
            <Link
              className="border-2 border-blue-500 px-2 py-2 rounded-lg text-sm font-bold hover:bg-gray-700"
              href="/notes/create">
              Create{" "}
            </Link>
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Sign in
                </button>
              ))}
          </div>
        )}
      </nav>
      {!session ? (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-xl font-bold">
            Please sign in to see your notes
          </h1>
        </div>
      ) : loading ? (
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
