import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart} from './components'


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
            console.log('cart.retrieve = ')
            console.log(_cart)
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
    // console.log(cart)
    //    setInterval(() => {
    //    },1000   ) 
    console.log('cartState = ') 
    console.log(cart)

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            {/* <Products products={products} onAddToCart={handleAddToCart}/> */}
            { !loading ? <Cart cart={cart} /> : <h1>Loading data</h1> }
        </div>
    )
}

export default App