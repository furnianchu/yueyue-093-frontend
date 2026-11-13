import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '■■■ | 十三位黄金裔',
  description: 'Hello, world!',
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#161616',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body data-stage="night">{children}</body>
    </html>
  );
}
