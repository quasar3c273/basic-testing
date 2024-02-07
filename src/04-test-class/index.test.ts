// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

import { random } from 'lodash';
jest.mock('lodash');

const ZERO = 0;
const ONE = 1;
const startBalance = 100;
const littleBalance = 50;
const withdrawing = 200;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(startBalance);
    expect(account.getBalance()).toBe(startBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(startBalance);
    expect(() => account.withdraw(withdrawing)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(startBalance);
    const account2 = getBankAccount(startBalance);
    expect(() => account1.transfer(withdrawing, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(startBalance);
    expect(() => account.transfer(startBalance, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(startBalance);
    account.deposit(littleBalance);
    expect(account.getBalance()).toBe(startBalance + littleBalance);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(startBalance);
    account.withdraw(littleBalance);
    expect(account.getBalance()).toBe(littleBalance);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(startBalance);
    const account2 = getBankAccount(littleBalance);
    account1.transfer(littleBalance, account2);
    expect(account1.getBalance()).toBe(littleBalance);
    expect(account2.getBalance()).toBe(startBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(startBalance);
    (random as jest.Mock).mockReturnValue(ONE);
    const balance = await account.fetchBalance();
    expect(balance).toBeGreaterThanOrEqual(ZERO);
    expect(balance).toBeLessThanOrEqual(startBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(startBalance);
    account.fetchBalance = jest.fn().mockResolvedValue(littleBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(littleBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(startBalance);
    (random as jest.Mock).mockReturnValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
