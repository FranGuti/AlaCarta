import { AiFillPlusCircle } from "react-icons/ai"
import { Category } from "../../@types/category"
import { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl"

const Categories = ({ categories, handleCategoryClick }: { categories: string[], handleCategoryClick: (category: string) => void }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [deployCategories, setDeployCategories] = useState(false);

    const handleDeployCategoriesClick = () => {
        setDeployCategories(!deployCategories);
        setIsAnimating(true);
    };

    const handleAnimationEnd = () => {
        if (!deployCategories)
            setIsAnimating(false);
    }

    const handleAnimationStart = () => {
        setIsAnimating(true);
    }

    return (
        <div className={`flex h-[75vh]
            ${deployCategories ? 'deploy-categories' : 'collapse-categories'}`}
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}>

            <div className={`bg-customBeige drop-shadow-2xl rounded-r-3xl ${isAnimating ? '' : 'absolute hidden'}`}>
                <div className="flex flex-col items-center h-full">
                    <h1 className="text-3xl font-bold text-customRed mt-24">Categorías</h1>
                    <hr className="bg-customPink h-1 w-52 mt-2" />

                    <div className='flex flex-col items-center overflow-y-auto mt-3 w-[15vw] mb-8'>
                        {categories.map((category, index) => (
                            <div key={index} onClick={() => handleCategoryClick(category)}>
                                <CategoryThumbnail category={category} />
                            </div>
                        ))}


                    </div>
                </div>
            </div>

            <CategoryButton deployButton={deployCategories} handleDeployCategoriesClick={handleDeployCategoriesClick} />
        </div>
    )
}

const CategoryThumbnail = ({ category }: { category: string }) => {
    return (
        <>
            <div className='bg-white rounded-lg mt-5 p-2 w-52 hover:scale-110 ease-in-out duration-200 text-center'>
                <div className='flex items-center'>
                    <div className='flex items-center justify-center ml-3'>
                        <AiFillPlusCircle className='text-customRed' />
                    </div>
                    <h1 className='flex-grow font-bold text-center items-center justify-center mr-2'>
                        {category.length > 25
                            ? category.substring(0, 25) + '...'
                            : category}
                    </h1>
                </div>
            </div>
        </>
    )
}

const CategoryButton = ({ deployButton, handleDeployCategoriesClick }: { deployButton: boolean, handleDeployCategoriesClick: () => void }) => {
    return (
        <div className="flex items-center h-full " onClick={handleDeployCategoriesClick}>
            <button className="bg-white rounded-r-full space-x-2 h-32 w-15 z-10">
                {deployButton ? <SlArrowRight className="text-customRed font-bold h-8 w-8 transition-transform duration-700 rotate-180" /> : <SlArrowRight className="text-customRed h-8 w-8 transition-transform duration-1000" />}
            </button>
        </div>
    )
}

export default Categories;