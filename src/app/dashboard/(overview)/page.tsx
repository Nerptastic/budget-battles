import { inter } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { Metadata } from 'next';
import {
  ExpenseChartSkeleton,
  LatestTransactionsSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

import CardWrapper from '@/app/ui/dashboard/cards';
import { Card } from '@/app/ui/dashboard/cards';
import SpendChart from '@/app/ui/dashboard/transaction-chart';
import LatestTransactions from '@/app/ui/dashboard/latest-transactions';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<ExpenseChartSkeleton />}>
          <SpendChart />
        </Suspense>
        <Suspense fallback={<LatestTransactionsSkeleton />}>
          <LatestTransactions />
        </Suspense>
      </div>
    </main>
  );
}