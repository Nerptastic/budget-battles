"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BanknotesIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: DocumentDuplicateIcon,
  savings: ArrowTrendingUpIcon,
  transactions: DocumentTextIcon,
};


export default function CardWrapper() {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [netSavings, setNetSavings] = useState<number>(0);
  const [transactionCount, setTransactionCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/income/`);
        const expenseResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/expenses/`);
        
        const totalIncome = incomeResponse.data.reduce((acc: number, income: any) => acc + parseFloat(income.amount), 0);
        const totalExpenses = expenseResponse.data.reduce((acc: number, expense: any) => acc + parseFloat(expense.amount), 0);
        const netSavings = totalIncome - totalExpenses;
        const transactionCount = incomeResponse.data.length + expenseResponse.data.length;

        setTotalIncome(totalIncome);
        setTotalExpenses(totalExpenses);
        setNetSavings(netSavings);
        setTransactionCount(transactionCount);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card title="Total Income" value={totalIncome} type="collected" />
      <Card title="Total Expenses" value={totalExpenses} type="pending" />
      <Card title="Net Savings" value={netSavings} type="savings" />
      <Card title="Transactions" value={transactionCount} type="transactions" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'collected' | 'pending' | 'savings' | 'transactions';
}) {
  const Icon = iconMap[type];

  const formatValue = (value: number | string) => {
    if (type === 'transactions') {
      return value.toString();
    }
    if (typeof value === 'number') {
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }
    return value;
  };

  const valueStyle =
    type === 'collected' ? 'text-green-600' : type === 'pending' ? 'text-red-600' : '';

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className={`${inter.className} ${valueStyle} truncate rounded-xl bg-white px-4 py-8 text-center text-4xl`}>
        {formatValue(value)}
      </p>
    </div>
  );
}
