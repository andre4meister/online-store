export default function getTotalSum(items) {
  return items.reduce((sum, { item, quantity }) => sum + (item.discountPrice || item.price) * quantity, 0);
}
