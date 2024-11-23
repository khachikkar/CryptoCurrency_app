import React, {useEffect, useState} from 'react'
import {useFetch} from "../../hooks/useFetch";
import {requestUrls} from "../../util/constants/requestURLS";



// model

type UserData = {
    name: string,
    id: string,
    current_price: number
}  // drsic poxancac type



const CryptoList = () => {


const {data, loading, error} = useFetch<UserData[]>({
    method: "GET",
    url: `${requestUrls.coinsMarkets}?vs_currency=usd`,
})

    console.log(data)




    return (
        <div>
           <h2>Crypto List</h2>
        </div>
    )
}

export default CryptoList