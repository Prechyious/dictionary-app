import React from "react";
import { FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResultDisplay = ({ isLoading, searchResult, error, setError }) => {
    const playAudio = async () => {
        try {
            const phoneticAudioURLs = searchResult?.phonetics?.map(
                (track) => track.audio
            );

            if (phoneticAudioURLs && phoneticAudioURLs.length > 0) {
                // Use the first phonetic audio URL for playback
                const audio = new Audio(phoneticAudioURLs[0]);
                await audio.play();
            } else {
                console.error("No valid audio URL found.");
            }
        } catch (error) {
            setError("Error playing audio");
        }
    };

    if (isLoading) {
        return (
            <h1 className="mx-auto mt-[25%] text-gray-500 font-bold text-xl animate-pulse text-center">
                Loading...
            </h1>
        );
    }

    if (!searchResult) {
        return null;
    }

    return (
        <div>
            <div className="mt-10 inline-flex items-center justify-between w-full">
                <div>
                    <h1 className="uppercase font-bold text-3xl">
                        {searchResult?.word}
                    </h1>

                    {searchResult?.phonetics && (
                        <p className="font-bold text-blue-400">
                            {searchResult?.phonetics[0]?.text}
                        </p>
                    )}
                </div>

                <button
                    onClick={playAudio}
                    className="h-10 w-10 bg-blue-400 flex items-center justify-center rounded-full"
                >
                    <FaPlay className="text-blue-700" />
                </button>
            </div>

            {error === "Error playing audio" ? <p>{error}</p> : <p></p>}

            <div className="border-b-[1.5px] py-5">
                {searchResult.meanings.map((item) => (
                    <div key={item.partOfSpeech}>
                        <div className="inline-flex items-center justify-center gap-5 w-full mt-4">
                            <h3 className="font-bold text-lg italic">
                                {item.partOfSpeech}
                            </h3>
                            <span className="h-[1px] w-full bg-gray-300"></span>
                        </div>

                        <h4 className="text-gray-400 my-4 font-normal text-xl">
                            Meaning
                        </h4>

                        <ul className="ml-5">
                            {item.definitions.map((def, index) => (
                                <li
                                    className="list-disc font-semibold -tracking-tight marker:text-blue-700"
                                    key={index}
                                >
                                    {def.definition}
                                </li>
                            ))}
                        </ul>
                        {/* Synonyms */}
                        <div className=" mt-6 mb-5 inline-flex items-center gap-2 md:gap-5 flex-wrap">
                            {item.synonyms.length > 0 && (
                                <h3 className="text-gray-400 my-4 font-normal text-xl">
                                    Synonyms
                                </h3>
                            )}
                            <p className="font-semibold text-xl text-blue-500">
                                {item.synonyms.join(", ")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="my-10">
                <h3 className="text-gray-400 my-4 font-normal text-xl">
                    Source
                </h3>
                {/* Set the "to" prop with the source URL */}
                <Link
                    className="inline-flex items-center justify-center gap-2 text-gray-400 underline underline-offset-2"
                    to={searchResult?.sourceUrls?.[0]}
                    target="_blank"
                >
                    {searchResult?.sourceUrls?.[0]}
                    <FaExternalLinkAlt />
                </Link>
            </div>
        </div>
    );
};

export default ResultDisplay;
