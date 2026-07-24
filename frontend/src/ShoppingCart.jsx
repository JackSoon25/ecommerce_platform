import { useCart } from "./CartStore";
import { useEffect } from "react";
import { useJWT } from "./UserStore";
import { useFlashMessage } from "./FlashMessageStore";
import axios from 'axios';

export default function ShoppingCart() {

    const { cart, getCartTotal, removeFromCart, modifyQuantity, fetchCart } = useCart();
    const { jwt } = useJWT();
    const {showMessage : showFlashMessage } = useFlashMessage();

    useEffect(() => {
        if (jwt) {
            fetchCart();
        }
    }, [jwt]);

    const handleCheckout = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/checkout', {}, {
                headers:{
                    Authorization: "Bearer " + jwt
                }
            })
            // use window.location to redirect
            window.location = response.data.url;

        } catch (e) {
            showFlashMessage("unable to checkout", "danger");
        }
         
    }

    return <>
        <div className="container mt-4">
            <h2> Shopping Cart </h2>
            <ul className="list-group">
                {
                    cart.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                            <div>
                                <h5>{item.name}</h5>
                                <p>
                                    <button className="btn btn-primary btn-sm ms-2 me-2"
                                        onClick={() => {
                                            modifyQuantity(item, item.quantity - 1);
                                        }}
                                        disabled={item.quantity === 1}
                                    >-</button>
                                    Quantity: {item.quantity}
                                    <button className="btn btn-primary btn-sm ms-2 me-2"
                                        onClick={() => {
                                            modifyQuantity(item, item.quantity + 1);
                                        }}
                                    >+</button>
                                </p>
                            </div>
                            <div>
                                <img src={item.imageUrl} />
                            </div>
                            <div>
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div>
                                <button className="btn btn-danger"
                                    onClick={() => {
                                        removeFromCart(item);
                                    }}>Remove</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
            <button 
                className="btn btn-success"
                onClick={()=>{
                    handleCheckout();
            }}>Checkout</button>
        </div>



    </>
}