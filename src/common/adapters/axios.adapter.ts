import axios, { AxiosInstance } from 'axios';
import { IHttpAdapter } from '../interfaces/http-adapter.interface';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements IHttpAdapter {
  private readonly axiosInstance: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axiosInstance.get<T>(url);

      return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
