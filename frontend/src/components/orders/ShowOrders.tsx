import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderType } from '../../@types/stateTypes';
import OrderThumbnail from './OrderThumbnail';

const ShowOrders = () => {


    const { restaurantUrl } = useParams()

    const [orders, setOrders] = useState<OrderType[] | null>();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/${restaurantUrl}/orders`,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status === 404) return
                setOrders(res.data)
            } catch (err) {
                return
            }
        }
        fetchOrders()
    }, []);

    return (
        <div className="flex flex-col w-full justify-center items-center gap-3 mt-5">
            {orders?.map((order, index) => (
                <div key={index}>
                    <OrderThumbnail order={order}/>
                </div>
            ))}
        </div>
    );
};

export default ShowOrders;