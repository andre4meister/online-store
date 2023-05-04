export default function getTotalSum(items) {
    return items.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
}