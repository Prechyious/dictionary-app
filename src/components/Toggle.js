import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

const Toggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
    };

    useEffect(() => {
        // Check if the user prefers dark mode
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        // Get the user's preference from local storage (if available)
        const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));

        // Set the initial theme based on the user's preference (if available)
        setDarkMode(storedDarkMode ?? prefersDarkMode);

        // Add or remove the 'dark' class to the body based on the user's preference
        if (storedDarkMode !== null) {
            document.body.classList.toggle("dark", storedDarkMode);
        } else {
            document.body.classList.toggle("dark", prefersDarkMode);
        }
    }, []);

    useEffect(() => {
        // Update the body class whenever darkMode changes
        document.body.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
        <div className="inline-flex items-center gap-5">
            <div
                onClick={toggleDarkMode}
                className={`relative h-5 w-10 rounded-full cursor-pointer
                ${darkMode ? "bg-blue-600" : "bg-gray-400"}
                tranistion-all duration-300ms`}
            >
                <span
                    className={`absolute top-[2px] h-4 w-4 bg-white rounded-full transition-all duration-300 ease-in-out
                    ${darkMode ? "left-[22px]" : "left-[2px]"} `}
                ></span>
            </div>
            {darkMode ? (
                <BsSun className="text-gray-400" />
            ) : (
                <BsMoon className="text-gray-400" />
            )}
        </div>
    );
};

export default Toggle;
