import {useState, useEffect, useCallback} from "react";

import {FetchConfig} from "../ts/types/FetchConfig";
import {FetchState} from "../ts/types/FetchState";


export function useFetch<T> ({method, url, header,  body} : FetchConfig) : FetchState<T> {

const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);


const fetchdata = useCallback(async()=>{
    setLoading(true);

    try{
       const resp = await  fetch(url,
           {
           headers: {
               "Content-Type": "application/json",
               ...header
           },
               body: method !== "GET" && body ? JSON.stringify(body) : undefined,
       })
        const respData = await resp.json()
        setData(respData);
    }catch(e){
        setError("error smt went wrong");
    }finally {
        setLoading(false);
    }
}, [url])

    useEffect(() => {
        fetchdata()
    }, [fetchdata]);

return {
    data, loading, error
}
}














//develop a custum hook named useFetch is a function in argument a object with 3 parameters
// url is a string or null method is a string or null, header and body is object all this execpt url
//is optional ?. it must return a object with 3 data - loading : boolean, data : generic type
// and error boolean

//
// type FetchParameters = {
//     method?: string | null;
//     url: string;
//     body?: object,
//     header?: object
// }
//
// type FetchReturns<T> = {
//     loading: boolean,
//     error: string | null,
//     data: T | null
// }
//
//
// export function useFetch<T> ({method, url, body, header} : FetchParameters) : FetchReturns<T>  {
//
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const [data, setData] = useState<T | null>(null)
//
//     const fetchdata = useCallback(async () => {
//
//         setLoading(true);
//         try{
//             const resp = await fetch(url)
//             const json = await resp.json()
//            setData(json)
//         }catch(e){
//             setError("smt went wrong")
//         }finally{
//             setLoading(false);
//         }
//
//     }, [url])
//
//
//     useEffect(() => {
//         fetchdata()
//     }, [url]);
//
//
//
//
//     return {
// loading, data, error
//     }
// }