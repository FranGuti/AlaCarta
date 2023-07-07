import { Product } from '../../@types/product';


const MenuItems = ({ selectedCategory, popularProducts, products, handleProductClick }: { selectedCategory: string, popularProducts: Product[], products: Product[], handleProductClick: (product: Product) => void }) => {
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

const FilteredProducts = ({ products, selectedCategory, handleProductClick }: { products: Product[], selectedCategory: string, handleProductClick: (product: Product) => void }) => {
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
            <div className='bg-white rounded-lg h-24 w-[15vw] hover:scale-105 ease-in-out duration-200 cursor-pointer'>
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

export default MenuItems;