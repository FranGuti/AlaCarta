import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCurrentProduct } from '../../../redux/slices/currentRestaurantSlice';
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { RootState } from '../../../redux/store';
import { EditTag } from '../Tag';
import { IoIosAddCircle } from "react-icons/io";

const EditRestaurant = ({ openEdit, setOpenEdit }: { openEdit: boolean, setOpenEdit: (open: boolean) => void }) => {

    const { restaurantUrl } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const restaurant = useSelector((state: RootState) => state.currentRestaurant.restaurant)

    const name = "Nombre"
    const urlSuffix = "Url del restaurante"
    const paymentInfo = "CBU"
    const categoriesSection = "Categorias"
    const saveChanges = "Guardar Cambios"

    const [restaurantInfo, setRestaurantInfo] = useState({
        name: "",
        urlSuffix: "",
        paymentInfo: ""
    })
    const [currentCategories, setCurrentCategories] = useState<string[] | undefined>(restaurant?.productCategories);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setRestaurantInfo({ ...restaurantInfo, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setCurrentCategories(restaurant?.productCategories)
    }, [openEdit]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (async () => {
            try {
                const endpoint = `http://localhost:8080/api/${restaurantUrl}`
                const res = await axios.put(
                    endpoint,
                    {
                        name: restaurantInfo.name,
                        urlSuffix: restaurantInfo.urlSuffix,
                        paymentInfo: restaurantInfo.paymentInfo,
                        productCategories: currentCategories
                    },
                    {
                        withCredentials: true,
                    }
                );
                if (res.status !== 200) return
                const editedProduct = res.data;
                dispatch(setCurrentProduct(editedProduct))
                setOpenEdit(false);
                navigate(`/${restaurantInfo.urlSuffix}/dashboard`)
                window.location.reload() // --> TODO super SOS
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
                    <div className='bg-customBeige  2xl:w-1/2 w-11/12 p-5 rounded-3xl'>
                        <div className="m-5 border-2 border-customPink rounded-3xl">
                            <div className='relative flex'>
                                <div className='mt-8 mx-8 2xl:text-2xl text-lg'>
                                    {restaurant?.name}
                                    <hr className="mt-1 border-2 rounded-full border-customPink" />
                                    <AiFillCloseCircle className='absolute top-6  right-5 cursor-pointer h-12 w-12 hover:scale-125 transition-all' onClick={() => setOpenEdit(false)} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className='my-3 mx-8'>
                                <div className='  w-full flex gap-12'>
                                    <div className='flex flex-col w-2/5 gap-3'>
                                        <div>
                                            <label htmlFor="name" className="block text-lg text-customRed font-bold   ">{name}</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder={restaurant?.name}
                                                className="border-2 text-lg border-customPink rounded-lg px-4 py-2 w-full" />
                                        </div>
                                        <div>
                                            <label htmlFor="urlSuffix" className="block text-lg text-customRed font-bold ">{urlSuffix}</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                id="urlSuffix"
                                                name="urlSuffix"
                                                placeholder={restaurant?.urlSuffix}
                                                className="border-2 border-customPink rounded-lg text-lg px-4 py-2 w-full" />
                                        </div>
                                        <div>
                                            <label htmlFor="paymentInfo" className="block text-lg text-customRed font-bold mr-1">{paymentInfo}</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                id="paymentInfo"
                                                name="paymentInfo"
                                                placeholder={restaurant?.paymentInfo}
                                                className="border-2 border-customPink rounded-lg text-lg px-4 py-2 w-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className=' mr-10 mb-1 text-lg text-customRed font-bold '> {categoriesSection}</h1>
                                        <ShowAllCategories allCategories={currentCategories} setAllCategories={setCurrentCategories} />



                                    </div>
                                </div>
                                <button type="submit" className="bg-customRed text-white rounded-lg mt-5 px-4 h-10 text-lg py-2 font-bold hover:bg-customDarkRed transition-all">{saveChanges}</button>
                            </form>
                        </div>
                    </div>
                </>}
            </div>
        </>

    )
}




const ShowAllCategories = ({ allCategories, setAllCategories }: { allCategories: string[] | undefined, setAllCategories: React.Dispatch<React.SetStateAction<string[] | undefined>> }) => {

    const newCategoryText = "¡Nueva Categoria!"
    const [newCategory, setNewCategory] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(e.target.value)
    }

    const addCategory = () => {
        if (newCategory.trim() !== "" && !allCategories?.includes(newCategory)) {
            const updatedCategories = [...allCategories ?? [], newCategory];
            setAllCategories(updatedCategories);
            setNewCategory("");
        }
    };


    const removeFromCategories = ({ category }: { category: string }) => {
        const updatedCategories = allCategories?.filter((cat) => cat !== category);
        setAllCategories(updatedCategories);
    }

    return (
        <>
            <div className='flex flex-col text-left border-2 border-customRed rounded-3xl p-2 px-5 w-3/2 2xl:w-96'>
                <div className=' overflow-y-auto h-36'>
                    {allCategories?.map((category, index) => (
                        <div className='my-1 mx-3  rounded-3xl transition-all cursor-pointer' key={index}>
                            <EditTag title={category} customComponents='bg-customRed hover:bg-customDarkRed' onCancelClick={() => removeFromCategories({ category })} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-2 flex gap-1'>
                <input
                    onChange={handleChange}
                    type="text"
                    id="newCategory"
                    name="newCategory"
                    value={newCategory}
                    placeholder={newCategoryText}
                    className="border-2 border-customPink rounded-3xl text-lg h-10 px-3 w-full" />

                <div onClick={() => addCategory()}><IoIosAddCircle className=" cursor-pointer h-10 w-10 hover:scale-125 transition-all" /></div>
            </div>
        </>
    )
};

export default EditRestaurant;