import axios from 'axios';
import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { SetCategories } from '../productActions/SetCategories';

const AddProduct = ({ openAdd, setOpenAdd }: { openAdd: boolean, setOpenAdd: (open: boolean) => void }) => {

    const { restaurantUrl } = useParams()

    const title = "¡Agregando un producto nuevo!"
    const name = "Nombre"
    const description = "Descripcion"
    const price = "Precio"
    const addImage = "Agregar Imagen"
    const saveChanges = "Guardar Cambios"
    const namePlaceHolder = "Igrese aqui el nombre del producto"
    const descriptionPlaceHolder = "Ingrese una descripcion"
    const pricePlaceHolder = "$1.000"
    const addImagePlaceHolder = "Ingrese la URL de una Imagen (.png, .jpg)"


    const [productInfo, setproductInfo] = useState({
        name: "",
        picture: "",
        description: "",
        price: ""
    })

    const [currentCategories, setCurrentCategories] = useState<string[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setproductInfo({ ...productInfo, [e.target.name]: e.target.value })
        console.log(productInfo);

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (async () => {
            try {
                const endpoint = `http://localhost:8080/api/${restaurantUrl}/products`
                const res = await axios.post(
                    endpoint,
                    {
                        name: productInfo.name,
                        picture: productInfo.picture,
                        price: parseInt(productInfo.price),
                        description: productInfo.description,
                        productCategories: currentCategories,
                    },
                    {
                        withCredentials: true,
                    }
                );
                if (res.status !== 200) return
                setOpenAdd(false);
                window.location.reload()
            } catch (err) {
                console.log(err);
                console.log(productInfo);

                return
            }
        })()
    };


    return (
        <>
            <div className={openAdd ? 'bg-black bg-opacity-25 fixed inset-0 z-10' : 'hidden'}></div>
            <div className={`${openAdd ? 'visible z-20' : 'h-0 w-0'} fixed pop-in-out inset-0  flex items-center justify-center transition-all`}>
                {openAdd && <>
                    <div className='bg-customBeige  2xl:w-3/4 w-11/12 p-5 rounded-3xl'>
                        <div className="m-5 border-2 border-customPink rounded-3xl">
                            <div className='relative flex'>
                                <div className='mt-8 mx-8 2xl:text-2xl text-lg'>
                                    {title}
                                    <hr className="mt-1 border-2 rounded-full border-customPink" />
                                    <AiFillCloseCircle className='absolute top-6  right-5 cursor-pointer h-12 w-12 hover:scale-125 transition-all' onClick={() => setOpenAdd(false)} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className='my-3 mx-8'>
                                <div className='mt-4  w-full'>
                                    <div>
                                        <label htmlFor="name" className="block text-lg text-customRed font-bold  2xl:text-2xl  ">{name}</label>
                                        <input
                                            required
                                            onChange={handleChange}
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder={namePlaceHolder}
                                            className="border-2 text-lg border-customPink rounded-lg px-4 py-2 w-5/6" />
                                    </div>
                                    <div className='mt-2'>
                                        <label htmlFor="description" className="block text-lg text-customRed font-bold  2xl:text-2xl">{description}</label>
                                        <textarea
                                            onChange={handleChange}
                                            required
                                            id="description"
                                            name="description"
                                            placeholder={descriptionPlaceHolder}
                                            className="border-2 border-customPink rounded-lg text-lg px-4 py-2 w-5/6 h-32 resize-none" />
                                    </div>
                                    <div className='md:flex gap-6 mt-3 '>
                                        <div className='mt-2'>
                                            <label htmlFor="price" className="block text-lg text-customRed font-bold mr-1  2xl:text-2xl">{price}</label>
                                            <input
                                                onChange={handleChange}
                                                required
                                                type="number"
                                                id="price"
                                                name="price"
                                                placeholder={pricePlaceHolder}
                                                className="border-2 border-customPink rounded-lg text-sm px-4 py-2 w-28" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="name" className="block text-lg text-customRed font-bold  2xl:text-2xl  ">{addImage}</label>
                                            <input
                                                required
                                                onChange={handleChange}
                                                type="text"
                                                id="picture"
                                                name="picture"
                                                placeholder={addImagePlaceHolder}
                                                className="border-2  border-customPink rounded-lg px-4 py-2 text-sm w-80" />
                                        </div>
                                        <SetCategories selectedCategories={currentCategories} setSelectedCategories={setCurrentCategories} />
                                    </div>
                                    <div className='flex gap-14 items-center'>
                                        <button type="submit" className="bg-customRed text-white rounded-lg mt-5 px-4 h-10 text-lg py-2 font-bold hover:bg-customDarkRed transition-all">{saveChanges}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>}
            </div>
        </>
    );
};

export default AddProduct;