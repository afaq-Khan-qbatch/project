import React, { useEffect } from 'react';
import { Switch, Route, Link, useRouteMatch, Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from '@material-ui/core';
import { get_items } from './reducer/data';
import { getDescription } from './reducer/data';
import { get_cart, setCount, addInCart } from "./reducer/cartReducer";
import FacebookLogin from 'react-facebook-login';


import { getCookie, setCookie } from './cookie';

import './App.css'
import Description from './description';
import Error from './Error';

const useStyles = makeStyles((theme) => ({

    grid: {
        width: '100%',
        margin: '0px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        background: 'white',
    }
}))

const Dashboard = (props) => {

    const responseFacebook = (response) => {
        console.log(response);
    }

    const match = useRouteMatch();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { data } = useSelector((store) => store.items_reducer);
    const { token } = useSelector((store) => store.items_reducer);
    const { islogin } = useSelector((store) => store.items_reducer);
    const { Description: d } = useSelector((state) => state.items_reducer);

    useEffect(() => {

        // window.fbAsyncInit = function () {
        //     FB.init({
        //         appId: '182428134050110',
        //         xfbml: true,
        //         version: 'v12.0'
        //     });
        //     FB.AppEvents.logPageView();
        //     FB.getLoginStatus(function (response) {
        //         // statusChangeCallback(response);
        //         console.log('response => ', response);
        //     });
        // };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


        dispatch(get_items());
        dispatch(setCount());
        const token = getCookie('token');
        if (!token) {
            setCookie('token', (Math.random() + 1).toString(36).substring(7));
        }
        dispatch(get_cart());



    }, [])
    const add_to_cart = (_id) => {
        const tokenn = getCookie('token');
        if (!tokenn) {
            setCookie('token', (Math.random() + 1).toString(36).substring(7));
        }
        const token = getCookie('token');
        const uesrdata = {
            id: _id,
            userId: token
        }

        dispatch(addInCart(uesrdata));
        console.log('ok');
        dispatch(setCount(1));

    }
    const setDesc = (itemId) => {
        dispatch(getDescription(itemId));
    }



    return (
        <>
            <div style={{ width: '75%' }}>
                <Grid container spacing={2} className={classes.Grid}>
                    {data && data.map((item, i) => {
                        return (
                            <Grid key={i} item xs={6} md={3} onClick={() => { setDesc(item._id) }}>
                                <Link style={{ textDecoration: 'none' }} to={`${match.url}description/${item._id}`} >
                                    <Paper className={classes.paper}>
                                        <img src={item.image} alt={item.name} width="100" height="100" className='center' />
                                        <br /><br /><hr />
                                        <h1>{item.name}</h1>
                                        <h1 style={{ color: '#dc6e16' }}>Rs.{item.price}</h1>
                                        <input type="button" value="Add" onClick={() => { add_to_cart(item._id) }} style={{ background: 'lightgreen' }} />
                                    </Paper>
                                </Link>
                            </Grid>

                        )
                    })}

                </Grid>
            </div>

            <div style={{ background: 'rgb(213 204 234)', height: '50%', width: '22%', position: 'fixed', top: '85px', right: '10px', textAlign: 'center' }}>
                <h1 style={{ color: 'green' }}>Description</h1>

                <Switch>
                    <Route exact path={`${match.path}description/:id`} component={Description} />
                    {/* <Router component={Error}/> */}
                </Switch>

            </div>


            <FacebookLogin
                appId="565322561343458"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
            />
        </>
    )
}
export default Dashboard;


