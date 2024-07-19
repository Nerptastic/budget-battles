"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'Income' | 'Expense';
}

export default function LatestTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/income/`);
        const expenseResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/expenses/`);
        
        const allTransactions = [
          ...incomeResponse.data.map((income: any) => ({
            ...income,
            category: income.source,
            type: 'Income',
          })),
          ...expenseResponse.data.map((expense: any) => ({
            ...expense,
            type: 'Expense',
          })),
        ];

        const sortedTransactions = allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);

        setTransactions(sortedTransactions);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchData();
  }, []);

  const formatAmount = (amount: number, type: 'Income' | 'Expense') => {
    const sign = type === 'Income' ? '+' : '-';
    return `${sign}${amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Latest Transactions
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source/Category
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    {formatAmount(transaction.amount, transaction.type)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Recent transactions</h3>
        </div>
      </div>
    </div>
  );
}
