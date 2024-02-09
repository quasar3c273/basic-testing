// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((func: void) => func),
}));

jest.mock('axios');
const baseURL = 'https://jsonplaceholder.typicode.com';
const response = { data: 'data' };
const pathTest = '/posts';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue(response);
    jest.spyOn(axios, 'create').mockReturnThis();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(pathTest);
    expect(jest.spyOn(axios, 'create')).lastCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(pathTest);
    expect(axios.get).toHaveBeenCalledWith(pathTest);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(pathTest);
    expect(result).toEqual(response.data);
  });
});
