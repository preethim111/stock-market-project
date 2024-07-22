import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

export default function DashboardDefault() {
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [firstStockName, setFirstStockName] = useState('');
  const [firstChangePercentage, setFirstChangePercentage] = useState('');
  const [biggestLoser, setBiggestLoser] = useState('');
  const [loserChangePercentage, setLoserChangePercentage] = useState('');
  const [mostActive, setMostActive] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const apiKey = import.meta.env.VITE_REACT_APP_FINANCIAL_MODELING_PREP;

  useEffect(() => {
    const fetchStockGainers = async () => {
      try {
        const response = await axios.get('https://financialmodelingprep.com/api/v3/stock_market/gainers', {
          params: {
            apikey: apiKey
          }
        });

        if (response.data && response.data.length > 0) {
          setFirstStockName(response.data[0].name);
          setFirstChangePercentage(response.data[0].changesPercentage);
        } else {
          setFirstStockName('No data available');
          setFirstChangePercentage("No data available");
        }
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchStockGainers();

    const fetchStockLosers = async () => {
      try {
        const response = await axios.get('https://financialmodelingprep.com/api/v3/stock_market/losers', {
          params: {
            apikey: apiKey
          }
        });
        if (response.data && response.data.length > 0) {
          setBiggestLoser(response.data[0].name);
          setLoserChangePercentage(response.data[0].changesPercentage);
        } else {
          setBiggestLoser('No data available');
          setLoserChangePercentage('No data available');
        }
      } catch (err) {
        setError('Failed to fetch data');
      }
    }

    fetchStockLosers();

    const fetchActiveMarket = async () => {
      try {
        const response = await axios.get('https://financialmodelingprep.com/api/v3/stock_market/actives', {
          params: {
            apikey: apiKey
          }
        });
        if (response.data && response.data.length > 0) {
          setMostActive(response.data[0].name);
        } else {
          setMostActive('No available data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      }
    }

    fetchActiveMarket();

    const fetchAllStocks = async () => {
      try {
        const response = await axios.get('https://financialmodelingprep.com/api/v3/stock/list', {
          params: {
            apikey: apiKey
          }
        });
        if (response.data && response.data.length > 0) {
          setData(response.data);
        } else {
          setData([]);
        }
      } catch (err) {
        setError('Failed to fetch data');
      }
    }

    fetchAllStocks();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Biggest Gainer */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Current Biggest Gainer</Typography>
            <Box mt={4}>
              <Typography variant="h4">{firstStockName}</Typography>
              <Typography variant="h5">{firstChangePercentage}%</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Biggest Loser */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Current Biggest Loser</Typography>
            <Box mt={4}>
              <Typography variant="h4">{biggestLoser}</Typography>
              <Typography variant="h5">{loserChangePercentage}%</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Most Active Market */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Most Active Market</Typography>
            <Box mt={4}>
              <Typography variant="h4">{mostActive}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* All Stocks Table */}
      
      <Grid item xs={12}>
        <Box mb={2}>
      <Typography variant="h3">Stocks List</Typography>
      </Box>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stock, index) => (
                  <TableRow key={index}>
                    <TableCell>{stock.symbol}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>${stock.price.toLocaleString()}</TableCell>
                    <TableCell>{stock.type}</TableCell>
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
      </Grid>
    </Grid>
  );
}
