import { useCart } from "./CartStore";
import { useEffect } from "react";
import { useJWT } from "./UserStore";
import { use } from "react";

export default function ShoppingCart() {

    const { cart, getCartTotal, removeFromCart, modifyQuantity, fetchCart } = useCart();
    const { jwt } = useJWT();
    useEffect(() => {
        if (jwt) {
            fetchCart();
        }
    }, [jwt]);

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
        </div>



    </>
}