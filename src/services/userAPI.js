import getToken from '../utils/user/getToken';
import axiosInstance from './axios';

export class UserAPI {
  static async getUserById(id) {
    try {
      const response = await axiosInstance.get(`users/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async login(data) {
    try {
      const response = await axiosInstance.post('auth/login', JSON.stringify(data));
      return response;
    } catch (e) {
      return e;
    }
  }

  static logout() {
    localStorage.setItem('isAuth', JSON.stringify(false));
    localStorage.setItem('userData', '');
    localStorage.setItem('token', '');
    window.location.reload();
  }

  static async register(data) {
    try {
      const { email, password, userName, phone } = data;
      const body = { email, password, userName, phone };

      const response = await axiosInstance.post('auth/register', JSON.stringify(body));
      return response;
    } catch (e) {
      return e;
    }
  }

  static async updatePersonalInfo(data) {
    const token = getToken();
    const body = { token };
    try {
      const response = await axiosInstance.put(`users/${data.id}`, JSON.stringify(data));
      return response;
    } catch (e) {
      return e;
    }
  }

  static async updatePassword(data) {
    try {
      const response = await axiosInstance.put(`users/change-password/${data.id}`, JSON.stringify(data));
      return response;
    } catch (e) {
      return e;
    }
  }

  static async deleteAccount(data) {
    try {
      const response = await axiosInstance.delete(`users/${data.id}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async addItemToLiked(data) {
    try {
      const response = await axiosInstance.put(
        `users/addUserToLikedItems/${data.userId}`,
        JSON.stringify(data),
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  static async deleteItemFromLiked(data) {
    try {
      const response = await axiosInstance.put(
        `users/deleteUserFromLikedItems/${data.userId}`,
        JSON.stringify(data),
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  static async addItemToUserCart(data) {
    try {
      const response = await axiosInstance.put(
        `users/addItemToUserCart/${data.userId}`,
        JSON.stringify(data),
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  static async deleteItemFromUserCart(data) {
    try {
      const response = await axiosInstance.put(
        `users/deleteItemFromUserCart/${data.userId}`,
        JSON.stringify(data),
      );
      return response;
    } catch (e) {
      return e;
    }
  }
}
