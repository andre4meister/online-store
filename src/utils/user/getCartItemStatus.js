import getUserData from "./getUserData";

export default function getCartItemStatus(itemId) {
    const userData = getUserData();
    const cartItems = userData.cart.cartItemsList;

    const cartItem = cartItems.find(item => item.itemId === itemId);
    return Boolean(cartItem);
}