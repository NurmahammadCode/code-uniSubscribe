import axios from "axios";
import { ISubscription } from "../models/types";

export class HttpClient {
  baseUrl;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async get(url: string) {
    return await axios.get(`${this.baseUrl}/${url}`);
  }

  async post(url: string, data: ISubscription[]) {
    return await axios.post(`${this.baseUrl}/${url}`, {
      subscription: data,
    });
  }
}
