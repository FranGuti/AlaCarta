import { Product } from '../../@types/product';
import { Tag } from './Tag';

const ProductImage = ({ selectedProduct }: { selectedProduct: Product }) => {

    const currentProduct = selectedProduct.name
    const restOfProductsTitle = "Todos Los Productos"

    return (

        <div className='w-1/5 h-1/5 flex-shrink-0'>
            <img
                src={selectedProduct.picture}
                className="border-2 2xl:border-4 border-customRed rounded-3xl w-full h-full transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30d"
                alt=""
            />
            <Tag title={currentProduct} customComponents=' ml-1 my-0.5 2xl:my-1 bg-customRed 2xl:text-lg text-xs whitespace-nowrap' />
            <Tag title={restOfProductsTitle} customComponents=' ml-1 my-0.5 2xl:my-1 bg-customOrange 2xl:text-lg text-xs' />
        </div>
    )

}

export default ProductImage;