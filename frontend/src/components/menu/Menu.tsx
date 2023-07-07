import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NavBar } from "../dashboard/Header";
import { Blurhash } from "react-blurhash";
import { useParams } from 'react-router-dom';
import { Product } from "../../@types/product";
import { dummyProducts } from "../dashboard/MockData";
import Categories from "./CategoryBar";
import { useSelector, useDispatch } from "react-redux";
import { addToSelectedProducts, subtractFromSelectedProducts, deleteSelectedProduct } from "../../redux/slices/selectedProductsSlice";
import { RootState } from "../../redux/store";
import Cart from "./Cart";
import MenuItems from "./MenuItems";


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
                <MenuItems selectedCategory={selectedCategory} popularProducts={popularProducts} products={productsList} handleProductClick={handleProductClick} />
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
            <div className={`${color} h-[25vh] flex w-full z-10`}>
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
                    className="blur- object-cover object-center w-full -z-10"
                    src={src}
                    alt=""
                />
            )}
        </>
    )
}








export default Menu;