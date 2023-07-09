import { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { NavBar } from '../shared/NavBar';
import OrderControl from './OrderControl';
import OrderProcess from './OrderProcess';

const Orders = () => {
    const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"
    const [imageLoader, setImageLoader] = useState(false)

    const [openControl, setOpenControl] = useState(true);
    const [openProcess, setOpenProcess] = useState(false);

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoader(true)
        }
        img.src = src
    }, [src])


    return (
        <>
            <BackgroundImage src={src} imageLoader={imageLoader} />
            <div className="fixed inset-0 scale-100">
                <NavBar />
                <ViewOrder setOpenControl={setOpenControl} setOpenProcess={setOpenProcess} />
                {openControl && <OrderControl/>}
                {openProcess && <OrderProcess/>}

            </div>
        </>
    )
}

const ViewOrder = ({setOpenControl, setOpenProcess}:{setOpenControl: React.Dispatch<React.SetStateAction<boolean>>, setOpenProcess: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const [isOpen, setIsOpen] = useState(false);

    const control = "Control"
    const process = "Proceso"



    const options = [
        control,
        process 
    ]

    const changeView = (changedView: string) => {
        if (changedView === control) {
          setOpenControl(true);
          setOpenProcess(false);
        } else if (changedView === process) {
          setOpenControl(false);
          setOpenProcess(true);
        }
        setCurrentView(changedView);
        setIsOpen(false);
      };


    const [currentView, setCurrentView] = useState(control);
    return (
        <>
            <div className='absolute lg:right-10 z-10 bottom-3 2xl:bottom-12 flex opacity-70 hover:opacity-100'>
                <div className='flex flex-col-reverse gap-0.5 justify-center items-center w-screen lg:w-full'>
                    <div className='
                bg-customRed hover:bg-customDarkRed transition-all hover:border-customBeige
                rounded-2xl w-11/12 lg:w-52 h-fit lg:px-10 py-1
                border-2 border-customDarkRed  
                text-white font-bold text-center text-sm lg:text-lg 2xl:text-2xl 
                flex justify-center items-center
                cursor-pointer'
                        onClick={() => setIsOpen((prev) => (!prev))}>
                        {currentView}
                    </div>
                    {isOpen && <div className='
                    my-1
                    bg-customRed bg-opacity-75
                    text-white font-bold text-center text-sm lg:text-lg 2xl:text-2xl 
                     rounded-xl 2xl:rounded-3xl w-11/12 lg:w-full  h-fit  py-1 
                    flex flex-col justify-center items-center
                    '>
                        {options.map((option, index) => (
                            <div 
                            key={index} 
                            onClick={() => changeView(option)}
                            className='hover:bg-customDarkRed transition-all cursor-pointer my-1 w-11/12 px-10 rounded-3xl'>
                                {option}
                            </div>
                        ))}
                    </div>}
                </div>
            </div>
        </>
    )
};

function BackgroundImage({ src, imageLoader }: { src: string, imageLoader: boolean }) {
    return (
        <>
            {!imageLoader && (
                <Blurhash
                    hash='LYGRuJw^S5R*ysn%ozax4=R*t7n~'
                    resolutionX={32}
                    resolutionY={32}
                    punch={1} />
            )}
            {imageLoader && (
                <img
                    className="blur-lg object-cover object-center h-screen w-screen fixed"
                    src={src}
                    alt=""
                />
            )}
        </>
    )
}



export default Orders;