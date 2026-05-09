import React from 'react';
import { Header, Footer } from '../components/Layout';
import { EmptyState } from '../components/Common';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-16 min-h-[70vh]">
        <EmptyState title="404 - Page Not Found" description="Sorry, the page you are looking for does not exist." icon="🚫" />
      </main>
      <Footer />
    </>
  );
}
