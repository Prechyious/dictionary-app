import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { Api } from "./utils/api/Api";

import Search from "./components/Search";
import ResultDisplay from "./components/ResultDisplay";
import { Helmet } from "react-helmet-async";

function App() {
    const [searchWord, setSearchWord] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const request = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${Api}/${searchWord}`);
            const data = await res.json();

            if (data.title === "No Definitions Found") {
                setError("No results found for the given word.");
                setSearchResult(null);
            } else {
                setSearchResult(data[0]);
                setError(null);
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
            setSearchResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);
        request();
    };

    useEffect(() => {
        document.title = searchWord
            ? `${searchWord} - My Dictionary`
            : "My Dictionary";
    }, [searchWord]);

    return (
        <>
            <Helmet>
                <title>
                    {searchWord
                        ? `${searchWord} - My Dictionary`
                        : "My Dictionary"}
                </title>
            </Helmet>
            <Navigation />

            <Search
                searchWord={searchWord}
                setSearchWord={setSearchWord}
                handleSearch={handleSearch}
                error={error}
            />

            <ResultDisplay
                isLoading={isLoading}
                setSearchResult={setSearchResult}
                error={error}
                setError={setError}
                searchResult={searchResult}
            />
        </>
    );
}

export default App;
