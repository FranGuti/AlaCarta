import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NavBar } from "../dashboard/Header";
import { Category } from "../../@types/category";
import { Blurhash } from "react-blurhash";
import { useParams } from 'react-router-dom';
import { Product } from "../../@types/product";
import { dummyProducts } from "../dashboard/MockData";
import Categories from "./CategoryBar";
import { BsCart4 } from "react-icons/bs"
import { IoMdClose, IoIosArrowUp } from "react-icons/io"
import { useSelector, useDispatch } from "react-redux";
import { addToSelectedProducts, subtractFromSelectedProducts, deleteSelectedProduct } from "../../redux/slices/selectedProductsSlice";
import { RootState } from "../../redux/store";


export interface SelectedProducts {
    [key: string]: number;
}

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
    const { restaurantUrl } = useParams();
    const selectedProducts = useSelector((state: RootState) => state.selectedProducts.selectedProducts);

    const categoryList: string[] = [
        'Vegano', 'Vegetariano', 'Entradas', 'Pizzas', 'Empanadas', 'Pastas', 'Parrilla', 'Bebidas', 'Vinos', 'Tragos'
    ]

    const color = "bg-black"

    const popularProducts: Product[] = dummyProducts.slice(0, 8);

    const productsList: Product[] = dummyProducts;


    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category)
    }

    const dispatch = useDispatch();
    const handleProductClick = (product: Product) => {
        dispatch(addToSelectedProducts({ productId: product.id }));
      };

    return (
        <>
            <NavBar />

            <Banner color={color} />
            <div className="inset-0 flex">

                <Categories categories={categoryList} handleCategoryClick={handleCategoryClick} />
                <Products selectedCategory={selectedCategory} popularProducts={popularProducts} products={productsList} handleProductClick={handleProductClick} />
                {Object.keys(selectedProducts).length !== 0 && <Cart products={productsList} />}
            </div>
        </>
    );
}

const Banner = ({ color }: { color: string }) => {
    const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg";
    const [imageLoader, setImageLoader] = useState(false);

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoader(true);
        }
        img.src = src
    }, [src]);

    return (
        <div className="flex">
            <div className={`${color} h-[25vh] flex w-full z-50`}>
                <BackgroundImage src={src} imageLoader={imageLoader} />
            </div>
        </div>
    )
}

function BackgroundImage({ src, imageLoader }: { src: string, imageLoader: boolean }) {
    return (
        <>
            {!imageLoader && (
                <Blurhash
                    hash='LYGRuJw^S5R*ysn%ozax4=R*t7n~'
                    resolutionX={32}
                    resolutionY={32}
                    punch={1} />
            )}
            {imageLoader && (
                <img
                    className="blur-lg object-cover object-center w-full"
                    src={src}
                    alt=""
                />
            )}
        </>
    )
}

const Products = ({ selectedCategory, popularProducts, products, handleProductClick }: { selectedCategory: string, popularProducts: Product[], products: Product[], handleProductClick: (product: Product) => void }) => {
    return (
        <div className={`flex justify-center h-[75vh] bg-customBeige rounded-3xl p-5 w-full`}>
            <div className="flex flex-col items-center justify-center border p-7 border-customPink rounded-3xl w-full h-full">
                <h1 className="text-3xl font-bold text-customRed text-center self-center">Menú</h1>
                <hr className="bg-customPink h-1 w-72 mt-2 mb-5" />
                <div className="flex flex-col flex-grow overflow-y-scroll">
                    <div className="text-xl justify-start text-left self-start ml-11">
                        <h2 className="font-bold text-customRed mt-5">Más populares</h2>
                        <hr className="bg-customPink h-1 w-72 mt-2" />
                    </div>
                    <div className="flex flex-wrap gap-7 h-fit m-3">
                        {popularProducts.map((product, index) => (
                            <div key={index} className="" onClick={() => handleProductClick(product)}>
                                <ProductThumbnail product={product} />
                            </div>
                        ))}
                    </div>

                    <FilteredProducts products={products} selectedCategory={selectedCategory} handleProductClick={handleProductClick} />
                </div>

            </div>
        </div>
    );

}

