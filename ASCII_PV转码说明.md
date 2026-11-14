# PV → 真·字符画（离线预转）

## 这次和上一版的区别

上一版 `lib/asciiFrames.ts` 里的 262 帧，是**手绘字符底图 + 程序特效**（涟漪/剑光/蝶翼…）生成的，
跟你的 PV 画面没有关系。

这一版是**把你 13 个 PV 的真实画面逐帧翻译成字符画**，在手机上一次性转好，
产物是纯文本 `.asc`，前端只播这些字符帧：

```
原片 770 MB  →  .asc 纯文本十几 MB  →  Worker 静态资源 gzip 后几 MB
```

不依赖 R2 / Blob / Vercel 100 MB 上传限，也不用压片牺牲画质 ——
字符网格只有 64×20，源视频是 2K 还是 540p 转出来**几乎一样**。

## 文件

| 文件 | 放哪 | 作用 |
|---|---|---|
| `pv2ascii.js` | `~/yueyue-frontend/`（跑完可删） | Termux 上离线转码，只依赖 ffmpeg |
| `lib/ascLoader.ts` | 覆盖 | fetch + 解析 `.asc`，带缓存，失败静默 |
| `components/PVPlayer.tsx` | 覆盖 | 优先播真实帧，未就绪用旧程序生成帧兜底 |
| `app/globals.css` | 覆盖 | 原样式 + 10 级色阶、64 列字号覆盖 |

`heirs.ts` / `wrangler.toml` / `deploy.yml` / `asciiFrames.ts` / `config.ts` **都不用动**。
`heirs.ts` 里的 `"pv": "Xxx.asc"` 正好对上新产物文件名。

## 落地命令

先下载 `ascii_pv_patch.zip` 到手机下载文件夹：

```sh
cd ~/yueyue-frontend
```
```sh
unzip -o /storage/emulated/0/downlands/ascii_pv_patch.zip -d ~/yueyue-frontend
```
```sh
node pv2ascii.js --src ~/pv_originals --out ~/yueyue-frontend/public/pv
```

汇总里会打印 **源视频 / 纯文本 / gzip 后** 三个体积和缩小倍数。
`public/pv/` 不存在会自动建；已存在的 `.asc` 默认跳过，重转加 `--force`。

```sh
ls -1 public/pv/*.asc | wc -l
```
```sh
rm -f pv2ascii.js ASCII_PV转码说明.md
```
```sh
git add -A && git commit -m "feat: offline PV-to-ASCII frames (real video, gzip-friendly)" && git push
```
```sh
gh run watch --repo furnianchu/yueyue-093-frontend
```

`unzip` 只覆盖 4 个文件，不动你那份 4000 行的 `heirs.ts`。

## 档位

| 想要 | 参数 |
|---|---|
| 默认（推荐） | 64×20 / 6fps / 全片 |
| 更省 | `--preset lite` → 48×15 / 4fps |
| 只要精华 | `--preset clip` → 只取前 45 秒 |
| 只转一个试试 | `--only PhiLia093` |
| 手动调 | `--fps 8 --cols 80 --rows 24` |
| 重转 | `--force` |

**建议先 `--only PhiLia093` 跑一个看效果**，满意了再全量转，省得白等。

## 耗时与体积

- 手机解码 2K h264 全片，13 个可能 **20~40 分钟**，别锁屏断网；中断后重跑会自动补没转完的
- 想快很多：用之前压片留在 `~/yueyue-api/public/pv/` 的 540p 成品当 `--src`，字符网格下看不出差别
- 输出是纯文本、大量重复空格/字符，gzip 压缩比很高；Worker 静态资源会自动 gzip/brotli 传输
- 首屏只 fetch 当前角色那一个 `.asc`，不会一次拉全部

## 颜色控制器

每帧开头 6 位 hex 是该帧**主色**（取亮部平均、归一化提亮）。

- 默认 **「◈ 原片色」**：整屏四档色由这一帧的主色派生，镜头冷暖跟着 PV 走
- 点 ◀ ▶ / 圆点 / 「◈ 主题色」→ 切回 16 套主题色，玩法和上一版一样

## 验收

无痕窗口开 `de5.net` 点一张卡 → 切白后是**会动的 PV 字符画**，
帧号从 `001/xxx` 走，配色随镜头变。若某张显示的是旧的几何图案，
说明那个 `.asc` 没生成或没传上去 —— 兜底帧生效了，站不会白屏。

```sh
curl -sI https://yueyuezidaidaixue.de5.net/pv/PhiLia093.asc | head -8
```
期望 `200` + `content-type` 文本类型。

## 回滚

```sh
git revert HEAD
```
或把 `components/PVPlayer.tsx` / `app/globals.css` 换回 `ascii_patch.zip` 里的版本。
`lib/asciiFrames.ts` 一直保留，删掉 `public/pv/*.asc` 即自动回到程序生成帧。

## 原片

`~/pv_originals` 里那 770 MB 无损 2K + HiFi **别删**，是唯一副本。
以后想换回真视频（Pro / Blob / R2），随时能原样端回去。
