import { useEffect, useState } from "react";
import { NavBar } from "../dashboard/Header";
import { Category } from "../../@types/category";
import { Blurhash } from "react-blurhash";
import { useParams } from 'react-router-dom';
import { Product } from "../../@types/product";
import { dummyProducts } from "../dashboard/MockData";
import Categories from "./CategoryBar";

interface SelectedProducts {
    [key: string]: number;
}

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>({});
    const { restaurantUrl } = useParams();


    const categoryList: Category[] = [
        {
            id: "1",
            title: "Vegano"
        },
        {
            id: "2",
            title: "Vegetariano"
        },
        {
            id: "3",
            title: "Rico"
        }, {
            id: "1",
            title: "Vegano"
        },
        {
            id: "2",
            title: "Vegetariano"
        },
        {
            id: "3",
            title: "Rico"
        }, {
            id: "1",
            title: "Vegano"
        },
        {
            id: "2",
            title: "Vegetariano"
        },
        {
            id: "3",
            title: "Rico"
        }, {
            id: "1",
            title: "Vegano"
        },
        {
            id: "2",
            title: "Vegetariano"
        },
        {
            id: "3",
            title: "Rico"
        }, {
            id: "1",
            title: "Vegano"
        },
        {
            id: "2",
            title: "Vegetariano"
        },
        {
            id: "3",
            title: "Rico"
        }, {
            id: "1",
            title: "Vegano"
        },
        {
            id: "2",
            title: "Vegetariano"
        },
        {
            id: "3",
            title: "Rico"
        }
    ]

    const color = "bg-black"

    const productsList: Product[] = dummyProducts;


    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
    }

    const handleProductClick = (product: Product) => {
        if(!selectedProducts[product.id])
            setSelectedProducts({...selectedProducts, [product.id]: 1});
        else{
            setSelectedProducts(prevSelectedProducts => ({
                ...prevSelectedProducts,
                [product.id]: prevSelectedProducts[product.id] + 1,
              }))
        }
    };

    return (
        <>
            <NavBar />

            <Banner color={color} />
            <div className="inset-0 flex">

                <Categories categories={categoryList} handleCategoryClick={handleCategoryClick} />
                <Products products={productsList} handleProductClick={handleProductClick} />
                <Cart selectedProducts={selectedProducts} products={productsList} />
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
                <BackgroundImage src={src} imageLoader={imageLoader}/>
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

const Products = ({ products, handleProductClick }: { products: Product[], handleProductClick: (product: Product) => void }) => {
    return (
        <>
            <div className={`flex justify-center h-[75vh] `}>
                <div className="bg-customBeige rounded-3xl ">
                    <div className="flex flex-col items-center justify-center mt-24">
                        <h1 className="text-3xl font-bold text-customRed">Menú</h1>
                        <hr className="bg-customPink h-1 w-72 mt-2" />

                        <div className="flex flex-wrap items-center justify-center gap-4 overflow-y-scroll m-3">
                            {products.map((product, index) => (
                                <div key={index} className="flex w-1/4 justify-center" onClick={() => handleProductClick(product)}>
                                    <ProductThumbnail product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

const ProductThumbnail = ({ product }: { product: Product }) => {
    return(
        <>
            <div className='bg-white rounded-lg mt-5 h-24 w-72 hover:scale-105 ease-in-out duration-200'>
                <div className='flex'>
                    <img src={product.img} alt='' className='w-16 h-24 object-cover rounded-lg' />
                    <div className='flex-col ml-2 mt-3 text-sm'>
                        <h1 className='font-bold'>
                            {product.name.length > 25 ? product.name.substring(0, 25) + '...' : product.name}
                        </h1>
                        <hr className="bg-customPink h-1 w-48 rounded-lg" />
                        <h1 className='font-bold mt-1'>Precio: ${product.price}</h1>
                        <div className='flex justify-normal gap-2 w-52  overflow-x-scroll'>
                            <small>{product.description}</small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Cart = ({ selectedProducts, products }: { selectedProducts: SelectedProducts, products: Product[] }) => {
    return (
        <ul>
            <li>
                {Object.keys(selectedProducts).map((productId, index) => (
                    <div key={index} >

                        {products.filter(x => productId === x.id).map((product, index) => (
                            <ProductThumbnail product={product} />
                        ))}
                        
                    </div>
                ))}
            </li>
        </ul>
    )
}

const ProductInCart = () => {

}



export default Menu;