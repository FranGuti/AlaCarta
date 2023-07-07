import { GiPaintBrush } from "react-icons/gi"

const Editor = () => {


    return (
        <div className="bg-customBeige rounded-l-3xl h-[75vh] flex flex-col justify-start ml-3 text-center items-center w-[20vw] p-8">
            <h1 className="flex text-3xl font-bold text-customRed mt-3">
                <GiPaintBrush className="mr-2" />
                Editar
            </h1>
            <hr className="flex bg-customPink h-1 w-40 mt-2 mb-4" />
            <div className="bg-white flex flex-col border-2 w-full h-[53vh] mb-2 border-customPink rounded-3xl p-3 overflow-y-auto items-center">
                <h2 className="font-bold text-xl mt-5">Imagen:</h2>
                <hr className="h-1 w-52 "/>
                <button className="m-2 border-2 border-customRed p-1 rounded-3xl">Seleccionar imagen</button>
                <h2 className="font-bold text-xl mt-5">Color:</h2>
                <hr className="h-1 w-52 "/>
                <button className="m-2 border-2 border-customRed p-1 rounded-3xl">Seleccionar color</button>
            </div>
            <div className="flex justify-items-end items-center mt-3">
                <button className="rounded-3xl font-bold bg-green-600 p-2 ml-7 text-white">Guardar</button>
            </div>

        </div>
    );
}


export default Editor;