import { useState } from 'react'
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import AddProduct from "./restaurantActions/AddProduct";
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin7Line } from 'react-icons/ri';
import DeleteRestaurant from './restaurantActions/DeleteRestaurant';
import EditRestaurant from './restaurantActions/EditRestaurant';


const RestaurantActions = () => {

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const icons = [
        { icon: <BiSolidMessageSquareAdd className="2xl:w-11 2xl:h-11 w-8 h-8" />, action: () => setOpenAdd(true) },
        { icon: <FaEdit className="2xl:w-11 2xl:h-11 w-8 h-8" />, action: () => setOpenEdit(true) },
        { icon: <RiDeleteBin7Line className="2xl:w-11 2xl:h-11 w-8 h-8" />, action: () => setOpenDelete(true) }
    ];

    return (
        <>
            <div className='absolute right-5 -top-12 flex gap-5'>
                {icons.map((comp, index) => (
                    <div
                        key={index}
                        className='hover:scale-150 transition-all cursor-pointer mt-10'
                        onClick={comp.action}
                    >
                        {comp.icon}
                    </div>
                ))}
                <AddProduct openAdd={openAdd} setOpenAdd={setOpenAdd} />
                <EditRestaurant openEdit={openEdit} setOpenEdit={setOpenEdit}/>
                <DeleteRestaurant openDelete={openDelete} setOpenDelete={setOpenDelete}/>
     
            </div>
        </>
    );
}

export default RestaurantActions;