import React  from 'react'
import {useFetch} from "../../hooks/useFetch";
import {requestUrls} from "../../util/constants/requestURLS";
import {Table} from "antd"

import {useNavigate} from "react-router-dom";

import type {TableProps} from 'antd';
import {CurrencyListResponseModel} from "../../ts/types/CurrencyListResponseModel";
import {ROUTES} from "../../util/constants/routes";



const CryptoList = () => {



const { data, loading, error}  = useFetch<CurrencyListResponseModel[]>({
    url: `${requestUrls.coinsMarkets}/coins/markets?vs_currency=usd&per_page=5`,
    header :{
        'x-cg-demo-api-key' : process.env.REACT_APP_CRYPTO_API_KEY,
    }
})

    console.log(data)

const columns: TableProps<CurrencyListResponseModel>['columns'] = [
    {
        title: '#ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (val)=>{
            return(
                <img src={val} alt="val" width={40} />
            )
        }
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Price Chnage 24',
        dataIndex: 'price_change_24h',
        key: 'price_change_24h',
    },
    {
        title: 'Price',
        dataIndex: 'current_price',
        key: 'current_price',
        render: (val)=>{
            return(
                <span>${val}</span>
            )
        }
    },
]

    const navigate = useNavigate()

    const handleNavigateDetailPage = (row : CurrencyListResponseModel) =>{
    console.log(row, "hello")
        navigate(`${ROUTES.CRYPTO_DETAIL}/${row.id}`)
    }


    return (
        <div>
           <h2>Crypto List</h2>
            <Table
            columns={columns}
            dataSource={ data || []}
            loading={loading}

            onRow={(row)=>{
                return{
                    onClick: ()=> handleNavigateDetailPage(row)
                }
            }}

            />
        </div>
    )
}

export default CryptoList