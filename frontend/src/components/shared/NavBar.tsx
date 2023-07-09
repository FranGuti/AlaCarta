import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const NavBar = () => {

    const [isHovered, setIsHovered] = useState(false);
    const { restaurantUrl } = useParams()

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    const itemsNav = [
        { title: 'Home', to: "/" },
        { title: 'DashBoard', to: `/${restaurantUrl}/dashboard` },
        { title: 'Menú', to: `/${restaurantUrl}/menu` },
        { title: 'Pedidos', to:  `/${restaurantUrl}/orders` },
        { title: 'Empleados', to: "/" }
    ]

    return (
        <div className='z-20 absolute w-full' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <nav className={`rounded-b-3xl bg-customRed h-16
                ${isHovered ? 'translate-y-0' : '-translate-y-16'} transition-transform duration-300`}>
                <div className="p-5 ">
                    <ul className="flex items-center gap-5">
                        {itemsNav.map((item, index) => (
                            <li key={index} className="mr-6">
                                <Link to={item.to} className={`text-white font-bold transition-all "`}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};