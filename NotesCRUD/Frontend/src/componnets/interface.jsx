import { useEffect, useState } from "react";

function NotesInterface() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeNote, setActiveNote] = useState({});
  const [filter, setFilter] = useState("All");
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [layoutMode, setLayoutMode] = useState("view");
  const [noteContent, setNoteContent] = useState({
    title: "",
    content: "",
    tag: ""
  });

  /** Set note selected in sidebar as activenote to display it in main layout 
  and if selectednote is chnaged suddenly in-between of creation of new note then automatically save that new note. **/
  useEffect(() => {
    const note = notes.find((note) => note._id === selectedNote)
    setActiveNote(note || null)

  }, [selectedNote, notes])

  async function confirmSave(id) {
    if (window.confirm("Window will close without saving the note")) {
      setSelectedNote(id);
      setLayoutMode('view')
    }
  }

  // Function to save new note into the DB. 
  async function addNotes() {
    try {
      if (!noteContent.title.trim()) {
        alert("Title is required")
        return
      }
      const response = await fetch("http://localhost:14526/notes/addNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteContent),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message)
        return
      }

      alert(data.message)

      await fetchNotes()

      setSelectedNote(data.id)

      setNoteContent({
        title: "",
        content: "",
        tag: ""
      });

      setLayoutMode("view")

    } catch (error) {
      console.log(error)
    }
  }

  async function fetchNotes() {
    try {
      const response = await fetch("http://localhost:14526/notes/getAll");
      const data = await response.json();
      setNotes(data);
      const uniqueTags = [...new Set(data.map(note => note.tag).filter(tag => tag?.trim()))];
      setTags(uniqueTags);

      if (!selectedNote && data.length > 0) {
        setSelectedNote(data[0]._id);
      }

      return data
    } catch (error) {
      console.log(error);
      return []
    }
  }
  // function to fetch all notes from the backend.
  useEffect(() => {
    fetchNotes();
  }, []);

  async function deleteNote(id) {
    try {
      if (!window.confirm("Are you sure about deleting the note?")) {
        return
      }
      const response = await fetch("http://localhost:14526/notes/deleteNote", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id
        })
      })
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message)
      const updatedNotes = await fetchNotes()

      if (selectedNote === id) {
        if (updatedNotes.length > 0) {
          setSelectedNote(updatedNotes[0]._id)
        } else {
          setSelectedNote(null)
        }
      }

    } catch (error) {
      console.log(error)
      console.log("Something went wrong")
    }
  }

  return (
    <div className="w-full h-screen bg-(--background) flex">
      <div className="w-1/5 bg-(--sideBar) flex flex-col min-w-60 shrink-0 border-r border-r-(--border)">
        <div className="w-full flex flex-col px-6 py-4 border-b border-b-(--border) ">
          <h1 className="text-white font-medium text-xl">My notes</h1>
          <div className="border border-(--border) rounded-md mt-2 px-3 py-0.5 bg-(--background) text-white flex items-center w-full">
            <div><i className="bi bi-search w-4 h-4 text-gray-400 shrink-0"></i></div>
            <input
              type="search"
              name="searchBar"
              id="searchBar"
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-0 flex-1 bg-transparent outline-none px-2 py-0.5 text-sm placeholder:text-gray-400"
              placeholder="Search notes..."
            ></input>
          </div>
        </div>
        <div className="w-full flex flex-wrap px-6 py-2 flex-row gap-2 text-[13px] text-gray-400">
          <p className={`border border-(--border) px-2.5 rounded-2xl cursor-pointer ${filter === "All" ? 'bg-indigo-400 text-gray-800' : ''}`} onClick={() => setFilter("All")}>
            All
          </p>
          {tags.map((tag) => (
            <p className={`border hover:bg-indigo-400 hover:text-gray-800 border-(--border) px-2.5 rounded-2xl cursor-pointer ${filter === tag ? 'bg-indigo-400 text-gray-800' : ''}`} key={tag} onClick={() => setFilter(tag)}>
              {tag}
            </p>
          ))}
        </div>
        <div className="w-full flex flex-1 flex-col px-3 py-2 hide-scrollbar overflow-y-scroll gap-1.5">
          {notes
            .filter((note) => filter === "All" || note.tag === filter)
            .filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
            .map((note) => (
              <div className={`p-4 rounded-lg text-base cursor-pointer ${layoutMode === "view" ? selectedNote === note._id ? 'border border-(--border) bg-(--background)' : '' : ""
                } hover:bg-(--background)`} key={note._id} onClick={() => { layoutMode === "create" ? confirmSave(note._id) : setSelectedNote(note._id) }
                }>
                <h1 className="text-white font-medium">{note.title}</h1>
                <p
                  className="truncate text-white text-sm mt-1
                        "
                >
                  {note.content}
                </p>
                <div className="flex items-center justify-between text-[13px] mt-2">
                  <p className="text-white">Yesterday</p>
                  <p className="border border-(--border) px-2.5 rounded-2xl text-indigo-400 bg-indigo-50">
                    {note.tag}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="bottom-0 left-0 px-6 py-4 border-t border-t-(--border) w-full bg-(--background) border-r border-r-(--border) scroll-hii">
          <div className="w-full border border-(--border) bg-(--background) rounded-md px-3 py-0.5 cursor-pointer" onClick={() => {
            setLayoutMode("create");

            setNoteContent({
              title: "",
              content: "",
              tag: ""
            });

          }}>
            <p className="text-center text-white hover:text-indigo-400"><i className="bi bi-plus-lg"></i> New note</p>
          </div>
        </div>
      </div>
      <div className="min-w-4/5">
        <div className="w-full border-b border-b-(--border) px-8 py-4 flex items-center justify-between">
          <div className="text-white">
            <h1>Notes / {layoutMode === "view" ? activeNote?.['title'] : noteContent.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            {layoutMode === "create" ? <i className="bi bi-floppy text-white cursor-pointer hover:text-indigo-400" onClick={() => {
              addNotes()
            }}></i> : ""}
            <i className="bi bi-trash text-white cursor-pointer hover:text-indigo-400" onClick={() => deleteNote(activeNote?.['_id'])}></i>
            {
              layoutMode === "create" ? <i className="bi bi-x-circle text-white cursor-pointer hover:text-red-600" onClick={() => {
                setLayoutMode("view"); setNoteContent({
                  title: "",
                  content: "",
                  tag: ""
                })
              }}></i> : ""
            }
          </div>
        </div>
        <div className="p-8 flex flex-col w-full">
          <div className="w-full border-b border-b-(--border) pb-6">
            <input type="text" onChange={(e) => { setNoteContent({ ...noteContent, title: e.target.value }) }} value={layoutMode === "view" ? activeNote?.['title'] || "" : noteContent.title} className={`w-full border border-(--border) p-2 rounded-md text-white font-medium ${layoutMode === "view" ? " cursor-default focus:outline-none" : ""}`} readOnly={layoutMode === "view" ? true : false} required name="noteTitle" id="noteTitle" />
            {/* <h1 className="border border-(--border) p-2 rounded-md text-white font-medium">
              {activeNote?.["title"]}
            </h1> */}
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
                {layoutMode === "view" ? <span className="text-sm">{activeNote?.createdAt &&
                  new Date(activeNote.createdAt).toLocaleDateString()}</span> : ""}
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
                <input type="text" value={layoutMode === "view" ? activeNote?.["tag"] || "" : noteContent.tag} readOnly={layoutMode === "view" ? true : false} required className={`${layoutMode === "view" ? "border border-(--border) px-2.5 rounded-2xl cursor-pointer text-[13px] focus:outline-none bg-indigo-400 text-gray-800 field-sizing-content" : ""}`} onChange={(e) => setNoteContent({ ...noteContent, tag: e.target.value })} />
                {/* <span className="text-sm">{activeNote?.["tag"]}</span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 w-full">
          <textarea name="" id="" className={`text-white text-base w-full resize-none focus:outline-none h-100 ${layoutMode === "view" ? " cursor-default" : ""}`} value={layoutMode === "view" ? activeNote?.["content"] || "" : noteContent.content} readOnly={layoutMode === "view" ? true : false} required onChange={(e) => setNoteContent({ ...noteContent, content: e.target.value })}></textarea>
          {/* <div className="text-white text-base">{activeNote?.["content"]}</div> */}
        </div>
      </div>
    </div>
  );
}

export default NotesInterface;
