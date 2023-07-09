import { Pie, PieChart, Cell } from 'recharts'
import { Product } from '../../@types/product'; 
import { Record } from '../models/record';
import { Tag } from './Tag'; 

const PieChartStatistics = ({ selectedProduct }: { selectedProduct: Product }) => {




    const amountOfSales = selectedProduct.sales.length;
    const amountOfSalesOfAllProducts = dummyProducts.reduce((total, product) => total + product.sales.length, 0) - amountOfSales;
    const data = [{ value: amountOfSales }, { value: amountOfSalesOfAllProducts },];

    const customComponentsS = ['#CE5160', '#edb553'];
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className='font-bold'>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <div className='flex flex-col justify-center mt-5'>
                <PieChart width={250} height={250} >
                    <Pie
                        data={data}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        fill="#8884d8"
                        dataKey="value">
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={customComponentsS[index % customComponentsS.length]} />
                        ))}
                    </Pie>
                </PieChart>
                <div className=' flex -mt-4 ml-5 gap-3 bg-custom '>
                    <div className=''>
                        <Tag title={selectedProduct.name} customComponents={"bg-customRed"} />
                    </div>
                    <div >
                        <Tag title={'Todos los Prodcutos'} customComponents={"bg-customYellow"} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PieChartStatistics;