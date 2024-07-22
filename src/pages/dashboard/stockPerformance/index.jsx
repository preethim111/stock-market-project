// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   TextField,
//   CircularProgress,
//   Typography,
//   Box,
//   Button
// } from '@mui/material';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// export default function StockPerformanceComparison() {
//   const [tickers, setTickers] = useState('');
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     setData([]);

//     const endpoint = `https://financialmodelingprep.com/api/v3/historical-price-full/${tickers}?apikey=${apiKey}`;

//     try {
//       const response = await axios.get(endpoint);
//       console.log(response.data); // Log the response data to understand its structure
//       if (response.data.historical) {
//         setData(response.data.historical);
//       } else {
//         setError(new Error('Unexpected response structure'));
//       }
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetchData();
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Stock Performance Comparison
//       </Typography>

//       <Box component="form" mb={3} noValidate autoComplete="off">
//         <div>
//           <TextField
//             label="Tickers"
//             variant="outlined"
//             value={tickers}
//             onChange={(e) => setTickers(e.target.value)}
//             margin="normal"
//           />
//         </div>

//         <div>
//           <Button variant="contained" onClick={handleSubmit}>
//             Search
//           </Button>
//         </div>
//       </Box>

//       {loading && <CircularProgress />}
//       {error && <div>Error: {error.message}</div>}

//       {data.length > 0 && (
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart
//             data={data.map((d) => ({ date: d.date, close: d.close }))}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </Container>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  CircularProgress,
  Typography,
  Box,
  Button
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StockPerformanceComparison() {
  const [tickers, setTickers] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData({});

    
    const tickerList = tickers.split(',').map(ticker => ticker.trim());
    const apiKey = import.meta.env.VITE_REACT_APP_FINANCIAL_MODELING_PREP;


    try {
      const promises = tickerList.map(ticker => 
        axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=${apiKey}`)
      );
      const responses = await Promise.all(promises);
      const newData = {};
      responses.forEach((response, index) => {
        if (response.data.historical) {
          newData[tickerList[index]] = response.data.historical;
        }
      });
      setData(newData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const chartData = [];
  if (Object.keys(data).length > 0) {
    const dates = [...new Set(Object.values(data).flat().map(item => item.date))].reverse();
    dates.forEach(date => {
      const entry = { date };
      Object.keys(data).forEach(ticker => {
        const dayData = data[ticker].find(item => item.date === date);
        if (dayData) {
          entry[ticker] = dayData.close;
        }
      });
      chartData.push(entry);
    });
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Stock Performance Comparison
      </Typography>

      <Typography variant="h6">
        This feature compares the different stocks' closing prices over time. Please write the stock tickers in the space provided below, separated with commas.
      </Typography>

      <Box component="form" mb={3} noValidate autoComplete="off">
        <div>
          <TextField
            label="Tickers (comma-separated)"
            variant="outlined"
            value={tickers}
            onChange={(e) => setTickers(e.target.value)}
            margin="normal"
          />
        </div>

        <div>
          <Button variant="contained" onClick={handleSubmit}>
            Search
          </Button>
        </div>
      </Box>

      {loading && <CircularProgress />}
      {error && <div>Error: {error.message}</div>}

      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(data).map((ticker) => (
              <Line
                key={ticker}
                type="monotone"
                dataKey={ticker}
                stroke={getRandomColor()}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
}

