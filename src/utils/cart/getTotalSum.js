export default function getTotalSum(items) {
    return items.reduce((sum, { item, quantity }) => sum + (item.discounPrice || item.price) * quantity, 0);
}