'use client';

import ClientLayout from '@/components/ClientLayout';
import IntroView from '@/components/views/IntroView';

export default function Home() {
  return (
    <ClientLayout>
      {({ isDark }) => <IntroView isDark={isDark} />}
    </ClientLayout>
  );
}
