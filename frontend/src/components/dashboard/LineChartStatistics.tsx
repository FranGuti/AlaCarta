import axios from 'axios'
import { useEffect, useState } from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import { Product } from '../../@types/product'
import { useParams } from 'react-router'
import { OrderType } from '../../@types/stateTypes'

const ProductChart = ({ product, filterOption, customStartDate, customEndDate }: { product: Product, filterOption: string | undefined, customStartDate: Date | undefined, customEndDate: Date | undefined }) => {

    const { restaurantUrl } = useParams()

    const [chartWidth, setChartWidth] = useState<number>((window.innerWidth * 1350) / 1920)
    const [chartHeight, setChartHeight] = useState<number>((window.innerHeight * 250) / 937)

    const [orders, setOrders] = useState<OrderType[] | null>(null);
    const [dateStart, setDateStart] = useState<Date>();
    const [dateEnd, setDateEnd] = useState<Date>();
    
    useEffect(() => {
        const handleResize = () => {
            setChartWidth((window.innerWidth * 1350) / 1920)
            setChartHeight((window.innerHeight * 250) / 937)
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const setFilter = () => {
        const currentDate = new Date();
        const beginningOfDay = new Date( currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),0 ,0 ,0);
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
        const startOfWeek = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate() - currentDate.getDay());
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const startOfSixMonthsAgo = new Date(currentDate.getFullYear(),currentDate.getMonth() - 6,1);
        const beginningOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const endOfYear = new Date(currentDate.getFullYear(), 11, 31);

        switch (filterOption) {
          case "Hoy":
            setDateStart(beginningOfDay);
            setDateEnd(endOfDay);
            break;
          case "Esta Semana":
            setDateStart(startOfWeek);
            setDateEnd(currentDate);
            break;
          case "Este Mes":
            setDateStart(startOfMonth);
            setDateEnd(currentDate);
            break;
          case "Ultimos 6 Meses":
            setDateStart(startOfSixMonthsAgo);
            setDateEnd(currentDate);
            break;
          case "Este Año":
            setDateStart(beginningOfYear);
            setDateEnd(endOfYear);
            break;
          case "Personalizado":
            setDateStart(customStartDate);
            setDateEnd(customEndDate);
            break;
          default:
            setDateStart(undefined);
            setDateEnd(undefined);
            break;
        }
      };

    useEffect(() => {
        const fetchOrders = async () => {
            const start = dateStart? dateStart: ""
            const end = dateEnd? dateEnd: ""
            console.log("start:" + start);
            console.log("end: " + end);
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/${restaurantUrl}/orders/statistics/${product._id}?dateStart=${start}&dateEnd=${end}`,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status === 404) return
                setOrders(res.data)
            } catch (err) {
              console.log(err);
                return
            }
        };
        setFilter()
        fetchOrders();
    }, [filterOption]);

    

    function createSortedData(orders: OrderType[]): { date: string; ventas: number }[] {
      const orderDictionary: Record<string, number> = {};
    
      orders.forEach((order) => {
        const dateKey = formatDate(order.createdAt); // Format the date as "dd/mm/yyyy"
    
        if (orderDictionary[dateKey]) {
          orderDictionary[dateKey] += 1;
        } else {
          orderDictionary[dateKey] = 1;
        }
      });

      const sortedData = Object.entries(orderDictionary).map(([date, ventas]) => ({
        date,
        ventas,
      }));
    
      return sortedData;
    }
    
    function formatDate(orderDate: Date): string {
      const date = new Date(orderDate)
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    }




    return (
        <>
            <div className='relative mt-2  flex rounded-3xl   justify-center 2xl:scale-100 scale-x-90'>
                <div>
                    <LineChart width={chartWidth} height={chartHeight} data={createSortedData(orders? orders : [] )} margin={{ top: 10, right: 50, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={"date"} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={"ventas"} stroke="#CE5160" />
                    </LineChart>
                </div>
            </div>
        </>
    )
}

export default ProductChart;