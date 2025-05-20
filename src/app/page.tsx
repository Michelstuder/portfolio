'use client';

import Hero from '@/components/sections/hero';

export default function Home() {
  return (
    <main className='scroll-smooth flex flex-col items-center h-screen overflow-hidden'>
      <section id='hero' className='min-h-screen'>
        <Hero />
      </section>
    </main>
  );
}
