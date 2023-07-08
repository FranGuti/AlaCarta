import { GiPaintBrush } from "react-icons/gi"
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'
import { useState, CSSProperties } from "react";
import { FaEdit } from "react-icons/fa";

const Editor = () => {
    const [colorState, setColorState] = useState<any>({ rgb: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      }});
    const [deployColors, setDeployColors] = useState<boolean>(false);

    const handleClick = () => {
        setDeployColors(!deployColors);
    }

    const handleClose = () => {
        setDeployColors(false);
    }

    const handleChange = (color: any) => {
        setColorState(color);
    };

    const save = () => {
        // TODO set en la base de datos el estilo actual
        console.log(colorState.hex)
    }

    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '32px',
                borderRadius: '2px',
                background: `rgba(${colorState.rgb.r}, ${colorState.rgb.g}, ${colorState.rgb.b}, ${colorState.rgb.a})`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute' as const,
                zIndex: '2',
                bottom: '10px',
              },
            cover: {
                position: 'fixed' as const,
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    return (
        <div className="bg-customBeige rounded-l-3xl h-[75vh] flex flex-col justify-start ml-3 text-center items-center w-[20vw] p-8">
            <h1 className="flex text-3xl font-bold text-customRed mt-3">
                <GiPaintBrush className="mr-2" />
                Editar
            </h1>
            <hr className="flex bg-customPink h-1 w-40 mt-2 mb-4" />
            <div className="bg-white text-left flex flex-col border-2 w-full h-[53vh] mb-2 border-customPink rounded-3xl p-3 overflow-y-auto items-center">
                <h2 className="font-bold text-xl mt-5">Banner:</h2>
                <hr className="flex h-3 w-52 rounded-lg" />
                <small className="text-left">
                    Elija una imagen para mostrarse en la parte superior de la pantalla de su menú épico
                </small>

                <input className="m-2 border-2 border-customRed p-1 rounded-3xl" placeholder="URL de la imagen"></input>
                <h2 className="font-bold text-xl mt-5">Color:</h2>
                <hr className="h-1 w-52" />
                <div className="flex ">
                    <h2 className="m-2 text-left">Elige un color:</h2>
                    <div style={styles.swatch} onClick={handleClick}>
                        <div style={styles.color} />
                    </div>
                    {deployColors ? <div style={styles.popover}>
                        <div style={styles.cover} onClick={handleClose} />
                        <SketchPicker color={colorState.rgb} onChange={handleChange} />
                    </div> : null}
                </div>
            </div>
            <div className="flex justify-items-end items-center mt-3">
                <button className="rounded-3xl font-bold bg-green-600 p-2 ml-7 text-white" onClick={save}>Guardar</button>
            </div>

        </div>
    );
}


export default Editor;