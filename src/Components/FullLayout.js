import React, { useEffect, useState } from 'react'
import { Typography, Container, Box, experimentalStyled, SwipeableDrawer, Button, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import Header from './Header';
import Sidebar from './Sidebar';
import { styled, useTheme } from '@mui/material/styles'; import { List } from 'feather-icons-react/build/IconComponents';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
;

const MainWrapper = experimentalStyled('div')(() => ({
    display: 'flex',
    minHeight: '100vh',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: "#000"
}));



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const drawerWidth = 240;

export default function FullLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [open, setOpen] = useState(false)
    
  

    const handleDrawerOpen = () => {
        setSidebarOpen(true);
    };

    const handleDrawerClose = () => {
        setSidebarOpen(false);
        setOpen(false)
    };

    const handleClick = (index, closeBar = false) => {
        console.log(index, closeBar);
        if (open === index) {
            setOpen((prevopen) => !prevopen);
        } else {
            setOpen(index);
        }
        setSidebarOpen(true)
    };


    






    return (
        <>
            <MainWrapper>
                <Header
                    sx={{
                        zIndex: '2400',
                        marginBottom: 100,
                    }}
                    handleDrawerOpen={handleDrawerOpen}
                    open={isSidebarOpen}
                />

                <Sidebar
                    handleDrawerClose={handleDrawerClose}
                    open={open}
                    handleClick={handleClick}
                    isSidebarOpen={isSidebarOpen}
                />

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Typography variant='h2'>Content</Typography>
                </Box>

            </MainWrapper>




        </>
    )
}
