import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentProduct } from '../../../redux/slices/currentRestaurantSlice'; 
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { SetCategories } from "./SetCategories";
import { Product } from '../../../@types/product'; 
import { Tag } from '../Tag';

const EditProduct = ({ openEdit, setOpenEdit, selectedProduct }: { openEdit: boolean, setOpenEdit: (open: boolean) => void, selectedProduct: Product }) => {

    const { restaurantUrl } = useParams()
    const dispatch = useDispatch();

    const name = "Nombre"
    const description = "Descripcion"
    const price = "Precio"
    const changeImage = "Cambiar Imagen"
    const saveChanges = "Guardar Cambios"
    const inStock = "En Stock"

    const [productInfo, setproductInfo] = useState({
        name: "",
        picture: "",
        description: "",
        price: ""
    })

    const [currentCategories, setCurrentCategories] = useState<string[]>(selectedProduct.productCategories)
    const [isAvailable, setIsAvailable] = useState(selectedProduct.isAvailable)


    console.log(currentCategories);
    

    useEffect(() => {
        setCurrentCategories(selectedProduct.productCategories)
        setIsAvailable(selectedProduct.isAvailable)
    }, [openEdit]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setproductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const handleChangeAvailability = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAvailable(e.target.checked);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (async () => {
            try {
                const endpoint = `http://localhost:8080/api/${restaurantUrl}/products/${selectedProduct._id}`
                const res = await axios.put(
                    endpoint,
                    {
                        name: productInfo.name,
                        picture: productInfo.picture,
                        price: parseInt(productInfo.price),
                        description: productInfo.description,
                        productCategories: currentCategories,
                        isAvailable: isAvailable,
                    },
                    {
                        withCredentials: true,
                    }
                );
                if (res.status !== 200) return
                const editedProduct = res.data;
                dispatch(setCurrentProduct(editedProduct))
                setOpenEdit(false);
                window.location.reload()
            } catch (err) {
                return
            }
        })()
    };

    return (
        <>
            <div className={openEdit ? 'bg-black bg-opacity-25 fixed inset-0 z-10' : 'hidden'}></div>
            <div className={`${openEdit ? 'visible z-20' : 'h-0 w-0'} fixed pop-in-out inset-0  flex items-center justify-center transition-all`}>
                {openEdit && <>
                    <div className='bg-customBeige  2xl:w-3/4 w-11/12 p-5 rounded-3xl'>
                        <div className="m-5 border-2 border-customPink rounded-3xl">
                            <div className='relative flex'>
                                <div className='mt-8 mx-8 2xl:text-2xl text-lg'>
                                    {selectedProduct.name}
                                    <hr className="mt-1 border-2 rounded-full border-customPink" />
                                    <AiFillCloseCircle className='absolute top-6  right-5 cursor-pointer h-12 w-12 hover:scale-125 transition-all' onClick={() => setOpenEdit(false)} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className='my-3 mx-8'>
                                <div className='mt-4  w-full'>
                                    <div>
                                        <label htmlFor="name" className="block text-lg text-customRed font-bold  2xl:text-2xl  ">{name}</label>
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder={selectedProduct.name}
                                            className="border-2 text-lg border-customPink rounded-lg px-4 py-2 w-5/6" />
                                    </div>
                                    <div className='mt-2'>
                                        <label htmlFor="description" className="block text-lg text-customRed font-bold  2xl:text-2xl">{description}</label>
                                        <textarea
                                            onChange={handleChange}
                                            id="description"
                                            name="description"
                                            placeholder={selectedProduct.description}
                                            className="border-2 border-customPink rounded-lg text-lg px-4 py-2 w-5/6 h-32 resize-none" />
                                    </div>
                                    <div className='md:flex gap-6 mt-3 '>
                                        <div className='mt-2'>
                                            <label htmlFor="price" className="block text-lg text-customRed font-bold mr-1  2xl:text-2xl">{price}</label>
                                            <input
                                                onChange={handleChange}
                                                type="number"
                                                id="price"
                                                name="price"
                                                placeholder={`${selectedProduct.price}`}
                                                className="border-2 border-customPink rounded-lg text-sm px-4 py-2 w-28" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="name" className="block text-lg text-customRed font-bold  2xl:text-2xl  ">{changeImage}</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                id="picture"
                                                name="picture"
                                                placeholder={selectedProduct.picture}
                                                className="border-2 text-sm border-customPink rounded-lg px-4 py-2 w-11/12" />
                                        </div>
                                       {openEdit && <SetCategories selectedCategories={currentCategories} setSelectedCategories={setCurrentCategories} />}
                                    </div>
                                    <div className='flex gap-14 items-center'>
                                        <button type="submit" className="bg-customRed text-white rounded-lg mt-5 px-4 h-10 text-lg py-2 font-bold hover:bg-customDarkRed transition-all">{saveChanges}</button>
                                        <div className='flex gap-3 mt-5'>
                                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"><Tag title={inStock} customComponents='bg-customDarkRed scale-125' /></span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer" checked={isAvailable} onChange={handleChangeAvailability} />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-customPink dark:peer-focus:ring-customOrange rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-customRed"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>}
            </div>
        </>

    )
}

export {EditProduct};