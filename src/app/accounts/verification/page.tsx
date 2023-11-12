import VerificationMail from '@/components/icons/VerificationMail';
import Link from 'next/link';

export default function VerificationPage() {
  return (
    <main className="flex justify-center flex-col items-center">
      <div className="flex flex-col items-center border border-gray-300 m-3 p-10">
        <VerificationMail />
        <h1 className="text-3xl font-semibold">Verification Mail Sent</h1>
        <p>Check your requested email and click the requested link</p>
        <Link
          href="/accounts/login"
          className="mt-8 bg-blue-400 focus:bg-blue-500 hover:bg-blue-500 w-1/2 text-center p-1 rounded-md text-white transition-colors"
        >
          Next
        </Link>
      </div>
    </main>
  );
}
