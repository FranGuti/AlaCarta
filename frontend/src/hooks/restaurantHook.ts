import { useEffect, useState } from "react";
import axios from "axios";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRestaurant } from "../redux/slices/currentRestaurantSlice"; 
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";

const useGetRestaurant = () => {
    const dispatch = useDispatch();
    const [restaurant, setRestaurant] = useState(
        useSelector((state: RootState) => state.currentRestaurant).restaurant
    );

    const { restaurantUrl } = useParams()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        if (restaurant) return;
        const fetchRestaurant = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/${restaurantUrl}`,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status === 404) return
                dispatch(setCurrentRestaurant(res.data))
                setRestaurant(res.data)
            } catch (err) {
                return
            }
        };
        fetchRestaurant();

    }, []);

    

    return restaurant;
};

export { useGetRestaurant };
