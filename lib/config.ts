// 构建期注入（OpenNext / wrangler 部署时必须存在）
export const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_ORIGIN || 'https://yueyuezidaidaixue.ccwu.cc';

// PV 由 Vercel 后端托管（二选一，见部署说明）：
//   A. 后端 public 静态：https://yueyuezidaidaixue.ccwu.cc/pv
//   B. Vercel Blob 公共库：https://<store-id>.public.blob.vercel-storage.com/pv
// 前端 <video> 不带 crossorigin，跨域直连不发 CORS 请求，后端不用配 CORS。
// 不要写 /api/xxx 代理：Vercel Function 请求/响应体上限 4.5 MB。
export const PV_BASE = (
  process.env.NEXT_PUBLIC_PV_BASE || 'https://yueyuezidaidaixue.ccwu.cc/pv'
).replace(/\/$/, '');

export const pvUrl = (file: string) => `${PV_BASE}/${file}`;
