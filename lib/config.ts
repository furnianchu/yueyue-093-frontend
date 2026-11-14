// 构建期注入（OpenNext / wrangler 部署时必须存在）
export const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_ORIGIN || 'https://yueyuezidaidaixue.ccwu.cc';

// PV 已改为纯前端 ASCII 逐帧动画（lib/asciiFrames.ts），
// 不再加载任何外部视频、不再需要 NEXT_PUBLIC_PV_BASE。
