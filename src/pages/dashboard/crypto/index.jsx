import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    Container,
    TextField,
    MenuItem,
    CircularProgress,
    Typography,
    Box,
    Button
  } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
  


export default function IntradayCrypto() {

    const [ticker, setTicker] = useState('');
    const [timeFrame, setTimeFrame] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const timeframes = [
        { value: '1min', label: '1 Minute'},
        { value: '5min', label: '5 Minutes'},
        { value: '15min', label: '15 Minutes'},
        { value: '30min', label: '30 Minutes'},
        { value: '1hour', label: '1 Hour'},
        { value: '4hour', label: '4 Hours'},
    ]



        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/${timeFrame}/${ticker}?apikey=xzK4szgLdGZ1CULMd79I20rsCb4hhSR4`)
                setData(response.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
            
        }

        const handleTimeFrameChange = (event) => {
            setTimeFrame(event.target.value);
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            fetchData();
        }
    
        return (
            <Container>
                
                <Typography variant="h4" gutterBottom>
                    Intraday Crypto Price Movements
                </Typography>
                <Box component="form" mb={3} noValidate autoComplete="off">
                    <div>
                    <TextField 
                        label = "Ticker"
                        variant = "outlined"
                        value = {ticker}
                        onChange = {(e) => setTicker(e.target.value)}
                        margin="normal"
                    />
                    </div>

                    <div>
                    <TextField
                        label = "Timeframe"
                        variant = "outlined"
                        value = {timeFrame}
                        onChange = {handleTimeFrameChange}
                        select
                        margin="normal"
                    >
                        {timeframes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}

                    </TextField>
                    </div>

                    <Button variant="contained" onClick={handleSubmit}>
                        Search
                    </Button>   
                </Box>
                
                {loading && <CircularProgress />}
                {error && <div>Error: {error.message}</div>}

                {data && (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={data.map((d) => ({ date: d.date, close: d.close }))}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                )}

            </Container>
        )
    

}


    