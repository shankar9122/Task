import React, { useEffect, useState } from 'react'
import { Toolbar, Typography, Button, Box, Grid, IconButton, Badge, Drawer } from "@mui/material"
import FeatherIcon from 'feather-icons-react';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import ListChat from './ListChat';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function Header({ sx, handleDrawerOpen, open }) {


    const [chatData, setChatData] = useState([])
    const [isChatOpen, setIsChatOpen] = useState(null);
    const [value, setValue] = useState("")

    useEffect(() => {
        let interval = setInterval(getChatData, 2000);
        return () => {
            clearInterval(interval);
        };
    });


    let allData = [...chatData];

    const getChatData = () => {
        fetch("https://catfact.ninja/fact").then(res => res.json())
            .then(data => {
                allData.push(data)
                setChatData(allData)
            })
    };

    const handleToggleChat = (isOpen) => {
        setIsChatOpen(isOpen)
        console.log(isOpen)
    }

    const handleSendChat = () => {
        setChatData([...chatData, value]);
        setValue({
            fact:"",
            length:0
        })
        console.log(value)
    }

    const handleChange = (e) => {
        setValue({
            fact:e.target.value,
            length:e.target.value.length
        })
    }



    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <FeatherIcon icon="menu" />
                </IconButton>
                <img src={``} style={{ marginTop: '10px', marginLeft: '5px' }} height={30} width='auto' alt="logo" />
                <Typography variant="h6" ml={3}>
                    Shankar
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button variant='outlined' sx={{ color: "#fff", height: "42px", marginRight: "1em" }} >Sign In</Button>
                    <Button variant='contained' color='success' sx={{ color: "#fff", height: "42px" }}>Sign Up</Button>
                    <IconButton size="large" color="inherit" onClick={() => handleToggleChat(true)}>
                        <Badge badgeContent={chatData.length} color="success">
                            <FeatherIcon icon="message-circle" />
                        </Badge>
                    </IconButton>
                    <Drawer
                        anchor={"right"}
                        open={isChatOpen}
                        onClose={() => handleToggleChat(false)}
                        sx={{
                            zIndex: '2800',
                        }}
                    >
                        <DrawerHeader>
                            <IconButton onClick={() => handleToggleChat(false)}>
                                <FeatherIcon icon={"x"} />
                            </IconButton>
                        </DrawerHeader>

                        <ListChat chatData={chatData} onSubmit={handleSendChat} onChange={handleChange} value={value} />

                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
