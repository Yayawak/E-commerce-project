import React from 'react'
import { Appbar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} 
    from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/shopIcon.svg'
const Navbar = () => {
    return (
        <>
            <Appbar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography variant='h6' className={classed.title} color='inherit'>
                        <img src={logo} alt="Commerce.js" height='25px' className={classed.image} />
                        Commerce.js
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        <IconButton aria-label='Show cart items' color='inherit'>
                            <Badge badgeContent={2} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </Appbar>
        </>
    )
}

export default Navbar