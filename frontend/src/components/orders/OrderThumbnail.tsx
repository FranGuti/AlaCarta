import { OrderType } from "../../@types/stateTypes";
import { BsDash } from "react-icons/bs";

const OrderThumbnail = ({ order }: { order: OrderType }) => {

    const acceptOrder = "Acept"
    const denyOrder = "Deny"

    const orderInfo = [
        "#" + order._id.slice(-5),
        <BsDash/>,
        "$" + order.price.toString(),
        <BsDash/>,
        order.table.padStart(4, '0')
    ]


    return (
        <div className="
        relative
        2xl:w-[180vh] xl:w-[160vh] w-[35vh] h-fit py-6 px-5
        bg-white border-customRed rounded-2xl 
        ">
            <div className=" w-fit flex justify-start items-center 2xl:gap-1 gap-1 text-sm 2xl:text-lg font-bold text-customRed">
                {orderInfo.map((info, index) => (
                    <div key={index} className="">
                    {info}
                    </div>
                ))}

            </div>
        </div>

    );
};




const CustomButton = ({ title, bgColor }: { title: string, bgColor: string }) => {


    return (
        <button className={` ${bgColor} font-bold text-lg text-white rounded-lg px-3 mt-1`}>
            {title}
        </button>
    )
}

export default OrderThumbnail;