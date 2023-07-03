import { UserType } from "../../@types/stateTypes";
import { employeeCategoryEnum } from "../../@types/enums";
import { Link } from "react-router-dom";

const UserRestaurants = ({ sessionUser }: { sessionUser: UserType }) => {
    const textColors = ['text-customOrange', 'text-customYellow', 'text-customPink', 'text-customLightBlue'];
    const buttonProps = [
        'bg-customOrange hover:text-customOrange border-customOrange',
        'bg-customYellow hover:text-customYellow border-customYellow',
        'bg-customPink hover:text-customPink border-customPink',
        'bg-customLightBlue hover:text-customLightBlue border-customLightBlue'
    ];

    return (
        <div className="bg-white sm:w-[27rem] w-64 h-[20rem] bg-opacity-20 rounded-2xl p-2 overflow-y-scroll">
            <h1 className="text-2xl text-customRed text-center mt-2">Your Restaurants</h1>

            {sessionUser.userCategories.map((userCategory, i) => (
                <div
                    key={i}
                    className={`flex items-center justify-center gap-2 relative h-12 bg-customBeige rounded-xl mb-1 ${textColors[i % textColors.length]}`}
                >
                    <div className="absolute left-2 flex gap-2 w-full">
                        <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[30%]">
                            {userCategory.restaurantName}
                        </h1>
                        <i className="text-sm text-slate-700 opacity-30 ml-1">
                            ~{employeeCategoryEnum[userCategory.categoryEnum]}
                        </i>
                    </div>
                    <Link
                        to={`/${userCategory.restaurantUrl}/dashboard`}
                        className={`absolute right-2 drop-shadow-4xl text-sm border text-slate-900 ${buttonProps[i % buttonProps.length]} sm:p-2 p-1 rounded-lg hover:bg-transparent ease-in-out duration-300`}
                    >
                        Dashboard
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default UserRestaurants;