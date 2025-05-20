"use client";

import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center overflow-hidden scroll-smooth">
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>
    </main>
  );
}
