import { Box, Button, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React, { useEffect, useRef } from 'react'
import send from "../images/send.png"

const style = {
    "& .MuiListItem-root": {
        backgroundColour: "#a1a1a1",
        marginBottom: "5px",
        borderRadious: "5px",
        "&:before": {
            width: "30px",
            height: "30px",
            color: "red"
        }
    }
}

export default function ListChat({ data, onSubmit, onChange, value, chatData }) {

    const myRef = useRef(null);

    const scrollToBottom = () => {
        myRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    
      useEffect(() => {
        scrollToBottom()
      }, [chatData]);

    return (
        <>
            <Box
                sx={{ width: 310, padding: "0 1em", display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%" }}
            >
                <List>
                    {chatData.map((chat, index) => (
                        <ListItem className={"chatmsg"}>
                            <Typography variant='body2' width={"100%"}>{chat.fact}</Typography>
                            <span style={{ position: "absolute", bottom: "0", left: "1em", fontSize: "10px" }}><em>1:30pm</em></span>
                        </ListItem>
                    ))}
                    <div ref={myRef}></div>

                </List>


                <Grid sx={{ display: "flex", alignContent: "center", justifyContent: "space-between" }}>
                    <TextField
                        placeholder='Your message....'
                        size="small"
                        variant="outlined"
                        onChange={onChange}
                        value={value.fact}
                    />
                    <IconButton disabled={!value} onClick={onSubmit} sx={{ padding: "2px" }}><img src={send} width="30px" /></IconButton>
                </Grid>

            </Box>
        </>
    )
}
