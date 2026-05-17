import { useEffect } from "react";
import { useState } from "react";

function NotesInterface() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
  async function getNotes() {
    try {
      const response = await fetch(
        "http://localhost:14526/notes/getAll"
      );

      const data = await response.json();

      setNotes(data);
    } catch (error) {
      console.log(error);
    }
  }

  getNotes();
}, []);

  return (
    <div className="w-full h-screen bg-(--background) flex">
      <div className="w-1/5 bg-(--sideBar) flex flex-col min-w-60 relative shrink-0">
        <div className="w-full flex flex-col px-6 py-4 border-b border-b-(--border)">
          <h1 className="text-white font-medium text-xl">My notes</h1>
          <div className="border border-(--border) rounded-md mt-2 px-3 py-0.5 bg-(--background) text-white flex items-center w-full">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="search"
              name="searchBar"
              id="searchBar"
              className="min-w-0 flex-1 bg-transparent outline-none px-2 py-0.5 text-sm placeholder:text-gray-400"
              placeholder="Search notes..."
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-wrap px-6 py-2 flex-row gap-2 text-[13px] text-gray-400 justify-around">
          <p className="border border-(--border) px-2.5 rounded-2xl bg-indigo-400 text-gray-800">
            All
          </p>
          <p className="border border-(--border) px-2.5 rounded-2xl">Work</p>
          <p className="border border-(--border) px-2.5 rounded-2xl">
            Personal
          </p>
          <p className="border border-(--border) px-2.5 rounded-2xl">Ideas</p>
          {/* <p className="border border-(--border) px-2.5 rounded-2xl">Projects</p> */}
        </div>
        <div className="w-full flex flex-col px-3 py-2">
          <div className="border border-(--border) p-4 rounded-lg bg-(--background) text-base">
            <h1 className="text-white font-medium">Project launch</h1>
            <p
              className="truncate text-white text-sm mt-1
                        "
            >
              finalize landing page, notify the Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Eum, voluptate.
            </p>
            <div className="flex items-center justify-between text-[13px] mt-2">
              <p className="text-white">Today</p>
              <p className="border border-(--border) px-2.5 rounded-2xl text-indigo-400 bg-indigo-50">
                Work
              </p>
            </div>
          </div>
          <div className="p-4 rounded-lg text-base">
            <h1 className="text-white font-medium">Book Recommendation</h1>
            <p
              className="truncate text-white text-sm mt-1
                        "
            >
              Atomic Habit, Deep Work, SICP Lorem ipsum dolor sit amet
              consectetur.
            </p>
            <div className="flex items-center justify-between text-[13px] mt-2">
              <p className="text-white">Yesterday</p>
              <p className="border border-(--border) px-2.5 rounded-2xl text-indigo-400 bg-indigo-50">
                Personal
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 px-6 py-4 border-t border-t-(--border) w-full">
          <div className="w-full border border-(--border) bg-(--background) rounded-md px-3 py-0.5">
            <p className="text-center text-white">+ New note</p>
          </div>
        </div>
      </div>
      <div className="min-w-4/5">
        <div className="w-full border-b border-b-(--border) px-8 py-4 flex items-center justify-between">
          <div className="text-white">
            <h1>Notes / Project Launch Checklist</h1>
          </div>
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="text-white"
              viewBox="0 0 16 16"
            >
              <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a5 5 0 0 0-.288-.076 5 5 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a5 5 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034q.172.002.343-.04L9.927 2.028q-.042.172-.04.343a1.8 1.8 0 0 0 .062.46z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="text-white"
              viewBox="0 0 16 16"
            >
              <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="text-white"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </div>
        </div>
        <div className="p-8 flex flex-col w-full">
          <div className="w-full border-b border-b-(--border) pb-6">
            <h1 className="border border-(--border) p-2 rounded-md text-white font-medium">
              Project launch Checklist
            </h1>
            <div className="flex gap-6 mt-3 text-white">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calendar-event"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
                <span className="text-sm">14 May 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-tag"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0" />
                  <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z" />
                </svg>
                <span className="text-sm">Work</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 w-full">
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, voluptates. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque quia expedita quisquam minus quas distinctio culpa nulla et qui illo atque, dolore sint accusantium consectetur! Exercitationem voluptatum eius reprehenderit. Accusamus!</div>
        </div>
      </div>
    </div>
  );
}

export default NotesInterface;
