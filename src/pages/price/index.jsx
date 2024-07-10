import React, { useState } from 'react';
import axios from 'axios';

export default function StockOpenClose() {
    const [ticker, setTicker] = useState('');
    const [date, setDate] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            // https://api.polygon.io/v1/open-close/AAPL/2024-07-01?adjusted=true&apiKey=wspO28Pp94oS2MAyThBCn8NMFe9JulDf
            const response = await axios.get(`https://api.polygon.io/v1/open-close/${ticker}/${date}?adjusted=true&apiKey=wspO28Pp94oS2MAyThBCn8NMFe9JulDf`, {
            params: {
                apiKey: 'wspO28Pp94oS2MAyThBCn8NMFe9JulDf'
            }

        });
        setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
            
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
    }


   
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Stock Ticker : 
                        <input
                        
                        type="text"
                        value = {ticker}
                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                        required
                        />     
                        
                    </label>
                    <div>
                        <label>
                            Date : 
                            <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            />
                        </label>
                    </div>
                </div>
                <button type="submit">
                    Fetch Data
                </button>
            </form>

            {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div>
          <h1>{ticker} Data for {date}</h1>
          <p>Open: ${data.open}</p>
          <p>Close: ${data.close}</p>
          <p>High: ${data.high}</p>
          <p>Low: ${data.low}</p>
        </div>
      )}

        </div>
    );
}
