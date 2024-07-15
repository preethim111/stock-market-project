import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import {
    Container,
    TextField,
    MenuItem,
    CircularProgress,
    Typography,
    Box,
    Button,
    Grid
  } from '@mui/material';

export default function StockScreener() {
    const [filters, setFilters] = useState({
        marketCapMoreThan: '',
        marketCapLessThan: '',
        priceMoreThan: '',
        priceLessThan: '',
        industry: '',
        isEtf: '',
        isFund: '', 
        isActivelyTrading: ''
    });

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const options = [
        {value: 'y', label: 'yes'},
        {value: 'n', label: 'no'}
    ]

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const params = {
                marketCapMoreThan: filters.marketCapMoreThan || undefined,
                marketCapLessThan: filters.marketCapLessThan || undefined,
                priceMoreThan: filters.priceMoreThan || undefined,
                priceLessThan: filters.priceLessThan || undefined,
                isEtf: filters.isEtf || undefined,
                isFund: filters.isFund || undefined,
                isActivelyTrading: filters.isActivelyTrading || undefined,
                apikey: 'xzK4szgLdGZ1CULMd79I20rsCb4hhSR4' 
            };

            try {
                const response = await axios.get('https://financialmodelingprep.com/api/v3/stock-screener', { params });
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
        // No need to call fetchData here, because useEffect will handle it on state change
    };


    return (
        <Container>
            {/* <form>
                <div>
                    <label>
                        Market Cap More Than:
                        <input
                            type="number"
                            name="marketCapMoreThan"
                            value={filters.marketCapMoreThan}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Market Cap Less Than:
                        <input
                            type="number"
                            name="marketCapLessThan"
                            value={filters.marketCapLessThan}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Price More Than:
                        <input
                            type="number"
                            name="priceMoreThan"
                            value={filters.priceMoreThan}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Price Less Than:
                        <input
                            type="number"
                            name="priceLessThan"
                            value={filters.priceLessThan}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Industry:
                        <input
                            type="text"
                            name="industry"
                            value={filters.industry}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        ETF:
                        <select
                            name="isEtf"
                            value={filters.isEtf}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        Fund:
                        <select
                            name="isFund"
                            value={filters.isFund}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        Actively Trading:
                        <select
                            name="isActivelyTrading"
                            value={filters.isActivelyTrading}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </label>
                </div>
            </form> */}
            <Typography variant="h4" gutterBottom>
                    Stocks Screener
                </Typography>
            <Box component="form" mb={3} noValidate autoComplete="off">
            
            
            {/* <div>
              
                    <TextField 
                        label = "Market Cap More Than"
                        variant = "outlined"
                        value = {filters.marketCapMoreThan}
                        onChange = {handleChange}
                        margin="normal"
                    />

                    <TextField 
                        label = "Market Cap Less Than"
                        variant = "outlined"
                        value = {filters.marketCapLessThan}
                        onChange = {handleChange}
                        margin="normal"
                    />   

                    <TextField 
                        label = "Price More Than"
                        variant = "outlined"
                        value = {filters.priceMoreThan}
                        onChange = {handleChange}
                        margin="normal"
                    />    
                
                </div>

                <div>
                <TextField 
                        label = "Price Less Than"
                        variant = "outlined"
                        value = {filters.priceLessThan}
                        onChange = {handleChange}
                        margin="normal"
                    /> 
                </div> */}

<Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Market Cap More Than"
              variant="outlined"
              name="marketCapMoreThan"
              value={filters.marketCapMoreThan}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Market Cap Less Than"
              variant="outlined"
              name="marketCapLessThan"
              value={filters.marketCapLessThan}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price More Than"
              variant="outlined"
              name="priceMoreThan"
              value={filters.priceMoreThan}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price Less Than"
              variant="outlined"
              name="priceLessThan"
              value={filters.priceLessThan}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Industry"
              variant="outlined"
              name="industry"
              value={filters.industry}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            label = "Etf"
            variant = "outlined"
            value = {filters.isEtf}
            onChange = {handleChange}
            select
            fullWidth
            >
                {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
                        ))}

        </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextField
            label = "Fund"
            variant = "outlined"
            value = {filters.isFund}
            onChange = {handleChange}
            select
            fullWidth
            >
                {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
                        ))}

        </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextField
            label = "Actively Trading"
            variant = "outlined"
            value = {filters.isActivelyTrading}
            onChange = {handleChange}
            select
            fullWidth
            >
                {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
                        ))}

        </TextField>
          </Grid>
        </Grid>
            </Box>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data.length > 0 && (
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Company Name</TableCell>
                                    <TableCell>Market Cap</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>ETF</TableCell>
                                    <TableCell>Fund</TableCell>
                                    <TableCell>Actively Trading</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stock, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{stock.companyName}</TableCell>
                                        <TableCell>{stock.marketCap}</TableCell>
                                        <TableCell>{stock.price}</TableCell>
                                        <TableCell>{stock.isEtf ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>{stock.isFund ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>{stock.isActivelyTrading ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={data.length}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </Paper>
            )}
        </Container>
    );
}


