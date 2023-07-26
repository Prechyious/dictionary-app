import { FaSistrix } from "react-icons/fa";

const Search = ({ searchWord, setSearchWord, handleSearch, error }) => {
    return (
        <div className="mt-5 w-full">
            <form
                className="relative flex items-center w-full"
                onSubmit={handleSearch}
            >
                <input
                    className="w-full shadow-md px-5 py-2 border bg-transparent text-gray-600 rounded-full focus:outline-none transition-shadow duration-300 focus:shadow-lg placeholder:font-bold"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search..."
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                />
                <label
                    htmlFor="search"
                    className="absolute right-[10px] h-5 w-6 text-blue-700 font-bold text-2xl cursor-pointer"
                    onClick={handleSearch}
                >
                    <FaSistrix />
                </label>
            </form>
            {error && !error.includes("Error playing audio") && (
                <p className="text-gray-500 mt-2 font-normal italic">{error}</p>
            )}
        </div>
    );
};

export default Search;
