import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} 
    from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/shop-store.svg'
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation(); // current route
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt="Commerce.js" height='25px' className={classes.image} />
                        Commerce.js
                    </Typography>
                    <div className={classes.grow} />
                    {/* if we are on home route then show ShoppingCart*/}
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                            <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
                                <Badge badgeContent={totalItems} color='secondary'>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar