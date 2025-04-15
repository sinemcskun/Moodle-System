"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gray-100 border-b p-6 flex justify-between items-center">
        <a href="/" title="Ana Sayfa">
          <img src="/ogmer.png" alt="Logo" width={100} height={50} />
        </a>
        <Button onClick={handleLoginClick} className="bg-red-600 text-white px-4 py-2 rounded-lg">
          Log In
        </Button>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-semibold">Hoş Geldiniz</h2>
        <p className="text-gray-600 mt-2">Sisteme giriş yapmak için "Log In" butonuna tıklayın.</p>
      </main>
    </div>
  );
}