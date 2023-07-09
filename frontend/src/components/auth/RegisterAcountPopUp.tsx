import { useState } from 'react'
import { passwordIsValid } from './auth.utils'
import { IoRestaurantSharp } from "react-icons/io5"
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setCurrentUser } from '../../redux/slices/currentUserSlice'


const RegisterAcountPopUp = ({ showRegisterAccount, setShowRegisterAccount }:
    { showRegisterAccount: boolean, setShowRegisterAccount: (show: boolean) => void }) => {

    const dispatch = useDispatch()

    const [registerAccountInfo, setregisterAccountInfo] = useState({
        email: '',
        name: '',
        password: '',
        changeInfoCode: ''
    })
    const [errors, setErrors] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setregisterAccountInfo({ ...registerAccountInfo, [e.target.name]: e.target.value })
    }

    const handleClosePopUp = () => {
        setShowRegisterAccount(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors('')
        if (!passwordIsValid(registerAccountInfo.password)) {
            setErrors('Password must be at least 8 characters long and contain at least one number')
            return
        }
        (async () => {
            try {
                const res = await axios.put(
                    "http://localhost:8080/api/auth/changeUserInfo",
                    {
                        email: registerAccountInfo.email,
                        name: registerAccountInfo.name,
                        password: registerAccountInfo.password,
                        changeInfoCode: registerAccountInfo.changeInfoCode
                    },
                    {
                        withCredentials: true,
                    }
                );

                const { ...user } = res.data;
                dispatch(setCurrentUser(user))
                setShowRegisterAccount(false)
            } catch (error) {
                setErrors("Invalid Code")
            }
        })();
    }

    return (
        <div className={`max-h-[90vh] max-w-[95vw] overflow-y-scroll fixed shadow-2xl pop-in-out bg-customBeige p-7 rounded-lg ${showRegisterAccount ? 'visible z-10' : ''}`}>
            <div onClick={handleClosePopUp} className="flex items-center justify-center rotate-hover cursor-pointer">
                <IoRestaurantSharp className="text-3xl sm:text-6xl text-customRed cross-icon" />
                <h1 className="text-3xl sm:text-6xl text-customRed">AlaCarta</h1>
            </div>
            <hr className="bg-customPink h-1" />
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-5 mt-4">
                    <h1 className="text-2xl sm:text-4xl">Register Account</h1>
                    <p className='max-w-[20rem] text-sm text-center'
                    >Only use this if you where added to a restaurant and dont have a name and password yet.</p>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="email">Email</label>
                        <input
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            type="email"
                            name="email"
                            placeholder="e.g. alacarta@email.com"
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="name">Name</label>
                        <input
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            type="text"
                            name="name"
                            placeholder="e.g. Ethan Gold"
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="password">Password</label>
                        <input
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            type="password"
                            name="password"
                            placeholder="e.g. password123"
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="changeInfoCode">Code</label>
                        <input
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            type="text"
                            name="changeInfoCode"
                            placeholder="e.g. $2a$10$IqwDo8tque3Y9m4Dod8YUOf/UBBBXlWI1PHNrmPU/pbCfpR53RUp."
                            required
                            onChange={handleChange} />
                    </div>
                    {errors && <p className="text-customRed max-w-[15vw] text-center">{errors}</p>}
                    <button
                        className="bg-customRed border border-customRed rounded-xl p-2 text-white hover:bg-opacity-20 hover:font-bold hover:text-customOrange ease-in-out duration-300"
                        type="submit">Register & Login</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterAcountPopUp