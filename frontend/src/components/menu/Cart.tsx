import { Product } from '../../@types/product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { BsCart4 } from 'react-icons/bs';
import { SelectedProducts } from './Menu';
import { addToSelectedProducts, deleteSelectedProduct, subtractFromSelectedProducts } from '../../redux/slices/selectedProductsSlice';
import { IoIosArrowUp, IoMdClose } from 'react-icons/io';


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

export default Cart;