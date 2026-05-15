
function NotesInterface() {
    return (
        <div className="w-full h-screen bg-(--background) flex">
            <div className="min-w-1/5 bg-(--sideBar) flex flex-col">
                <div className="w-full flex flex-col px-6 py-4 border-b border-b-(--border)">
                    <h1 className="text-white font-bold text-xl">My notes</h1>
                    <div className="border border-(--border) rounded-md mt-4 px-3 py-1 bg-(--background) text-white flex gap-3 justify-center items-center">
                        <svg
                            className="w-5 h-5 text-gray-500"
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
                        <input type="search" name="searchBar" id="searchBar" className="" placeholder="Search notes..."></input>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="min-w-4/5"></div>
        </div>
    )
}

export default NotesInterface;