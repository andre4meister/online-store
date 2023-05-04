import { createQueriesForFetch } from '../utils/createQueriesForFetch';
import axiosInstance from './axios';

export class OrderApi {
  static async getOrderById(id) {
    try {
      const response = await axiosInstance.get(`orders/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getOrders(filters) {
    try {
      const response = await axiosInstance.get(
        `orders${filters ? createQueriesForFetch(filters || {}) : ''}`,
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  static async createOrder(body) {
    try {
      const response = await axiosInstance.post('orders', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async updateOrder(body) {
    try {
      const response = await axiosInstance.put('orders', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async deleteOrder(id) {
    try {
      const response = await axiosInstance.delete(`Orders/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }
}
