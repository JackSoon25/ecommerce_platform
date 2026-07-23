import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "./CartStore";
import { useFlashMessage } from "./FlashMessageStore";
import { Link } from "wouter";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductPage() {

    const {addToCart} = useCart();
    const{ showMessage } = useFlashMessage();
    const [products, setProducts] = useState([]);

    // call the effect function once after the compoent renders for the first time.
    useEffect( () => {
        const fetchProducts = async () => {
            const response = await axios.get(API_URL + '/products');
            setProducts(response.data);
        }
        fetchProducts();
        
        // async function fetchData() {
        //     const response = await axios.get("products.json");
        //     setProducts(response.data);
        // }
        // fetchData();
    }, []);
    
    return (<>
        <div className="container">
            <h1>Our Products</h1>
            <div className="row">
                {
                    products.map((p) => {
                        return ( 
                            <div className="col-md-3 mb-4" key={p.id}>
                                <ProductCard
                                    name={p.name}
                                    price={p.price}
                                    imageUrl={p.imageUrl}
                                    onAddToCart={()=>{
                                        addToCart(p);
                                        // showMessage("Product added to shopping cart successfully.", "success");
                                        showMessage(<div>
                                            Product added to shopping cart successfully.   
                                            <Link href="/cart" className="btn btn-primary btn-sm">Go to cart</Link>
                                        </div>, "success");
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>)


}