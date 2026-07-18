import { atom, useAtom } from 'jotai';

const initialCart = [
    // {
    //     "id": 1,
    //     "product_id": 1,
    //     "quantity": 10,
    //     "price": 12.99,
    //     "name": "Organic Green Tea",
    //     "imageUrl": "https://picsum.photos/id/225/300/200",
    //     "description": "Expensive organic green tea"
    // },
    // {
    //     "id": 2,
    //     "product_id": 2,
    //     "quantity": 9,
    //     "name": "Organic red Tea",
    //     "price": 15.99,
    //     "imageUrl": "https://picsum.photos/id/2/300/200",
    //     "description": "Expensive red green tea"
    // }

]

const cartAtom = atom(initialCart);

export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);

    const getCartTotal = () => {
        let total = 0;
        cart.forEach((c) => {
            total += c.quantity * c.price;
        });
        return total;
    }
    // receives one parameter, which is the product that we wnat to add
    //expected shape of the product
    // - product_id : the id of the product
    // - name: name ofthe product
    // - price: price of the product
    // - imageUrl: imageUrl of the product
    // -description: the description of the product

    const addToCart = (product) => {

        // if the product is already in the shopping cart, increase its 
        // quantity by 1
        const existingProductIndex = cart.findIndex(cartItem => cartItem.product_id === product.id);

        // if the product is not in the shopping cart, then the index returned -1
        if (existingProductIndex == -1) {
            const newCartItem = {
                "id": Math.floor(Math.random() * 10000 + 1),
                "product_id": product.id,
                "quantity": 1,
                "price": product.price,
                "name": product.name,
                "imageUrl": product.imageUrl,
            }

            // clone -> modify the clone -> replace the clone in the atom
            const cloned = [...cart, newCartItem]
            setCart(cloned);
        } else {
            // find the exisitng cart item with the product id we are looking fro
            const existingCartItem = cart[existingProductIndex];
            // increases itquantit by 1
            existingCartItem.quantity += 1;

            // create a clone and modfy the clone
            const cloned = cart.with(existingProductIndex, existingCartItem);
            // replace the array in the atom
            setCart(cloned);
        }
    }

    // item is a cartItem
    const removeFromCart = (item) => {
        // 1. find the index of the item we delete
        const indexToDelete = cart.findIndex(i => i.product_id === item.product_id);

        if (indexToDelete > -1) {
            // 2. clone the array
            // 3. modify the clone to delete the item by ites index
            const cloned = cart.toSpliced(indexToDelete, 1);
            // 4. replace the clone into the atom
            setCart(cloned);
        }
    }

    const modifyQuantity = (item, newQuantity) => {

        if (newQuantity <=0) {
            return;
        }
        // 1. find the index of the item wewant to tweak the quantity for
        const indexToModify = cart.findIndex(i => i.product_id == item.product_id);

        // 2. clone the cart item
        const modifiedCartItem = {...cart[indexToModify]}; 
        // 3. modify the copy of the cart item
        modifiedCartItem.quantity = newQuantity;
        // 3. clone the cart array
        // 4. update the cart
        const clonedCart = cart.with(indexToModify, modifiedCartItem);
        // 5. replace the cart atom with the cloned
        setCart(clonedCart);
    }

    return {
        cart, getCartTotal, addToCart, removeFromCart, modifyQuantity
    }
}

