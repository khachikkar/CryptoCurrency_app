import {useSearchParams} from "react-router-dom";

export const useQueryParams = () => {

    const  [searchParams, setSearchParams] = useSearchParams(); // ashxatume  e pahtname i het
    const getQueryParams = (key : string) : string | null => {
                return searchParams.get(key)
    }

    const setQueryParams = (params : Record< string, string | number | null>)  => {
           const newParam = new URLSearchParams(searchParams.toString()) // new url
        //     newParam.set(key, value) // set enq anum key y u valuen orinak "page" -key, value = 3.toString(
        // setSearchParams(newParam)
        //Recordy nshanakum e tal object

        Object.entries(params).forEach(([key, value]) => {
            if( value === null){
                newParam.delete(key)
            }else{
                newParam.set(key, value.toString())
            }
        }

        )
        setSearchParams(newParam)
    }

    const delateQuery = (key: string) =>{
        const newParam = new URLSearchParams(searchParams.toString()) // new url
        newParam.delete(key)
        setSearchParams(newParam)
    }

    return {
        getQueryParams,
        setQueryParams,
        delateQuery
    }
}