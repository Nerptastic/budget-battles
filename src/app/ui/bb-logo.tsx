import { inter } from '@/app/ui/fonts';
import { DocumentCurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function BBLogo() {
  return (
    <div
      className={`${inter.className} flex flex-row items-center leading-none text-white`}
    >
      <DocumentCurrencyDollarIcon className="h-12 w-12" />
      <p className="text-[44px] font-bold">Budget</p>
    </div>
  );
}
