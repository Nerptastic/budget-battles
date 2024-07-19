import React from 'react';

interface Expense {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
}

interface ExpenseTableProps {
  expenses: Expense[];
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses }) => {
  const sortedExpenses = expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatAmount = (amount: number | string) => {
    const numAmount = Number(amount);
    return numAmount % 1 === 0 ? `$${numAmount.toFixed(0)}` : `$${numAmount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
      <table className="min-w-full rounded-md text-gray-900 md:table">
        <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Date</th>
            <th scope="col" className="px-3 py-5 font-medium">Description</th>
            <th scope="col" className="px-3 py-5 font-medium">Category</th>
            <th scope="col" className="px-3 py-5 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-900">
          {sortedExpenses.map(expense => (
            <tr key={expense.id} className="group">
              <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                <p>{formatDate(expense.date)}</p>
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                <p className="font-bold">{expense.description}</p>
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                {expense.category}
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
              <p className="text-red-800">{formatAmount(expense.amount)}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;