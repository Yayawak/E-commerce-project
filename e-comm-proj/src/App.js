import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart, LoadingPage} from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () =>  {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
        setLoading(false)
    }
    const fetchCart = async () => {
        try {
            const _cart = await commerce.cart.retrieve();
            setCart(_cart);
            // setCart(await commerce.cart.retrieve()) //this is not works i guess it use long time to retrieve data
            // console.log('cart.retrieve = ')
            // console.log(_cart)
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
        // commerce.cart.retrieve().then(cart => console.log(cart))
        // commerce.cart.retrieve().then(cart => setCart(cart))

        // console.log(`cart contains`)
    }
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart)
    }
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    // console.log('cartState = ') 
    // console.log(cart)

    
    return (
        <Router>
            
        <div>
            <Navbar totalItems={cart.total_items} />
            <Routes>
                <Route path='/' element={
                    <Products products={products} onAddToCart={handleAddToCart}/>
                } exact/>
                <Route path='/cart' element={ 
                    !loading ? <Cart cart={cart} /> : <LoadingPage />
                } exact/>
            </Routes>
        </div>
        </Router>
    )
}

export default App