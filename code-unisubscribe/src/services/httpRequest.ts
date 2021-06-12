import axios from "axios";
import { ISubscription } from "../models/types";

export class HttpClient {
  baseUrl;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async get(url: string) {
    const token = localStorage.getItem("token");
    return await axios.get(`${this.baseUrl}/${url}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  async post(url: string, data: any) {
    const token = localStorage.getItem("token");
    return await axios.post(`${this.baseUrl}/${url}`, data, {
      headers: {
        Authorization: token,
      },
    });
  }

  async delete(url: string) {
    const token = localStorage.getItem("token");
    return await axios.delete(`${this.baseUrl}/${url}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  async edit(url: string, data: any) {
    const token = localStorage.getItem("token");
    return await axios.put(`${this.baseUrl}/${url}`, data, {
      headers: {
        Authorization: token,
      },
    });
  }
}
