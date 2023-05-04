import axiosInstance from './axios';

export class DashboardApi {
  static async getCategory(id) {
    try {
      const response = await axiosInstance.get(`category${id ? `/${id}` : ''}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getSubCategory(id) {
    try {
      const response = await axiosInstance.get(`subCategory${id ? `/${id}` : ''}`);
      return response;
    } catch (e) {
      return e;
    }
  }
}
