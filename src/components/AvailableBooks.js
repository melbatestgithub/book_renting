import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Paper, Typography } from '@mui/material';

const data2 = [
  { label: 'Spritual', value: 1, color: '#FF2727' }, // Red
  { label: 'Art', value: 1, color: '#006AFF' }, // Blue
  { label: 'Educational', value: 1, color: '#52C93F' }, // Yellow
  { label: 'Fition', value: 2, color: '#99997F' }, // Yellow
 
];  

export default function AvailableBooks() {
  return (
    <Paper>
      <Box sx={{display:"flex",padding:' 2rem',justifyContent:"space-between",alignItems:"center"}}>
        <Typography sx={{color:"#656575",fontSize:"18px"}}>Available Books</Typography>
        <Typography sx={{background:"#F8F7F1",fontSize:"12px",padding:".4rem"}}>Today</Typography>
      </Box>
      <PieChart
        series={[   
          {
            innerRadius: 90,
            outerRadius: 120,
            data: data2,
          },
        ]}
        width={400}
        height={250}
        slotProps={{
          legend: { hidden: true },
        }}
      />
      <Box sx={{width:"222px",padding:"1rem",display:"flex",justifyContent:"space-between"}}>
       <Box sx={{display:"flex ",gap:1,alignItems:"center"}}>
        <Box sx={{display:"flex",flexDirection:"column",gap:1.2}}>
        <Box sx={{width:"16px",height:"16px",background:"#FF2727", borderRadius:"50%"}}></Box>
        <Box sx={{width:"16px",height:"16px",background:"#006AFF", borderRadius:"50%"}}></Box>
        <Box sx={{width:"16px",height:"16px",background:"#52C93F", borderRadius:"50%"}}></Box>
        <Box sx={{width:"16px",height:"16px",background:"#99997F", borderRadius:"50%"}}></Box>
        </Box>
      
        <Box>
        <Typography sx={{color:"#1A1919"}} >Spritual</Typography>
        <Typography sx={{color:"#1A1919"}}>Art</Typography>
        <Typography sx={{color:"#1A1919"}}>Educational</Typography>
        <Typography sx={{color:"#1A1919"}}>Fition</Typography>
        </Box>
       </Box>
       <Box>
        <Typography sx={{color:"#1A1919"}}>1</Typography>
        <Typography sx={{color:"#1A1919"}}>1</Typography>
        <Typography sx={{color:"#1A1919"}}>1</Typography>
        <Typography sx={{color:"#1A1919"}}>2</Typography>
       </Box>
      </Box>
    </Paper>
  );
}
