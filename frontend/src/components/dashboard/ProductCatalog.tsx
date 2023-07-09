import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import axios from 'axios'
import { setCurrentProduct } from '../../redux/slices/currentRestaurantSlice'
import { Product } from '../../@types/product'
import { Tag } from './Tag'


const ProductCatalog = () => {

    const dispatch = useDispatch();

    const catalogTitle = "Catálogo de Productos"

    const [filterBy, setfilterBy] = useState("");
    
    const { restaurantUrl } = useParams()
    
    const [products, setProducts] = useState<Product[] | null>();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/${restaurantUrl}/products?category=${filterBy}`,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status === 404) return
                setProducts(res.data)
            } catch (err) {
                return
            }
        };
        fetchProducts()
    }, [filterBy]);
    
    const handleProductClick = (product: Product | null) => {
        dispatch(setCurrentProduct(product))
    }
    

    return (
        <div className="z-10  absolute bg-customBeige rounded-r-3xl w-96 h-screen flex flex-col items-center justify-center">
            
                <h1 className="text-3xl font-bold text-customRed mt-12">{catalogTitle}</h1>
                <hr className="bg-customPink h-1 w-72 my-2" />
                <div className='w-80'>
                    <ShowProducts filterState={[filterBy, setfilterBy]} handleProductClick={handleProductClick} />
                    <div className='overflow-y-auto 2xl:h-[44rem] h-[25rem]'>
                        {products?.map((product, index) => (
                            <div key={index} onClick={() => handleProductClick(product)}>
                                <ProductThumbnail product={product} />
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    )
}


const ShowProducts = ({ filterState, handleProductClick }: { filterState: [string, React.Dispatch<React.SetStateAction<string>>], handleProductClick: (product: Product | null) => void }) => {

    const categories = useSelector((state: RootState) => state.currentRestaurant.restaurant)?.productCategories

    const [filterBy, setfilterBy] = filterState;

    const [isOpen, setIsOpen] = useState(false);

    const allProductos = "Mostrar todos los productos"


    const showAllProdcuts = () => {
        setfilterBy("")
        handleProductClick(null)
        setIsOpen(false)
    }

    return (
        <div className=" my-0.5 relative">
            <button onClick={() => setIsOpen((prev) => (!prev))}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-customRed hover:bg-customDarkRed  font-bold text-xl rounded-full flex justify-center py-1 w-full text-center transition-all"
                type="button">
                {filterBy ? filterBy : 'Buscar por categoria'}
            </button>

            {isOpen && <div className='overflow-y-auto absolute z-10 my-1 w-full h-44 bg-customRed opacity-95 mt-2 rounded-3xl font-bold text-white text-lg transition-all'>
                <div className='flex flex-col text-center justify-center'>
                    <div onClick={() => showAllProdcuts()} className='my-2 mx-3 hover:bg-customDarkRed rounded-3xl transition-all'>
                        {allProductos}
                    </div>
                    <hr className="bg-white h-1  ml-3 mr-1 rounded-xl" />

                    {categories?.map((category, index) => (
                        <div className='my-1 mx-3 hover:bg-customDarkRed rounded-3xl transition-all' key={index} onClick={() => setfilterBy(category)}>
                            {category}
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}

const ProductThumbnail = ({ product }: { product: Product }) => {

    const priceTitle = "Precio:"
    const productName = product.name
    const productPrice = product.price
    const displayedCategories = product.productCategories.slice(0, 3);


    return (
        <div className='bg-white rounded-lg mt-5 ml-2 h-24 w-11/12 hover:scale-105 ease-in-out duration-200 flex cursor-pointer'>
            <img src={product.picture} alt='' className='w-16 h-24 object-cover rounded-lg' />
            <div className='flex-col ml-2 mt-3 text-sm'>
                <h1 className='font-bold text-ellipsis'>
                    {productName}
                </h1>
                <hr className="bg-customPink h-1 w-48 rounded-lg" />
                <h1 className='font-bold mt-1'>{priceTitle} ${productPrice}</h1>
                <div className='flex justify-normal gap-2 w-52  overflow-x-scroll'>
                    {displayedCategories.map((category, index) => (
                        <div key={index}>
                            <Tag title={category} customComponents={"bg-customRed"} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default ProductCatalog;