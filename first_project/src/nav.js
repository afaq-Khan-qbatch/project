import React from 'react';
import { NavLink } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import { useDispatch, useSelector } from "react-redux";
import { get_cart, setCount } from "./reducer/cartReducer";
import {getCookie , setCookie} from './cookie';

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        margin: '0px',
        position: 'fixed'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'right',
        color: theme.palette.text.primary,
        background: 'lightblue',
    }
}))

const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { count } = useSelector((store) => store.cart_Reducer);

    const get_cart_item = () => {
        dispatch(setCount(1));
      
        const Token = getCookie('UserId');
        if(!Token){
            setCookie('UserId' , (Math.random() + 1).toString(36).substring(7));
        }

        dispatch(get_cart(Token));
    }

    return (
        <Grid container item xs={12} lg={12} md={12} className={classes.Grid} style={{ marginBottom: '8px' }}>
            <Grid item xs={12} sm={12} lg={12} md={12} >
                <Paper className={classes.paper}>
                    <NavLink to='/cart' onClick={(e) => { get_cart_item() }}>
                        <Badge color="secondary" badgeContent={count} max={999}>
                            <AddShoppingCartIcon />
                        </Badge>
                    </NavLink>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default NavBar;