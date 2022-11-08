import React from 'react'
import { Typography, Box, List, ListItemButton, ListItemIcon, IconButton, Divider, ListItem, ListItemText, Collapse } from "@mui/material"
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import FeatherIcon from 'feather-icons-react';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


let modules = [
    {
        id: 1,
        subheader: "Casino",
        icon: "trash",
        submodules: [
            {
                id: 1,
                subheader: "Sub Modules"
            }
        ]
    },
    {
        id: 2,
        subheader: "Sports",
        icon: "edit",
    },
    {
        id: 3,
        subheader: "Lottery",
        icon: "eye",
    },
    {
        id: 4,
        subheader: "Promotions",
        icon: "edit",
    },
]



export default function Sidebar({ sx, handleDrawerClose, open, handleClick, isSidebarOpen }) {
    const theme = useTheme();

    return (
        <>
            <Drawer variant="permanent" color='red' open={isSidebarOpen}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} >
                        {theme.direction === 'rtl' ? <FeatherIcon icon="chevron-right" /> : <FeatherIcon icon={"chevron-left"} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {modules.map((item, index) => (
                        item.submodules ?
                            <React.Fragment key={item.id}>
                                <ListItem key={item.id} button
                                    component="li"
                                    onClick={() => handleClick(index)}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: 3,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <FeatherIcon icon={item.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary={item.subheader} />
                                    {index === open ? (
                                        <FeatherIcon icon="chevron-down" size="16" />
                                    ) : (
                                        <FeatherIcon icon="chevron-right" size="16" />
                                    )}
                                </ListItem>
                                <Collapse in={index === open} timeout="auto" unmountOnExit>
                                    <List component="li" disablePadding>
                                        {item.submodules.map((child) => (
                                            <ListItem key={child.id} disablePadding button component="li">
                                                <ListItemText primaryTypographyProps={{
                                                    ml: '35px',
                                                }}>{child.subheader}</ListItemText>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                            :
                            <ListItem key={item.id}
                                button
                                component="li">
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 3,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <FeatherIcon icon={item.icon} />
                                </ListItemIcon>
                                <ListItemText primary={item.subheader} />
                            </ListItem>
                    ))}
                </List>
                <List>
                </List>
                <Divider />
            </Drawer>
        </>
    )
}
