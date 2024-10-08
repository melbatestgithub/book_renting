import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Button, Typography } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, Book as BookIcon, Notifications as NotificationsIcon, Settings as SettingsIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LoginIcon from '@mui/icons-material/Login';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { Link } from 'react-router-dom';
import G1 from '../../assets/Group1.png';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
const navigate=useNavigate()
  const handleMenuItemClick = (item) => {
    setActiveItem(item.text);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardOutlinedIcon sx={{ color: activeItem === 'Dashboard' ? 'white' : '#B6B6B6' }} />, link: '/owner-dashboard' },
    { text: 'Upload Book', icon: <LibraryBooksIcon sx={{ color: activeItem === 'Books' ? 'white' : '#B6B6B6' }} />, link: '/book-upload' },
    { text: 'Rent Book', icon: <PermIdentityIcon sx={{ color: activeItem === 'Owners' ? 'white' : '#B6B6B6' }} />},
    { text: 'Others', icon: <BookIcon sx={{ color: activeItem === 'Others' ? 'white' : '#B6B6B6' }} /> },
    
  ];

  const menuItems2=[
    { text: 'Notification', icon: <NotificationsIcon sx={{ color: activeItem === 'Notification' ? 'white' : '#B6B6B6' }} /> },
    { text: 'Settings', icon: <SettingsIcon sx={{ color: activeItem === 'Settings' ? 'white' : '#B6B6B6' }} /> },
    { text: 'Login as Book Admin', icon: <AccountCircleIcon sx={{ color: activeItem === 'Login as Book owner' ? 'white' : '#B6B6B6' }} />, link: '/login' },
  ]


  const handleLogout=()=>{
    localStorage.removeItem('user')
    navigate("/login")
  }
  return (
    <Drawer
      variant="permanent"
      sx={{ width: 240, flexShrink: 0 }}
      PaperProps={{ sx: { width: 240, backgroundColor: '#1e2640', color: '#fff' } }}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <IconButton>
          <MenuIcon sx={{ width: "24px", height: "23px", color: "white" }} />
        </IconButton>
        <img src={G1} alt="logo" style={{ marginRight: '10px', width: "40px", height: "21px" }} />
        <Typography sx={{ color: "#00ABFF", fontSize: "1.5rem", fontWeight: "Bold" }}>Book Rent</Typography>
      </div>
      <Divider style={{ backgroundColor: 'gray' }} />
      <List sx={{ color: "#B6B6B6" }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleMenuItemClick(item)}
            component={Link}
            to={item.link}
            sx={{
              backgroundColor: activeItem === item.text ? '#00ABFF' : 'transparent',
              '&:hover': { backgroundColor: '#00ABFF' },
              color: activeItem === item.text ? 'white' : '#B6B6B6'
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ fontWeight: activeItem === item.text ? 'Bold' : 'normal' }} />
          </ListItem>
        ))}
      </List>
      <Divider style={{ backgroundColor: 'gray' }} />
      <List sx={{ color: "#B6B6B6" }}>
        {menuItems2.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleMenuItemClick(item)}
            component={Link}
            to={item.link}
            sx={{
              backgroundColor: activeItem === item.text ? '#00ABFF' : 'transparent',
              '&:hover': { backgroundColor: '#00ABFF' },
              color: activeItem === item.text ? 'white' : '#B6B6B6'
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ fontWeight: activeItem === item.text ? 'Bold' : 'normal' }} />
          </ListItem>
        ))}
      </List>
      
      <Divider style={{ backgroundColor: 'gray' }} />
      <div style={{ marginTop: 'auto', padding: '30px' }}>
        <Button variant="contained" startIcon={<LoginIcon />} sx={{background:"#808080",textTransform:"capitalize",width:"150px"}} onClick={(handleLogout)}>
          Logout
        </Button>
      </div>
    </Drawer>
  );
};

export default Sidebar;
