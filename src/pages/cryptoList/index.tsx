import React, {useState} from 'react'
import {useFetch} from "../../hooks/useFetch";
import {requestUrls} from "../../util/constants/requestURLS";
import {Table, Select} from "antd"
import {CaretUpOutlined, CaretDownOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

import type {TableProps} from 'antd';
import {CurrencyListResponseModel} from "../../ts/types/CurrencyListResponseModel";
import {ROUTES} from "../../util/constants/routes";
import {useMemo} from "react";
import {useQueryParams} from "../../hooks/useQueryParams";
import {CURRENCIES, DEFAULT_PAGINATION} from "../../util/constants/pagination";



const CryptoList = () => {




const {getQueryParams, setQueryParams} = useQueryParams() //stacanq ejy

const page = getQueryParams("page")    || DEFAULT_PAGINATION.page  //drinq ejy ev default ov 1 in ejy
const pageSize = getQueryParams("pageSize")    || DEFAULT_PAGINATION.pageSize
const currency = getQueryParams("currency") || "usd"


console.log(getQueryParams("page"))

const { data, loading }  = useFetch<CurrencyListResponseModel[]>({
    url: `${requestUrls.coinsMarkets}/coins/markets?vs_currency=${currency}&per_page=${pageSize}&page=${page}`,
    header :{
        'x-cg-demo-api-key' : process.env.REACT_APP_CRYPTO_API_KEY,
    }
})


  // console.log(data, "L")


const columns: TableProps<CurrencyListResponseModel>['columns'] = useMemo(()=>{
    return [
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
            render: (value) => (
                <span>{value.toFixed(2)}</span>
            ),
        },
        {
            title: 'Change (%)',
            key: 'change',
            render: (row) => {
                const { current_price, price_change_24h } = row;
                if (!current_price || !price_change_24h) return <span>N/A</span>;

                const previousPrice = current_price - price_change_24h;
                const percentageChange = ((current_price - previousPrice) / previousPrice) * 100;

                return (
                    <span style={{ color: percentageChange > 0 ? 'green' : 'red' }}>
                    {percentageChange > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}{percentageChange.toFixed(2)}%
                </span>
                );
            },
        },
        {
            title: 'Price',
            dataIndex: 'current_price',
            key: 'current_price',

        },

    ]
}, [])

    const navigate = useNavigate()

    const handleNavigateDetailPage = (row : CurrencyListResponseModel) =>{
    console.log(row, "hello")
        navigate(`${ROUTES.CRYPTO_DETAIL}/${row.id}`)
    }

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
        setQueryParams({currency: value})
    };

    return (
        <div className="ListCont">
           <h2>Crypto List in {currency} </h2>

            <Select
                style={{width:"100px"}}
                placeholder="Currency"
                onChange={onChange}
                // {
                //     value: 'usd',
                //     label: 'usd',
                // },
                options={
                    CURRENCIES.map(currency=>{
                        return {
                            value: currency,
                            label: currency
                        }
                    })
                }
            />
            <Table
                className="TableCont"
            columns={columns}
            dataSource={ data || []}
            loading={loading}

            pagination={{
                total : 100,
                current : +page,
                pageSize : +pageSize,
                onChange (page, pageSize){

                    setQueryParams({
                        page, pageSize
                    })
                }
            }}


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