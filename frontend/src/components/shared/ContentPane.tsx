import { ReactNode } from "react";

const ContentPane = ({children}: {children: ReactNode}) => {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className=" w-11/12 h-5/6 p-4 bg-customBeige rounded-3xl flex justify-center items-center">
                <div className="h-full w-full border-2 border-customPink rounded-3xl">
                    <div className="m-2 w-full">
                    {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentPane;