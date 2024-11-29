import React  from 'react'
import {useParams} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch";
import {requestUrls} from "../../util/constants/requestURLS";
import {CurrencyDetailResponseModel} from "../../ts/types/CurrencyDetailResponseModel";

import {Card} from "antd"





const CryptoDetail = () =>{

 const {id} = useParams<{id : string}>(); // use for destructure paht from browser after use values

 console.log(id)


    const { data, loading, error}  = useFetch<CurrencyDetailResponseModel>({
        url: `${requestUrls.coinsMarkets}/coins/${id}`,
        header :{
            'x-cg-demo-api-key' : process.env.REACT_APP_CRYPTO_API_KEY,
        }
    })

    console.log(data?.name)
    return (
        <div>
            <h2>Hello {data?.name} </h2>
            <h4>{data?.symbol}</h4>
            <img src={data?.image.thumb} />
        </div>
    )
}

export default CryptoDetail;