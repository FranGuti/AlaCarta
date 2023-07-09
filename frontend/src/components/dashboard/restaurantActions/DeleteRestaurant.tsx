import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const DeleteRestaurant = ({ openDelete, setOpenDelete}: { openDelete: boolean; setOpenDelete: (open: boolean) => void }) => {

    const { restaurantUrl } = useParams()

    const warningText = "¿Está seguro que desea eliminar el restaurante?"
    const warningText2 = "¡Esta accion no se puede deshacer!"
    const remove = "Eliminar"
    const close = "Cerrar"

    const deleteRestaurant = () => {
        (async () => {
            try {
                const endpoint = `http://localhost:8080/api/${restaurantUrl}`
                const res = await axios.delete(
                    endpoint,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status !== 200) return
                window.location.reload() //TODO --> still sussy
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
                    <div className='bg-customDarkRed 2xl:w-fit rounded-3xl '>
                        <div className="mx-6 my-9 border-2 border-customPink rounded-3xl">
                            <h2 className='mt-8 mx-3 text-center text-2xl text-white font-semibold mb-2'>{warningText}</h2>
                            <h2 className='mt-2 mx-3 text-center text-2xl text-white font-semibold mb-2'>{warningText2}</h2>
                            <div className='flex justify-center items-center gap-16 my-4'>
                                <Link to="/" className=' w-fit h-fit  px-4 py-2 bg-customRed hover:bg-black transition-all text-white rounded-3xl cursor-pointer' onClick={() => deleteRestaurant()}>{remove}</Link>
                                <button className='  w-fit h-fit px-4 py-2 bg-customRed hover:bg-white hover:text-customRed transition-all text-white rounded-3xl cursor-pointer' onClick={() => setOpenDelete(false)}>{close}</button>
                            </div>
                        </div>
                    </div>}
            </div>
        </>


    )
}

export default DeleteRestaurant;