const fs = require('fs');
const code = `'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/login');
  }, [router]);
  return null;
}`;
fs.writeFileSync('src/app/page.tsx', code, 'utf8');
console.log('Done! Check page.tsx now');
console.log(fs.readFileSync('src/app/page.tsx', 'utf8'));