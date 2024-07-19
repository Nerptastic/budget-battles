"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { inter } from '@/app/ui/fonts';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: string;
}

export default function TransactionChart() {
  const [incomeData, setIncomeData] = useState<Transaction[]>([]);
  const [expenseData, setExpenseData] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get<Transaction[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/income/`);
        const expenseResponse = await axios.get<Transaction[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/expenses/`);
        setIncomeData(incomeResponse.data);
        setExpenseData(expenseResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const aggregateDataByMonth = (data: Transaction[]): Record<string, number> => {
    const monthlyData: Record<string, number> = {};

    data.forEach((item: Transaction) => {
      const date = new Date(item.date);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      if (!monthlyData[key]) {
        monthlyData[key] = 0;
      }
      monthlyData[key] += parseFloat(item.amount);
    });

    return monthlyData;
  };

  const incomeAggregated = aggregateDataByMonth(incomeData);
  const expenseAggregated = aggregateDataByMonth(expenseData);

  const labels = Array.from(new Set([
    ...Object.keys(incomeAggregated),
    ...Object.keys(expenseAggregated),
  ])).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Income',
        data: labels.map(label => incomeAggregated[label] || 0),
        backgroundColor: 'rgba(22, 163, 74, .7)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: labels.map(label => expenseAggregated[label] || 0),
        backgroundColor: 'rgba(220, 38, 38, .7)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
        text: 'Monthly Income and Expenses',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Monthly Income and Expenses
      </h2>
      <div className="rounded-xl bg-gray-50 p-4" style={{ height: '500px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
