import React from 'react';
import { Line } from '@ant-design/plots';

const PriceChart = ({ mdata }: any) => {
    const { ath, current_price, atl, high_24h, low_24h } = mdata.market_data || {};

    const data = [
        { label: 'ATH', value: ath.usd },
        { label: 'Current Price', value: current_price.usd },
        { label: 'ATL', value: atl.usd },
        { label: 'High 24h', value: high_24h.usd },
        { label: 'Low 24h', value: low_24h.usd },
    ];

    const config = {
        data,
        xField: 'label',
        yField: 'value',
        smooth: true,
        color: '#0071e3',
        point: { size: 5, shape: 'circle' },
        theme: {
            styleSheet: {
                brandColor: '#0071e3',
                backgroundColor: '#000', // Optional if you want a dark background
                paletteQualitative10: ['#0071e3'],
                axisLineBorder: '#ffffff', // X and Y axis lines
                axisTitleTextFill: '#ffffff', // Axis title
                axisLabelFill: '#ffffff', // Axis labels
                legendTextFill: '#ffffff', // Legend text
            },
        },
        xAxis: {
            label: {
                style: {
                    fill: '#ffffff', // X-axis label color
                },
            },
        },
        yAxis: {
            label: {
                style: {
                    fill: '#ffffff', // Y-axis label color
                },
            },
        },
    };

    return <Line {...config} />;
};

export default PriceChart;
