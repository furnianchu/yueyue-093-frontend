// 翁法罗斯背景：双纽线 ∞ 字符画 + 轮回轨道 + 跳出代码语段
// 纯 CSS 动画驱动，不请求任何资源，不拦截点击。
// 由 components/Experience.tsx 挂载，替代原来的 .backdrop 空 div。

const INFINITY_ART = [
  "                                    .",
  "                            .. .. . .. . .. . .",
  "                     . .. ..                   . .. ..",
  "                ... .                                  .. ..        .",
  "            ...                                             . ..",
  "         . @@@@@@@@@@@@       .                      @@@@@@@@@@@@.",
  "  .    .@@@@          @@@@                  .     @@@@          @@@@.    .",
  "     .@@@                @@@@                  @@@@       .        @@@.",
  "   ..@@                     @@@              @@@                     @@..",
  "  ..@@                        @@@.         @@@   .                    @@..",
  " ..@@                       .   @@@      @@@                           @@..",
  " . @                              @@    @@                              @ .",
  " . @                               @@@@@@                               @ .",
  " . @                                 @@          .                      @=..",
  " ..@                               @@@@@@                               @ .",
  " . @                              @@    @@           .                  @ .",
  "  .@@     .                     @@@      @@@        .                  @@.",
  "  ..@@                        @@@      .   @@@.                       @@.",
  "    .@@                     @@@     .        @@@                     @@.",
  "     .@@@  .             @@@@            .     @@@@                @@@.",
  "       .@@@@          @@@@   .                    @@@@          @@@@.",
  "          .@@@@@@@@@@@@                              @@@@@@@@@@@@..",
  "         .  .. .                            .                ..",
  "         .      .. .    .                              . .. .",
  "                    . .. .. .                   .. . ..          .",
  "           .                  .. . .. . .. . ..",
  "      .",
];

type CodeItem = { text: string; left: number; top: number; delay: number };
const CODES: CodeItem[] = [
  { text: "print \"(hello.world)\"", left: 7, top: 17, delay: 0.0 },
  { text: "while (cycle < 33550336):", left: 71, top: 11, delay: 1.9 },
  { text: ">>> 093 :: EGO", left: 12, top: 71, delay: 3.8 },
  { text: "for heir in Amphoreus:", left: 76, top: 64, delay: 5.7 },
  { text: "if signal == \"PhiLia093\":", left: 5, top: 45, delay: 7.6 },
  { text: "yield \"明天见\"", left: 64, top: 85, delay: 9.5 },
  { text: "const ∞ = new Cycle()", left: 20, top: 88, delay: 11.4 },
  { text: "// 翁法罗斯 · 轮回未止", left: 86, top: 37, delay: 13.3 },
  { text: "print \"(hello.world)\"", left: 46, top: 7, delay: 15.2 },
];

export default function AmphoreusBackdrop() {
  return (
    <div className="amph-backdrop" aria-hidden="true">
      <div className="amph-orbit" />
      <pre className="amph-infinity">{INFINITY_ART.join("\n")}</pre>
      <div className="amph-codes">
        {CODES.map((c, i) => (
          <span
            key={i}
            className="amph-code"
            style={{
              left: `${c.left}%`,
              top: `${c.top}%`,
              animationDelay: `${c.delay}s`,
            }}
          >
            {c.text}
          </span>
        ))}
      </div>
    </div>
  );
}
