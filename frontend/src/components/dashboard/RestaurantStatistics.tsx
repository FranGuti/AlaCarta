import { useState } from 'react'
import { useGetRestaurant } from '../../hooks/restaurantHook';
import { useSelector } from 'react-redux';
import ProductChart from './ProductChart'; 
import { RootState } from '../../redux/store';
import { FilterOptions, RangeDatePicker } from './FilterOptions';
import RestaurantActions from './RestaurantActions';


const RestaurantStatistics = () => {

    useGetRestaurant()
    const [filterOption, setFilterOption] = useState<string>();
    const [customStartDate, setCustomStartDate] = useState<Date>();
    const [customEndDate, setCustomEndDate] = useState<Date>();
    const restaurant = useSelector((state: RootState) => state.currentRestaurant.restaurant)   

    return (
        <div className="absolute right-12 w-[65%] 2xl:w-[75%] h-5/6 mt-20 flex items-center justify-center  rounded-3xl bg-customBeige ml-5 overflow-hidden">
            <div className='border-2 border-customPink rounded-3xl w-[95%] h-[90%]'>
                <div className='ml-5 mt-8 text-customRed font-bold'>
                    <div className='flex gap-10 relative'>
                        <h1 className='2xl:text-4xl text-lg'>{restaurant?.name}</h1>
                        <RestaurantActions/>
                    </div>
                </div>
                <ProductChart
                    product={undefined}
                    filterOption={filterOption}
                    customStartDate={customStartDate}
                    customEndDate={customEndDate}
                />
                <div className=' w-full 2xl:ml-3 ml-2  flex 2xl:gap-7 gap-4 '>
                    <FilterOptions setFilterOption={setFilterOption} />
                    <RangeDatePicker
                        filterOption={filterOption}
                        customStartDate={customStartDate}
                        customEndDate={customEndDate}
                        setCustomStartDate={setCustomStartDate}
                        setCustomEndDate={setCustomEndDate}
                    />
                </div>
            </div>
        </div>
    )

}

export default RestaurantStatistics;