import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Fiction', value: 54 },
  { name: 'Self help', value: 40 },
  { name: 'Business', value: 55 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Content = () => {
  return (
    <Container style={{ marginTop: '20px', marginLeft: '240px',maxWidth:"200px",background:"red" }}>
      <Typography variant="h5">This month statistics</Typography>
      <Typography variant="subtitle1">Today</Typography>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Income</Typography>
          <Typography variant="h6">This month</Typography>
        </Box>
        <Typography variant="h4" style={{ display: 'flex', alignItems: 'center' }}>
          ETB 9460.00
          <ArrowDownward style={{ color: 'red', marginLeft: '10px' }} />
          1.5%
        </Typography>
      </Paper>
      <Typography variant="body1">Available book</Typography>
      <Typography variant="body2">Today</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Box display="flex" justifyContent="space-between">
        <Typography>Fiction 54</Typography>
        <Typography>Self help 40</Typography>
        <Typography>Business 55</Typography>
      </Box>
    </Container>
  );
};

export default Content;
