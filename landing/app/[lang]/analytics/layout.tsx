import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics Dashboard - Furnite AR',
  description: 'Track AR furniture scanning analytics and user behavior',
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
