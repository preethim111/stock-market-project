import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    TextField,
    MenuItem,
    CircularProgress,
    Typography,
    Box,
    Button,
    Card
  } from '@mui/material';

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
        <Container>
            {/* <form onSubmit={handleSubmit}>
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
            </form> */}

            <Typography variant="h4" gutterBottom>
                Stock Prices
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

                    {/* <div>
                    <TextField 
                        label = "Date"
                        variant = "outlined"
                        value = {date}
                        onChange = {(e) => setDate(e.target.value)}
                        margin="normal"
                    />
                    </div> */}

                    <div>
                    <label>
                        Date
                        <input
                            type="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                </div>

                    <Button variant="contained" onClick={handleSubmit}>
                        Search
                    </Button>

            </Box>



            {loading && <CircularProgress />}
      {error && <div>Error: {error.message}</div>}
      {data && (
        // <div>
        //   <h1>{ticker} Data for {date}</h1>
        //   <p>Open: ${data.open}</p>
        //   <p>Close: ${data.close}</p>
        //   <p>High: ${data.high}</p>
        //   <p>Low: ${data.low}</p>
        // </div>
        <div>

        <div>
        <Card variant="outlined">
            Open : ${data.open}
        </Card>
        </div>

        <div>
        <Card variant="outlined">
            Close : ${data.close}
        </Card>
        </div>

        <div>
        <Card variant="outlined">
            High : ${data.high}
        </Card>
        </div>
        
        <div>
        <Card variant="outlined">
            Low : ${data.low}
        </Card>
        </div>


        
        

        </div>

      )}

</Container>
    );
}
