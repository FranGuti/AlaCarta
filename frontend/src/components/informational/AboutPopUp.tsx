import { IoRestaurantSharp } from "react-icons/io5"

const AboutPopUp = ({ showAbout, setShowAbout }:
    { showAbout: boolean, setShowAbout: Function }) => {

    const handleClosePopUp = () => {
        setShowAbout(false)
    }

    return (
        <div className={`max-h-[90vh] max-w-[95vw] overflow-y-scroll fixed pop-in-out bg-customBeige drop-shadow-5xl  p-7 rounded-lg ${showAbout ? 'visible z-10' : ''}`}>
            <div onClick={handleClosePopUp} className="flex items-center justify-center rotate-hover cursor-pointer">
                <IoRestaurantSharp className="text-3xl sm:text-6xl text-customRed cross-icon" />
                <h1 className="text-3xl sm:text-6xl text-customRed">AlaCarta</h1>
            </div>
        </div>
    )
}

export default AboutPopUp