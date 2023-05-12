export default function createOrderValidation(orderBody) {
  const { userId, items, price, recipientInfo, delivery } = orderBody;

  if (!userId) {
    throw new Error('userId is required');
  }
  if (!items || items.length === 0) {
    throw new Error('items is required');
  }

  if (!price || typeof price !== 'number' || price < 1) {
    throw new Error('price is required');
  }

  if (!recipientInfo) {
    throw new Error('recipientInfo is required');
  }

  if (!delivery) {
    throw new Error('delivery is required');
  }
}
