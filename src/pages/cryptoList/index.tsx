import React, {useState} from 'react'
import {useFetch} from "../../hooks/useFetch";
import {requestUrls} from "../../util/constants/requestURLS";
import {Table} from "antd"
import {CaretUpOutlined, CaretDownOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

import type {TableProps} from 'antd';
import {CurrencyListResponseModel} from "../../ts/types/CurrencyListResponseModel";
import {ROUTES} from "../../util/constants/routes";




const CryptoList = () => {

const [page, setPage] = useState<number>(1);
const [perPage, setPerPage] = useState<number>(10);

const { data, loading, error}  = useFetch<CurrencyListResponseModel[]>({
    url: `${requestUrls.coinsMarkets}/coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}`,
    header :{
        'x-cg-demo-api-key' : process.env.REACT_APP_CRYPTO_API_KEY,
    }
})


  console.log(data, "L")


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

            pagination={{
                total : 100,
                onChange (page, pageSize){
                    setPage(page)
                    console.log(page, "page")
                    setPerPage(pageSize)
                    console.log(pageSize, "pageSize")

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