'use client';

import Header from '@/components/layout/Header';
import Cart from '@/components/features/Cart';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/shop');
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Cart onClose={handleClose} />
      </div>
    </div>
  );
} 