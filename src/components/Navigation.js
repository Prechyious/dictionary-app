import { LiaBookSolid } from "react-icons/lia";
import Toggle from "./Toggle";

const Navigation = () => {
    return (
        <nav className="flex items-center justify-between py-5">
            <div>
                <LiaBookSolid className="w-10 h-20 font-normal text-gray-400" />
            </div>

            <div>
                <Toggle />
            </div>
        </nav>
    );
};

export default Navigation;
