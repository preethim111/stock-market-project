import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2';

export default function StockPerformanceComparison() {
    const [tickers, setTickers] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchData =  async () => {
        setLoading(true);
        setError(null);
        setData(null);

        const apiKey = xzK4szgLdGZ1CULMd79I20rsCb4hhSR4;
        const endpoint = `https://financialmodelingprep.com/api/v3/historical-price-full/${tickers}?apikey=${apiKey}`;

        try {
            const response = await axios.get(endpoint);
            setData(response.data);
        }  catch (err) {
             setError(err);
        } finally {
            setLoading(false);
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
    }

    const transformData = (data) => {
        if (!data) {
            return null;
        }
        const datasets = data.map((stock) => {
            return {
                label: stock.symbol,
                data: stock.historical.map((entry) => ({
                    x: entry.date,
                    y: entry.close,
                })),
                fill: false, 
                borderColor: getRandomColor(),
            }
        })
    }

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}

return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Enter Stock Tickers (comma separated):
                <input 
                    type="text"
                    value = {tickers}
                    onChange={(e) => setTickers(e.target.value)}
                    required
                />
            </label>
            <button type="submit">
                Fetch Data
            </button>
        </form>
    </div>
)

}

