import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Product } from '../../../@types/product';

const DeleteProduct = ({ openDelete, setOpenDelete, selectedProduct }: { openDelete: boolean; setOpenDelete: (open: boolean) => void, selectedProduct: Product }) => {

    const { restaurantUrl } = useParams()

    const warningText = "¿Está seguro que desea eliminar este producto?"
    const remove = "Eliminar"
    const close = "Cerrar"

    const deleteProduct = () => {
        (async () => {
            try {
                const endpoint = `http://localhost:8080/api/${restaurantUrl}/products/${selectedProduct._id}`
                const res = await axios.delete(
                    endpoint,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status !== 200) return
                setOpenDelete(false);
                window.location.reload()
            } catch (err) {
                return
            }
        })()
    };

    return (
        <>
            <div className={openDelete ? 'bg-black bg-opacity-25 fixed inset-0 z-10' : 'hidden'}></div>
            <div className={`${openDelete ? 'visible z-10' : 'h-0 w-0'} fixed pop-in-out z-10 inset-0  flex items-center justify-center transition-all`}>
                {openDelete &&
                    <div className='bg-customBeige 2xl:w-fit rounded-3xl '>
                        <div className="mx-6 my-9 border-2 border-customPink rounded-3xl">
                            <h2 className='mt-8 mx-3 text-center text-2xl text-customRed font-semibold mb-2'>{warningText}</h2>
                            <div className='flex justify-center items-center gap-3 my-4'>
                                <button className=' w-fit h-fit  px-4 py-2 bg-customRed hover:bg-customDarkRed transition-all text-white rounded-3xl cursor-pointer' onClick={() => deleteProduct()}>{remove}</button>
                                <button className='  w-fit h-fit px-4 py-2 bg-customRed hover:bg-customDarkRed transition-all text-white rounded-3xl cursor-pointer' onClick={() => setOpenDelete(false)}>{close}</button>
                            </div>
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default DeleteProduct;