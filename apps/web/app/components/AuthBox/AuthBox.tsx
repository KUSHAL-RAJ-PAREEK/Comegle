import AuthOptions from "../AuthOptions";
import AuthVideo from "../AuthVideo";

export default function AuthBox() {
    return (
        <div className="min-h-screen w-full flex justify-center items-center px-4">
            <div className="flex flex-col md:flex-row rounded-2xl bg-white w-full max-w-[900px]  md:h-[400px] h-[400px] overflow-hidden border border-gray-300">
                <div className="hidden md:flex md:w-1/2 justify-center items-center">
                    <AuthVideo />
                </div>
                <div className="w-full md:w-1/2 h-full flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                        <AuthOptions />
                    </div>
                </div>

            </div>
        </div>
    );
}