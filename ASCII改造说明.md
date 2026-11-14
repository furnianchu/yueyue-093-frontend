# 第 9 步（最终版）｜用 ASCII 逐帧动画替掉全部 PV

## 为什么这么改

整站本来就是终端风，切白后放一段 2K 视频其实是"最不像终端"的一环。
换成字符画之后：

- **0 字节外部资源**：不加载任何 mp4，不依赖 R2 / Blob / Vercel 静态目录
- 一次性绕开前面所有麻烦：770MB、100MB 上传硬限、压片糊成 240p、
  `r2.dev` 限流、自定义域 UAM、`fetch`/`<video>` 不执行 JS 的挑战页
- 纯前端计算，首屏不增加任何请求；切白后动画自己跑
- 理论上还比视频更贴「OVERRIDE_SEQUENCE / CRAWL / DONE」那套叙事

## 做了什么

| 文件 | 变化 |
|---|---|
| `lib/asciiFrames.ts` | **新增**。13 幅专属字符画 + 10 种逐帧特效 + 16 套主题配色 |
| `components/PVPlayer.tsx` | **重写**。视频层 → ASCII 逐帧播放器 + 颜色控制器 |
| `app/globals.css` | 视频样式 → 36×16 网格、四档色阶、发光、切换器样式 |
| `lib/config.ts` | 删掉 `PV_BASE` / `pvUrl` |
| `wrangler.toml` / `deploy.yml` | 删掉 `NEXT_PUBLIC_PV_BASE`（两处都要删） |
| `.env.example` | 同步精简 |

**关键取巧**：`PVHandle` 接口（`warmup` / `start`）**保持原样**，
所以 `Experience.tsx`、`HeirGrid.tsx`、`Terminal.tsx`、`page.tsx` 一行都不用改。

### 13 幅画各有主题

涟漪（昔涟 24 帧最多）、破晓日轮（白厄）、残影闪烁（赛飞儿）、
分形生长（那刻夏）、蝶翼开合（遐蝶）、剑光扫过（万敌 / 丹恒）、
金线编织（阿格莱雅 / 刻律德菈）、气泡上浮（缇宝）、风旋（风堇）、
海潮（海瑟音）、月相脉动（长夜月）。共 **262 帧**，全部运行时生成，
打包体积不到 20 KB。

### 颜色控制器

- 每个角色有默认主题（如昔涟=桃绿、白厄=金黄、长夜月=夜紫）
- 页面上一排 16 个圆点 + ◀▶ 可随时切换，切换只换 CSS 变量，**不重算帧**
- 另附 3 套经典终端色：磷绿 / 琥珀 / 本站品红
- 四档色阶 `shade-0..3`，特效粒子走暗档，主体字走亮档并带辉光

### 控件

播放/暂停、1×/2×/4× 倍速、回到首帧、返回选择、实时 `FRAME 07/24`。
`prefers-reduced-motion` 开启时自动定格首帧（按钮禁用并提示）。

---

## 落地命令（一条一条，别拼一起）

先把 **`ascii_patch.zip`** 下载到手机下载目录，然后：

```sh
cd ~/yueyue-frontend
```
```sh
unzip -o /storage/emulated/0/downlands/ascii_patch.zip -d ~/yueyue-frontend
```
```sh
sed -i -E 's/PLAY_PV :: ([A-Za-z0-9]+)\.mp4/RENDER_SIGNAL :: \1.asc/; s/"pv": "([A-Za-z0-9]+)\.mp4"/"pv": "\1.asc"/' lib/heirs.ts
```
```sh
rm -rf public/pv
```
```sh
grep -rn '\.mp4\|PV_BASE\|pvUrl' --include='*.ts' --include='*.tsx' --include='*.toml' --include='*.yml' . | head
```
```sh
git status --short
```
```sh
git add -A && git commit -m "feat: replace video PV with ASCII frame animation + theme switcher" && git push
```
```sh
gh run watch --repo furnianchu/yueyue-093-frontend
```

**说明**

- `unzip -o` 会覆盖 7 个文件，**不会碰** `heirs.ts`（那文件 4000+ 行，
  用 sed 精准改 26 处更安全，也保留你可能做过的自定义）
- 第 5 条 grep 应该**没有任何输出**；有就贴给我
- `rm -rf public/pv` 只删前端那个空占位目录。后端 `ccwu.cc/pv` 不用管，
  前端已经不再访问它；`~/pv_originals` 里的 2K 原片**别删**，留着当收藏
- 前端走 CI 部署，**本地不要跑 `npm run deploy`**（Termux 上 workerd 会挂）

---

## 验收

无痕窗口打开 `https://yueyuezidaidaixue.de5.net/` → 点一张卡：

1. 终端逐字跑完 → 90% 停顿 → 100% DONE → 切白
2. 切白后应该看到**会动的字符画**（不再是「文件未找到」占位）
3. 点下方圆点换配色，画面立刻变色、动画不中断
4. 试 ❚❚ 暂停 / 4× 倍速 / ↺ 回到首帧

CF 主域的 Under Attack 会先弹一张 "Just a moment..."，浏览器自己解完
自动跳入，**别刷新**。这次页面里没有任何跨域子资源，UAM 不会再坑到我们。

---

## 想再调

- **换某角色的画**：改 `lib/asciiFrames.ts` 里 `DEFS[角色id].art`，
  每行 ≤36 列、总行数 ≤16（短了会自动垂直居中）；纯 ASCII，别放中文
  （中文放 `caption`，那行是正常排版，不占网格）
- **加/减帧**：改 `frames`（帧数）和 `fps`（每秒帧数）
- **换特效**：`fx` 可选 `ripple / rise / flicker / grow / flap / slash / weave / float / spin / pulse`
- **加主题**：往 `THEMES` 追加一条 `{id,label,c0,c1,c2,c3,glow}`，
  切换器圆点会自动多一个
- **改文案**：角色卡末尾那行 `RENDER_SIGNAL :: XXX.asc` 在 `heirs.ts`

## 回滚

```sh
git revert HEAD && git push
```
CI 会自动重新部署回视频版（但视频文件已删，会走降级占位）。
