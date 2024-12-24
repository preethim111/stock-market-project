import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    TextField,
    MenuItem,
    Typography,
    Box,
    Button,
    Grid
  } from '@mui/material';

export default function CompanyProfile() {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const [symbol, setSymbol] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=xzK4szgLdGZ1CULMd79I20rsCb4hhSR4`)
            setData(response.data)
        } catch (err) {
            setError(err)
        } 
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (symbol) {
            fetchData();
        } else {
            setError('Please enter a valid symbol.');
        }
    }

    const handleChange = (event) => {
        setSymbol(event.target.value);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Company Profile
            </Typography>

            <Box component="form" mb={3} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid item xs={12} sm={6} mb={3 }>
                    <TextField
                    label="Ticker"
                    variant="outlined"
                    name="symbol"
                    value={symbol}
                    onChange={handleChange}
                    fullWidth
                    />
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                    Get Profile
                </Button>
            </Box>

            {data && (
                <div>
                    <Typography variant="h6" mb={2}>Company Name: {data[0].companyName}</Typography>
                    <Typography variant="body1" mb={2}>Description: {data[0].description}</Typography>
                    <Typography variant="body1" mb={2}>Industry: {data[0].industry}</Typography>
                    <Typography variant="body1" mb={2}>Price: ${data[0].price}</Typography>
                    <Typography variant="body1" mb={2}>CEO: {data[0].ceo}</Typography>
                </div>
            )}
        </Container>

    )
}



// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//     Container,
//     TextField,
//     Typography,
//     Box,
//     Button,
//     Grid
// } from '@mui/material';

// export default function CompanyProfile() {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const [symbol, setSymbol] = useState('');
//     const [loading, setLoading] = useState(false);

//     const fetchData = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(
//                 `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=xzK4szgLdGZ1CULMd79I20rsCb4hhSR4`
//             );
//             setData(response.data);
//         } catch (err) {
//             setError('Error fetching data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (symbol) {
//             fetchData();
//         } else {
//             setError('Please enter a valid symbol.');
//         }
//     };

//     const handleChange = (event) => {
//         setSymbol(event.target.value);
//     };

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>
//                 Company Profile
//             </Typography>

//             <Box component="form" onSubmit={handleSubmit} mb={3} noValidate autoComplete="off">
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             label="Ticker"
//                             variant="outlined"
//                             name="symbol"
//                             value={symbol}
//                             onChange={handleChange}
//                             fullWidth
//                         />
//                     </Grid>
//                 </Grid>
//                 <Button type="submit" variant="contained" color="primary">
//                     Get Profile
//                 </Button>
//             </Box>

//             {loading && <Typography variant="body1">Loading...</Typography>}
//             {error && <Typography variant="body1" color="error">{error}</Typography>}
//             {data && (
//                 <div>
//                     <Typography variant="h6">Company Name: {data[0].companyName}</Typography>
//                     <Typography variant="body1">Description: {data[0].description}</Typography>
//                     <Typography variant="body2">Industry: {data[0].industry}</Typography>
//                     <Typography variant="body2">Price: ${data[0].price}</Typography>
//                     <Typography variant="body2">CEO: {data[0].ceo}</Typography>
//                 </div>
//             )}
//         </Container>
//     );
// }
