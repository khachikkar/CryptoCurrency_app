import React  from 'react'
import {useFetch} from "../../hooks/useFetch";
import {requestUrls} from "../../util/constants/requestURLS";
import {Table} from "antd"
import type {TableProps} from 'antd';
import {CurrencyResponseModel} from "../../ts/types/CurrencyResponseModel";



const CryptoList = () => {



const { data, loading, error}  = useFetch<CurrencyResponseModel[]>({
    url: `${requestUrls.coinsMarkets}?vs_currency=usd`
})

    console.log(data)

const columns: TableProps<CurrencyResponseModel>['columns'] = [
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

    const handleNavigateDetailPage = (row : CurrencyResponseModel) =>{
    console.log(row, "hello")
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