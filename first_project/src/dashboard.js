import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from '@material-ui/core';
import { get_items } from './reducer/data';
import { get_cart, setCount } from "./reducer/cartReducer";
import axios from 'axios';
import './App.css'


const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        margin: '0px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: 'white',
    }
}))

const Dashboard = () => {
    const classes = useStyles();
    const { data } = useSelector((store) => store.items_reducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_items());
        dispatch(get_cart());
        dispatch(setCount());

    }, [])
    const add_to_cart = (itemId) => {
        const config = {
            method: 'POST',
            url: 'http://localhost:3001/save_to_cart',
            data: {
                itemId
            }
        }
        console.log("add to cart", itemId)
        axios(config).then(() => {
            dispatch(setCount(1));
        })
    }

    return (
        <>
            <Grid container spacing={2} className={classes.Grid}>
                {data && data.map((item, i) => {
                    return (<Grid key={i + 1} item xs={12} md={3}>
                        <Paper className={classes.paper}>
                            <img src={item.image} alt={item.name} width="100" height="100" />
                            <br /><br /><hr />
                            <h1>{item.name}</h1>
                            <h1>{item.price}</h1>
                            <input type="button" value="Add" onClick={() => { add_to_cart(item._id) }} />
                        </Paper>
                    </Grid>)
                })}



            </Grid>

        </>
    )
}
export default Dashboard;
