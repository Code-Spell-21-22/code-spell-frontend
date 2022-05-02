import {useRef, useState} from "react";
import axios from "axios";

const useAxios = (url, method, payload) => {

    const [data, setData] = useState(null);
    const [code, setCode] = useState(0);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    const controllerRef = useRef(new AbortController());

    const cancel = () => {
        controllerRef.current.abort();
    };

    const sendRequest = () => {

        (async () => {
            try {
                const response = await axios.request({
                    data: payload,
                    signal: controllerRef.current.signal,
                    method,
                    url,
                });

                setData(response.data);
                setCode(response.status);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoaded(true);
            }
        })();

    };

    /*
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.request({
                    data: payload,
                    signal: controllerRef.current.signal,
                    method,
                    url,
                });

                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);
    */

    return { sendRequest, data, code, loaded, error, cancel };

};

export default useAxios;