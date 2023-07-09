import { useEffect, useState } from 'react'
import { Product } from '../../../@types/product'; 
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

const ProductChart = ({ product, filterOption, customStartDate, customEndDate }: { product: Product, filterOption: string | undefined, customStartDate: Date | undefined, customEndDate: Date | undefined }) => {

    const sales = [
        {
            id: "1",
            purchaseDate: new Date(2023, 6, 3),
            amountOfSales: 10
        },
        {
            id: "2",
            purchaseDate: new Date(2023, 6, 4),
            amountOfSales: 10
        },
        {
            id: "3",
            purchaseDate: new Date(2023, 6, 5),
            amountOfSales: 10
        },
        {
            id: "4",
            purchaseDate: new Date(2023, 6, 6),
            amountOfSales: 10
        },
    ];

    const [chartWidth, setChartWidth] = useState<number>((window.innerWidth * 1350) / 1920)
    const [chartHeight, setChartHeight] = useState<number>((window.innerHeight * 250) / 937)


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

 

    return (
        <>
            <div className='relative mt-2  flex rounded-3xl   justify-center 2xl:scale-100 scale-x-90'>
                <div>
                    <LineChart width={chartWidth} height={chartHeight} data={sales} margin={{ top: 10, right: 50, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={"purchaseDate"} />
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