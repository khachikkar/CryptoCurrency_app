import {useState, useEffect, useCallback} from "react";


type FetchConfig = {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: object,
    header?: object
}


type FetchState<T> = {
    error: string | null,
    loading : boolean,
    data: T | null
}


export function useFetch<T> ({method, url, header,  body} : FetchConfig) : FetchState<T> {

const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);


const fetchdata = useCallback(async()=>{
    setLoading(true);

    try{
       const resp = await  fetch(url)
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


// type CurrencyTypes = {
//     id: string;
//     symbol: string;
//     current_price: number;
// }

