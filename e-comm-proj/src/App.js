import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart, LoadingPage, Checkout} from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () =>  {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('')
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
        setLoading(false)
    }
    const fetchCart = async () => {
        try {
            const _cart = await commerce.cart.retrieve();
            setCart(_cart);
            // console.log('cart.retrieve = ')
            // console.log(_cart)
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    }
    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }
    const handleUpdateCartQty = async (productId ,quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart)
    }
    const handleRemoveFromCart = async (productId) => {
        const {cart } = await commerce.cart.remove(productId);
        setCart(cart)
    }
    const handleEmptyCart = async () => {
        const {cart } = await commerce.cart.empty();
        setCart(cart)
    }
    // refresh cart after paid money
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        console.log('refleshed cart')
        setCart(newCart)
    }
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
            console.log('handled capture')
        } catch (error) {
            setErrorMessage(error.data.error.message)            
        }
    }
    
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    
    return (
        <Router>
            
        <div>
            <Navbar totalItems={cart.total_items} />
            <Routes>
                <Route path='/' element={
                    <Products products={products} onAddToCart={handleAddToCart}/>
                } exact/>
                <Route path='/cart' element={ 
                    loading ?  <LoadingPage /> : 
                    <Cart cart={cart} 
                        handleUpdateCartQty={handleUpdateCartQty }
                        handleRemoveFromCart={handleRemoveFromCart }
                        handleEmptyCart={handleEmptyCart }
                        /> 
                } exact/>
                <Route exact path='/checkout' element={<Checkout cart={cart} 
                    order={order}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage } 
                />} />
            </Routes>
        </div>
        </Router>
    )
}

export default App