import React from 'react';

interface Income {
  id: number;
  date: string;
  description: string;
  source: string;
  amount: number;
}

interface IncomeTableProps {
  incomes: Income[];
}

const IncomeTable: React.FC<IncomeTableProps> = ({ incomes }) => {
  const sortedIncomes = incomes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
            <th scope="col" className="px-3 py-5 font-medium">Source</th>
            <th scope="col" className="px-3 py-5 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-900">
          {sortedIncomes.map(income => (
            <tr key={income.id} className="group">
              <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                <div className="flex items-center gap-3">
                  <p>{formatDate(income.date)}</p>
                </div>
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                <p className="font-bold">{income.description}</p>
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                {income.source}
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                <p className="text-green-600">{formatAmount(income.amount)}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeTable;