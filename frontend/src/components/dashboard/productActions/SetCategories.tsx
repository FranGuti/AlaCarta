import { useState } from "react";
import { RootState } from "../../../redux/store";
import { EditTag } from "../Tag";
import { useSelector } from "react-redux";
import { BiSolidAddToQueue } from "react-icons/bi";

const SetCategories = ({ selectedCategories, setSelectedCategories }: { selectedCategories: string[], setSelectedCategories: React.Dispatch<React.SetStateAction<string[] >> }) => {

    const removeFromCategories = ({ category }: { category: string }) => {
        const updatedCategories = selectedCategories.filter((cat) => cat !== category);
        setSelectedCategories(updatedCategories);
    }

    return (
        <div className="relative">
            <div className="flex flex-col justify-center items-center gap-1 w-fit py-2 transition-all">
                <div className=''>
                    <SelectCategories selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                </div>
                <div className='flex gap-2'>
                    {selectedCategories.map((category, index) => (
                        <div key={index}>
                            <EditTag title={category} customComponents='bg-customRed' onCancelClick={() => removeFromCategories({ category })} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const SelectCategories = ({ selectedCategories, setSelectedCategories }: { selectedCategories: string[], setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>> }) => {

    const addCategories = "Agregar Categorias"

    const maxCategories = selectedCategories.length >= 3

    const [isOpen, setIsOpen] = useState(false);

    const allCategories = useSelector((state: RootState) => state.currentRestaurant.restaurant)?.productCategories

    const addToCategories = ({ category }: { category: string }) => {
        if (!selectedCategories.includes(category)) {
            const updatedCategories = [...selectedCategories, category];
            setSelectedCategories(updatedCategories);
            setIsOpen(false)

            return
        }
    }

    return (
        <>
            <button className={`
            ${maxCategories ? 'bg-gray-400 pointer-events-none' : 'bg-customDarkRed hover:scale-125 transition-all'}
            w-fit 
            h-fit 
            py-1 
            px-2 
            cursor-pointer 
            hover:scale-125 transition-all
            rounded-full 
            flex justify-center text-center gap-1 
            text-white text-lg font-bold`}
                onClick={() => setIsOpen((prev) => (!prev))}
                type='button'
            >
                {addCategories}
                <div className='mt-1'>
                    <BiSolidAddToQueue />
                </div>
            </button>
            <div className='relative'>
                {isOpen && <div className='overflow-y-auto scroll-m-1 z-10 absolute my-1 w-full h-28 bg-customRed bg-opacity-80 mt-2 rounded-3xl font-bold text-white text-lg transition-all'>
                    <div className='flex flex-col text-center items-center justify-center'>
                        {allCategories?.map((category, index) => (
                            <div className='my-1 mx-3 hover:bg-customDarkRed rounded-3xl w-10/12 transition-all cursor-pointer' key={index}>
                                <div onClick={() => addToCategories({ category })}>{category}</div>
                            </div>
                        ))}

                    </div>
                </div>}
            </div>
        </>
    )
}

export {SetCategories}