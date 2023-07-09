import { useEffect, useState } from 'react'
import { NavBar } from '../shared/NavBar'
import { Blurhash } from 'react-blurhash'
import ProductCatalog from './ProductCatalog'
import ProductStatistics from './ProductStatistics' 
import RestaurantStatistics from './RestaurantStatistics'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const Dashboard = () => {

    const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"
    const [imageLoader, setImageLoader] = useState(false)
    const selectedProduct = useSelector((state: RootState) => state.currentRestaurant.product) 


    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoader(true)
        }
        img.src = src
    }, [src ])

    

    return (
        <>
            <BackgroundImage src={src} imageLoader={imageLoader} />
            <div className="fixed inset-0 scale-100">
                <NavBar />
                <ProductCatalog/>
                <div className='relative w-full h-full'>
                    {selectedProduct ? (
                        <ProductStatistics selectedProduct={selectedProduct} />
                    ) : (
                        <RestaurantStatistics/>
                    )}
                </div>


            </div>
        </>
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
                    className="blur-lg object-cover object-center h-screen w-screen fixed"
                    src={src}
                    alt=""
                />
            )}
        </>
    )
}


export default Dashboard;