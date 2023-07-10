import ProductCatalog from './ProductCatalog'
import ProductStatistics from './ProductStatistics'
import RestaurantStatistics from './RestaurantStatistics'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { NavBar } from '../shared/NavBar'
import { UserType } from '../../@types/stateTypes'
import { employeeCategoryEnum } from '../../@types/enums'
import { useGetRestaurant } from '../../hooks/restaurantHook'
import LoadingScreen from '../shared/LoadingScreen'
import { Navigate } from 'react-router-dom'

const Dashboard = ({ user }: { user: UserType }) => {

    const selectedProduct = useSelector((state: RootState) => state.currentRestaurant.product)
    const { restaurant, isLoading } = useGetRestaurant()
    const [isRestaurantLoaded, setIsRestaurantLoaded] = useState(false)
    const [userHasAccess, setUserHasAccess] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            setIsRestaurantLoaded(true)
            const isEmployee = user.userCategories.find(
                (category) => category.restaurant._id === restaurant!._id
            )
            if (!isEmployee) {
                setUserHasAccess(false)
            } else {
                const hasAccess = isEmployee.categoryEnum <= employeeCategoryEnum.Manager
                setUserHasAccess(hasAccess)
            }
        }
    }, [isLoading])

    return (
        <>
            {
                isRestaurantLoaded ?
                    (
                        userHasAccess ?
                            <>
                                <div className="fixed inset-0 scale-100">
                                    <NavBar />
                                    <ProductCatalog />
                                    <div className='relative w-full h-full'>
                                        {selectedProduct ? (
                                            <ProductStatistics selectedProduct={selectedProduct} />
                                        ) : (
                                            <RestaurantStatistics restaurant={restaurant} />
                                        )}
                                    </div>
                                </div>
                            </>
                            :
                            <Navigate to='/' />
                    )
                    :
                    <LoadingScreen />
            }
        </>
    )
}

export default Dashboard;