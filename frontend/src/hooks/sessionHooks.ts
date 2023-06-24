import { useEffect, useState } from "react";
import axios from "axios";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/slices/currentUserSlice";
import { RootState } from "../redux/store";

const useGetSession = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(
        useSelector((state: RootState) => state.currentUser).user
    );

    axios.defaults.withCredentials = true;
    useEffect(() => {
        if (user) return;
        const fetchSession = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8080/api/auth/session",
                    {
                        withCredentials: true,
                    }
                );
                console.log(res.data);
                setUser(res.data);
                dispatch(setCurrentUser(res.data));
            } catch (error) {
                console.log(error);
            }
        };

        fetchSession();
    }, [user, dispatch]);

    return user;
};

export { useGetSession };
