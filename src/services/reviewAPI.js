import { createQueriesForFetch } from '../utils/createQueriesForFetch';
import axiosInstance from './axios';

export class ReviewApi {
  static async getReviewById(id) {
    try {
      const response = await axiosInstance.get(`Reviews/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getReviews(filters) {
    try {
      const response = await axiosInstance.get(
        `reviews${filters ? createQueriesForFetch(filters || {}) : ''}`,
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  static async createReview(body) {
    try {
      const response = await axiosInstance.post('reviews', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async updateReview(body) {
    try {
      const response = await axiosInstance.put('reviews', body);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async deleteReview(id) {
    try {
      const response = await axiosInstance.delete(`reviews/${id}`);
      return response;
    } catch (e) {
      return e;
    }
  }
}