const FilteredProducts = ({ products, selectedCategory, handleProductClick }: { products: Product[], selectedCategory: String, handleProductClick: (product: Product) => void }) => {
    return (
        <>
            <div className="text-xl justify-start text-left self-start ml-11">
                <h2 className="font-bold text-customRed mt-5">{selectedCategory}</h2>
                <hr className="bg-customPink h-1 w-72 mt-2" />
            </div>
            <div className="flex flex-wrap gap-7 h-fit m-3">
                {products.map((product, index) => (
                    <div key={index} className="" onClick={() => handleProductClick(product)}>
                        <ProductThumbnail product={product} />
                    </div>
                ))}
            </div>
        </>
    )
}

const ProductThumbnail = ({ product }: { product: Product }) => {
    return (
        <>
            <div className='bg-white rounded-lg h-24 w-[15vw] hover:scale-105 ease-in-out duration-200'>
                <div className='flex w-full'>
                    <img src={product.img} alt='' className='w-16 h-24 object-cover rounded-lg' />
                    <div className='text-sm'>
                        <h1 className='flex font-bold justify-center'>
                            {product.name.length > 25 ? product.name.substring(0, 25) + '...' : product.name}
                        </h1>
                        <hr className="flex justify-center bg-customPink h-1 w-48 rounded-lg" />
                        <h1 className='font-bold mt-1'>Precio: ${product.price}</h1>
                        <div className='flex justify-normal gap-2 w-52 overflow-x-scroll'>
                            <small>{product.description}</small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Cart = ({ products }: { products: Product[] }) => {

    const selectedProducts = useSelector((state: RootState) => state.selectedProducts.selectedProducts);
    
    return (
        <div className="bg-customBeige rounded-l-3xl h-[75vh] flex flex-col justify-start ml-3 text-center items-center w-[20vw]">
            <h1 className="flex text-3xl font-bold text-customRed mt-12">
                <BsCart4 className="mr-2" />
                Pedido
            </h1>
            <hr className="flex bg-customPink h-1 w-40 mt-2 mb-4" />
            <div className="border-2 w-fit h-[53vh] mb-2 border-customPink rounded-3xl p-3 overflow-y-auto">
                {Object.keys(selectedProducts).map((productId, index) => (
                    <div className="flex " key={index}>
                        {products.filter(x => productId === x.id).map((product, index) => (
                            <ProductInCart key={index} product={product} selectedProducts={selectedProducts} />
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-3">
                <h1 className="text-xl font-bold text-customRed">
                    Total: {products.reduce((accumulator, product) => {
                        if (selectedProducts[product.id]) {
                            return accumulator + selectedProducts[product.id] * product.price;
                        }
                        return accumulator;
                    }, 0)
                    }
                </h1>
                <button className="rounded-3xl font-bold bg-green-500 p-2 ml-7 text-white">ORDENAR</button>
            </div>

        </div>
    );
}

const ProductInCart = ({ product, selectedProducts}: { product: Product, selectedProducts: SelectedProducts }) => {
    const dispatch = useDispatch();

    const handleProductClick = (product: Product) => {
        dispatch(addToSelectedProducts({ productId: product.id }));
      };
      
      const handleUnitLess = (product: Product) => {
        dispatch(subtractFromSelectedProducts({ productId: product.id }));
      };
      
      const handleResetamount = (product: Product) => {
        dispatch(deleteSelectedProduct({ productId: product.id }));
      };
    return (
        <>
            <div className='flex bg-white rounded-lg mt-5 h-16 w-48 p-2'>
                <IoMdClose onClick={() => handleResetamount(product)}/>
                <div className='flex flex-col text-sm justify-center items-center w-full'>
                    <h1 className='font-bold'>
                        {product.name.length > 25 ? product.name.substring(0, 25) + '...' : product.name}
                    </h1>
                    <hr className="bg-customPink h-1 w-1/2" />
                    <h1 className='font-bold mt-1'>Precio: ${product.price}</h1>
                </div>
                <div className="flex flex-col items-center ">
                    <IoIosArrowUp onClick={() => handleProductClick(product)} />
                    <div className="border w-5">
                        <h2>{selectedProducts[product.id]}</h2>
                    </div>
                    <IoIosArrowUp onClick={() => handleUnitLess(product)} className="rotate-180" />
                </div>
            </div>
        </>
    )
}



export default Menu;