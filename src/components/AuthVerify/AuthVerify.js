import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";

const AuthVerify = (props) => {

    const location = useLocation();

    useEffect(() => {

        const token = localStorage.getItem('code_spell_token');
        if (token) {

            const expiration = new Date(localStorage.getItem('code_spell_expiration'));
            const currentTime = new Date();

            if (expiration.getTime() < currentTime.getTime()) {
                toast.warning("Your session has expired. Please log in again.");
                props.logout();
            }
        }
    }, [location]);
};

export default AuthVerify;