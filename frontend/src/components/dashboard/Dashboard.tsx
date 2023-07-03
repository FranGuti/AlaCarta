import { useEffect, useState } from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Pie, PieChart, Cell } from 'recharts'
import { NavBar } from './Header'
import { Blurhash } from 'react-blurhash'
import { dummyProducts } from './MockData'



interface category {
    id: string
    title: string
}

interface record {
    id: string
    purchaseDate: Date
    amountOfSales: number
}

interface product {
    id: string
    name: string
    price: number
    description: string
    img: string
    categories: category[]
    isAvailable: boolean
    sales: record[]
}



const Dashboard = () => {

    const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"
    const [imageLoader, setImageLoader] = useState(false)

    const [selectedProduct, setSelectedProduct] = useState<product | null>(null);


    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoader(true)
        }
        img.src = src
    }, [src])

    const handleProductClick = (product: product) => {
        setSelectedProduct(product);
    }


    return (
        <>
            <BackgroundImage src={src} imageLoader={imageLoader} />
            <div className="fixed inset-0 scale-100">
                <NavBar />
                <div className='flex gap-96'>
                    <ProductCatalog productList={dummyProducts} handleProductClick={handleProductClick} />
                    <ProductStatistics selectedProduct={selectedProduct} />
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


const ProductCatalog = ({ productList, handleProductClick }: { productList: product[], handleProductClick: (product: product) => void }) => {

    return (
        <div>
            <div className="absolute bg-customBeige rounded-r-3xl  w-96 h-screen  ">
                <div>
                    <div>
                        <div className="flex flex-col items-center justify-center mt-24 ">
                            <h1 className="text-3xl font-bold text-customRed">Catálogo de Productos</h1>
                            <hr className="bg-customPink h-1 w-72 mt-2" />

                            <div className=' overflow-y-auto mt-3 w-80 h-[80vh]'>
                                {productList.map((product, index) => (
                                    <div key={index} onClick={() => handleProductClick(product)}>
                                        <ProductThumbnail product={product} />
                                    </div>
                                ))}


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const ProductThumbnail = ({ product }: { product: product }) => {


    const displayedCategories = product.categories.slice(0, 3);


    return (
        <>
            <div className='bg-white rounded-lg mt-5 h-24 w-72 hover:scale-105 ease-in-out duration-200'>
                <div className='flex'>
                    <img src={product.img} alt='' className='w-16 h-24 object-cover rounded-lg' />
                    <div className='flex-col ml-2 mt-3 text-sm'>
                        <h1 className='font-bold'>
                            {product.name.length > 25 ? product.name.substring(0, 25) + '...' : product.name}
                        </h1>
                        <hr className="bg-customPink h-1 w-48 rounded-lg" />
                        <h1 className='font-bold mt-1'>Precio: ${product.price}</h1>
                        <div className='flex justify-normal gap-2 w-52  overflow-x-scroll'>
                            {displayedCategories.map((category, index) => (
                                <div key={index}>
                                    <Tag title={category.title} customComponents={"bg-customRed"} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


const Tag = ({ title, customComponents }: { title: string, customComponents: string }) => {


    return (
        <div className={`pb-0  w-fit pl-2 pr-2 pt-0.5 rounded-xl text-center ${customComponents} text-white font-bold`}>
            {title.length > 50 ? (
                <div className='text-left'>
                    {title.slice(0, title.length / 2)}
                    <br />
                    {title.slice(title.length / 2)}
                </div>
            ) : (
                title
            )}
        </div>
    )
}


const ShowTags = ({ selectedProduct }: { selectedProduct: product }) => {

    return (
        <div className='flex gap-3 mb-1'>
            {selectedProduct.categories.map((category, index) => (
                <div key={index}>
                    <Tag title={category.title} customComponents='bg-customRed' />
                </div>
            ))}
        </div>
    )
}


const ProductStatistics = ({ selectedProduct }: { selectedProduct: product | null }) => {

    const [filterOption, setFilterOption] = useState<string>()
    const [customStartDate, setCustomStartDate] = useState<Date>()
    const [customEndDate, setCustomEndDate] = useState<Date>();

    return (
        <div className="right-1 flex justify-center mt-20 md:right-80 rounded-3xl bg-customBeige ml-5">
            <div className=" md:w-[95%] m-5 border-2 border-customPink rounded-3xl">
                <div className="relative top-4">
                    <div className="ml-3 text-customRed font-bold">
                        {selectedProduct && <ShowTags selectedProduct={selectedProduct} />}
                        <div className="font-bold text-3xl w-fit">
                            {selectedProduct?.name}
                            <hr className="bg-customPink h-1 mt-1 rounded-lg" />
                        </div>
                        <p className='mt-2'>{selectedProduct?.description}</p>
                    </div>
                </div>
                <div className='mt-12 mb-2 relative'>
                    {selectedProduct &&
                        <>
                            <ProductChart selectedProduct={selectedProduct} filterOption={filterOption} customStartDate={customStartDate} customEndDate={customEndDate} />
                            <div className='flex gap-7'>
                                <FilterOptions setFilterOption={setFilterOption} />
                                <RangeDatePicker customStartDate={customStartDate} customEndDate={customEndDate} setCustomStartDate={setCustomStartDate} setCustomEndDate={setCustomEndDate} />
                            </div>
                            <div className='-mt-16 relative'>
                                <PieChartStatistics selectedProduct={selectedProduct} />
                                <ShowProductImage selectedProduct={selectedProduct}/>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>

    )
}

export { ProductThumbnail };

const FilterOptions = ({ setFilterOption }: { setFilterOption: React.Dispatch<React.SetStateAction<string | undefined>> }) => {

    const [currentOption, setCurrentOption] = useState<string>("")

    const FilterOptions = [
        "Hoy", "Esta Semana", "Este Mes", "Ultimos 6 Meses", "Este Año", "Personalizado"
    ]

    const handleOnClick = (option: string) => {
        setFilterOption(option)
        setCurrentOption(option)
    }

    return (
        <div className='ml-4  flex justify-start gap-8'>
            {FilterOptions.map((option, index) => (
                <div key={index} className='cursor-pointer hover:scale-125  transition-all'>
                    <div onClick={() => handleOnClick(option)}>
                        <Tag
                            title={option}
                            customComponents={`bg-${currentOption === option ? 'customRed scale-110' : 'customDarkRed'} pl-4 pr-4 hover:bg-customRed transition-all`} />
                    </div>
                </div>
            ))}
        </div>

    )
}

const RangeDatePicker = ({ customStartDate, customEndDate, setCustomStartDate, setCustomEndDate }: { customStartDate: Date | undefined, customEndDate: Date | undefined, setCustomStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>, setCustomEndDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) => {



    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDateString = event.target.value;
        const selectedDateObject = selectedDateString ? new Date(selectedDateString) : undefined;
        setCustomStartDate(selectedDateObject);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDateString = event.target.value;
        const selectedDateObject = selectedDateString ? new Date(selectedDateString) : undefined;
        setCustomEndDate(selectedDateObject);
    };

    return (
        <div className="flex">
            <div className="mr-2 ">
                <Tag title={"Fecha de Inicio"} customComponents='bg-customRed mb-1' />
                <input
                    type="date"
                    value={customStartDate ? customStartDate.toISOString().substr(0, 10) : ''}
                    onChange={handleStartDateChange}
                    className="border border-customRed font-bold bg-customBeige rounded-3xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-customRed"
                />
            </div>
            <div className=''>
                <Tag title={"Fecha de Fin"} customComponents='bg-customRed mb-1' />
                <input
                    type="date"
                    value={customEndDate ? customEndDate.toISOString().substr(0, 10) : ''}
                    onChange={handleEndDateChange}
                    className="border border-customRed font-bold bg-customBeige rounded-3xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-customRed"
                />
            </div>
        </div>
    );
};


const ProductChart = ({ selectedProduct, filterOption, customStartDate, customEndDate }: { selectedProduct: product, filterOption: string | undefined, customStartDate: Date | undefined, customEndDate: Date | undefined }) => {

    const [chartWidth, setChartWidth] = useState<number>((window.innerWidth * 1300) / 1920)
    const [chartHeight, setChartHeight] = useState<number>((window.innerHeight * 300) / 937)


    useEffect(() => {
        const handleResize = () => {
            setChartWidth((window.innerWidth * 1300) / 1920)
            setChartHeight((window.innerHeight * 300) / 937)
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])


    const formattedSalesData = () => {
        const currentSales = filterRecordsByDate({ filterOption })
        return currentSales.map((sale) => ({
            purchaseDate: sale.purchaseDate.toISOString().substring(0, 10),
            ventas: sale.amountOfSales,
        }))
    }

    const filterRecordsByDate = ({ filterOption }: { filterOption: string | undefined }): record[] => {
        const today = new Date();
        let startDate = new Date();
        let endDate = new Date();
        switch (filterOption) {
            case "Hoy":
                endDate.setHours(23, 59, 59, 999)
                break;
            case "Esta Semana":
                startDate.setDate(today.getDate() - today.getDay());
                endDate.setDate(today.getDate() - today.getDay() + 6);
                break;
            case "Este Mes":
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                startDate.setHours(0, 0, 0, 0)
                endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                endDate.setHours(23, 59, 59, 999)
                break;
            case "Ultimos 6 Meses":
                startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1);
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date(today.getFullYear(), 11, 31);
                endDate.setHours(23, 59, 59, 999);
                break;
            case "Este Año":
                startDate = new Date(today.getFullYear(), 0, 1);
                break;
            case "Personalizado":
                startDate = customStartDate ? customStartDate : new Date();
                endDate = customEndDate ? customEndDate : new Date();
                break;
            default:
                return selectedProduct.sales;
        }
        return selectedProduct.sales.filter((record: record) => startDate <= record.purchaseDate && record.purchaseDate <= endDate)
    }

    return (
        <>
            <div className='relative mt-2  flex rounded-3xl  justify-center'>
                <div>
                    <LineChart width={chartWidth} height={chartHeight} data={formattedSalesData()} margin={{ top: 10, right: 50, left: 0, bottom: 10 }}>
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


const PieChartStatistics = ({ selectedProduct }: { selectedProduct: product }) => {

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


const ShowProductImage = ({ selectedProduct }: { selectedProduct: product }) => {


    return (
        <div className='ml-4 absolute -right-2 bottom-0 scale-75'>
            <img
                src={selectedProduct.img}
                className="border-4 border-customRed rounded-3xl h-auto max-w-sm  transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                alt=""
            />
            <div className='absolute bottom-0 bg-customRed font-bold text-white rounded-3xl text-xl w-full text-center'>
                {selectedProduct.name}
            </div>
        </div>
    )
}





export default Dashboard;