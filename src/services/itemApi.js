import { createQueriesForFetch } from '../utils/createQueriesForFetch';
import axiosInstance from './axios';

export class ItemApi {
  static async getItemById(id) {
    try {
      const response = await axiosInstance.get(`items/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getItems(filters) {
    try {
      const response = await axiosInstance.get(
        `items${filters ? createQueriesForFetch(filters || {}) : ''}`,
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  static async createItem(body) {
    try {
      const response = await axiosInstance.post('items', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async updateItem(body) {
    try {
      const response = await axiosInstance.put('items', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async deleteItem(id) {
    try {
      const response = await axiosInstance.delete(`items/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }
}
