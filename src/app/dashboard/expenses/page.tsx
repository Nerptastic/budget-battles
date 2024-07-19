"use client";

import { Suspense, useState, useEffect } from 'react';
import Search from '@/app/ui/search';
import { inter } from '@/app/ui/fonts';
import ExpenseTable from '@/app/components/ExpenseTable';
import axios from 'axios';

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/expenses/`)
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the expense data!', error);
      });
  }, []);

  return (
    <div className="w-full">
      <h1 className={`${inter.className} mb-8 text-xl md:text-2xl`}>
        Expenses
      </h1>
      <Suspense fallback={<div>Loading search...</div>}>
        <Search placeholder="Search income..." />
      </Suspense>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <ExpenseTable expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
}