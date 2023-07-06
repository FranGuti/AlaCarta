import { useEffect, useState } from 'react'
import { RiDeleteBin7Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiSolidAddToQueue } from 'react-icons/bi'
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
import { Product } from '../../@types/product';
import DeleteProduct from './productActions/DeleteProduct';
import AddProduct from './productActions/AddProduct';
import { EditProduct } from './productActions/EditProduct';



const ProductActions = ({ selectedProduct }: { selectedProduct: Product | undefined }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    const icons = [
        { icon: <FaEdit className="2xl:w-11 2xl:h-11 w-8 h-8" />, action: () => setOpenEdit(true) },
        { icon: <RiDeleteBin7Line className="2xl:w-11 2xl:h-11 w-8 h-8" />, action: () => setOpenDelete(true) }
    ];

    return (
        <>
            <div className='absolute right-5 -top-12 flex gap-5'>
                {!selectedProduct ? (
                    <>
                        <div
                            className='hover:scale-150 transition-all cursor-pointer mt-10'
                            onClick={() => setOpenAdd(true)}>
                            <BiSolidMessageSquareAdd className="2xl:w-11 2xl:h-11 w-8 h-8" />
                        </div>
                        <AddProduct openAdd={openAdd} setOpenAdd={setOpenAdd} />
                    </>
                ) : (
                    <>
                        {icons.map((comp, index) => (
                            <div
                                key={index}
                                className='hover:scale-150 transition-all cursor-pointer'
                                onClick={comp.action}
                            >
                                {comp.icon}
                            </div>
                        ))}
                        <EditProduct openEdit={openEdit} setOpenEdit={setOpenEdit} selectedProduct={selectedProduct} />
                        <DeleteProduct openDelete={openDelete} setOpenDelete={setOpenDelete} selectedProduct={selectedProduct} />
                    </>
                )}
            </div>
        </>
    );
};



export { ProductActions };