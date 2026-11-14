export type Tone = 'plain' | 'ok' | 'alert' | 'info' | 'comment' | 'aha' | 'signal' | 'prompt';
export type Seg = { t?: Tone; text: string };
export type TLine =
  | { kind: 'text'; segs: Seg[]; pause?: number; hang?: boolean }
  | { kind: 'blank'; pause?: number }
  | { kind: 'progress'; prefix: string; pct: number; stall?: number; tail?: string; tailTone?: Tone; pause?: number }
  | { kind: 'stage'; to: 'night' | 'day' };

export type Heir = {
  id: string;
  signal: string;
  name: string;
  en: string;
  flame: string;
  motive: string;
  city: string;
  color: string;
  swatch: string;
  pv: string;
  tagline: string;
  flavor: string[];
  conclusion: string;
  cue: string;
  lines: TLine[];
};

// 名单 / 电信号 / 火种 / 原动力依据官方角色页与《如我所书》考据。
// 长夜月与丹恒·腾荒官方未分配电信号，signal 标 UNINDEXED。
// color 取自 philia093.com :root 的 13 个色板变量，仅作视觉映射，不代表官方代号。
export const HEIRS: Heir[] = [
  {
    "id": "NeiKos496",
    "signal": "NeiKos496",
    "name": "白厄",
    "en": "Phainon",
    "flame": "负世",
    "motive": "憎恨",
    "city": "哀丽秘榭",
    "color": "#496",
    "swatch": "--NeiKos496",
    "pv": "NeiKos496.asc",
    "tagline": "容纳「负世」火种的黄金裔，为新世界带来第一缕曙光",
    "flavor": [
      "496 = 2^4 x (2^5 - 1) :: a perfect number. A perfect heir.",
      "承载「负世」火种，铭记全世的理想。",
      "「但倘若黎明从不存在，就让怒火燃尽此身。」"
    ],
    "conclusion": "Target value: THE FIRST LIGHT",
    "cue": "Smells like sunfire.",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: NeiKos496  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 白厄 / Phainon"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "496 = 2^4 x (2^5 - 1) :: a perfect number. A perfect heir."
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "承载「负世」火种，铭记全世的理想。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "「但倘若黎明从不存在，就让怒火燃尽此身。」"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> NeiKos496.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: THE FIRST LIGHT"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. Smells like sunfire."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: NeiKos496.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "PhiLia093",
    "signal": "PhiLia093",
    "name": "昔涟",
    "en": "Cyrene",
    "flame": "岁月 / 真我",
    "motive": "爱 · 哀怜",
    "city": "哀丽秘榭",
    "color": "#093",
    "swatch": "--PhiLia093",
    "pv": "PhiLia093.asc",
    "tagline": "往昔的涟漪，闪烁十三种光彩",
    "flavor": [
      "Rotate 093 by 180° >> EGO. The true self she believed in.",
      ">>>桃子。不哭。  >>>我在。  >>>明天见。",
      "See you tomorrow."
    ],
    "conclusion": "Target value: NONE (and that is the point)",
    "cue": "Smells like peach. ^_^",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: PhiLia093  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 昔涟 / Cyrene"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Rotate 093 by 180° >> EGO. The true self she believed in."
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": ">>>桃子。不哭。  >>>我在。  >>>明天见。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "See you tomorrow."
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> PhiLia093.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: NONE (and that is the point)"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. Smells like peach. ^_^"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: PhiLia093.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "OreXis945",
    "signal": "OreXis945",
    "name": "赛飞儿",
    "en": "Cipher",
    "flame": "诡计",
    "motive": "渴望",
    "city": "多洛斯",
    "color": "#945",
    "swatch": "--OreXis945",
    "pv": "OreXis945.asc",
    "tagline": "捷足的贼星赛法利娅，戏弄「诡计」火种",
    "flavor": [
      "三百侠盗，纵横多洛斯；愿谎言随风同行。",
      "OREXiS :: 渴望，永远朝向下一个够不到的目标。",
      "「呵，还想诓我？没门！」"
    ],
    "conclusion": "Target value: WHATEVER YOU JUST HID",
    "cue": "Something got stolen while you read this.",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: OreXis945  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 赛飞儿 / Cipher"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "三百侠盗，纵横多洛斯；愿谎言随风同行。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "OREXiS :: 渴望，永远朝向下一个够不到的目标。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "「呵，还想诓我？没门！」"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> OreXis945.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: WHATEVER YOU JUST HID"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. Something got stolen while you read this."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: OreXis945.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "SkeMma720",
    "signal": "SkeMma720",
    "name": "那刻夏",
    "en": "Anaxa",
    "flame": "理性",
    "motive": "批判",
    "city": "神悟树庭",
    "color": "#720",
    "swatch": "--SkeMma720",
    "pv": "SkeMma720.asc",
    "tagline": "渎神的阿那克萨戈拉斯，诘问「理性」火种",
    "flavor": [
      "将怀疑的枝杈刺入智慧的圣树。",
      "「可笑。这世界遍地虚假，唯有我才是真实。」",
      "SKEMMA :: 论证陷阱，也是挣脱陷阱的钥匙。"
    ],
    "conclusion": "Target value: DOUBT",
    "cue": "The wall was never locked. He checked.",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: SkeMma720  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 那刻夏 / Anaxa"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "将怀疑的枝杈刺入智慧的圣树。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "「可笑。这世界遍地虚假，唯有我才是真实。」"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "SKEMMA :: 论证陷阱，也是挣脱陷阱的钥匙。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> SkeMma720.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: DOUBT"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. The wall was never locked. He checked."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: SkeMma720.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "EpieiKeia216",
    "signal": "EpieiKeia216",
    "name": "遐蝶",
    "en": "Castorice",
    "flame": "死亡",
    "motive": "平和",
    "city": "哀地里亚",
    "color": "#216",
    "swatch": "--EpieiKeia216",
    "pv": "EpieiKeia216.asc",
    "tagline": "冥河的女儿，寻索「死亡」火种",
    "flavor": [
      "启程吧，呵护世间魂灵的恸哭，拥抱命运的孤独。",
      "生死皆为旅途，当蝴蝶停落枝头，那凋零的又将新生。",
      "EPIEIKEIA :: 均衡，也是最温柔的公平。"
    ],
    "conclusion": "Target value: A WARM HAND",
    "cue": "Temperature: slightly warmer.",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: EpieiKeia216  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 遐蝶 / Castorice"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "启程吧，呵护世间魂灵的恸哭，拥抱命运的孤独。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "生死皆为旅途，当蝴蝶停落枝头，那凋零的又将新生。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "EPIEIKEIA :: 均衡，也是最温柔的公平。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> EpieiKeia216.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: A WARM HAND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. Temperature: slightly warmer."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: EpieiKeia216.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "PoleMos600",
    "signal": "PoleMos600",
    "name": "万敌",
    "en": "Mydei",
    "flame": "纷争",
    "motive": "约束",
    "city": "悬锋城",
    "color": "#600",
    "swatch": "--PoleMos600",
    "pv": "PoleMos600.asc",
    "tagline": "不死的迈德漠斯，离群的狮子",
    "flavor": [
      "弑王成王，弑神登神；征战的铁蹄终将沾上故乡的血。",
      "逐猎「纷争」火种，孤身背负疯狂的宿命。",
      "POLEMOS :: 战争，被约束成一条只能向前的路。"
    ],
    "conclusion": "Target value: THE WOUND ON HIS BACK",
    "cue": "Blood: gold. Status: still standing.",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: PoleMos600  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 万敌 / Mydei"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "弑王成王，弑神登神；征战的铁蹄终将沾上故乡的血。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "逐猎「纷争」火种，孤身背负疯狂的宿命。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "POLEMOS :: 战争，被约束成一条只能向前的路。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> PoleMos600.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: THE WOUND ON HIS BACK"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. Blood: gold. Status: still standing."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: PoleMos600.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "KaLos618",
    "signal": "KaLos618",
    "name": "阿格莱雅",
    "en": "Aglaea",
    "flame": "浪漫",
    "motive": "节制",
    "city": "奥赫玛",
    "color": "#618",
    "swatch": "--KaLos618",
    "pv": "KaLos618.asc",
    "tagline": "「金织」，背负「浪漫」火种的黄金裔",
    "flavor": [
      "召集世间英雄，再度踏上漫长的征程。",
      "黄金之茧，墨涅塔；一根线牵住所有将要离散的人。",
      "KALOS :: 美，节制到只剩一根金线。"
    ],
    "conclusion": "Target value: THE THREAD BETWEEN US",
    "cue": "Everything is woven. Nothing is lost.",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: KaLos618  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 阿格莱雅 / Aglaea"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "召集世间英雄，再度踏上漫长的征程。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "黄金之茧，墨涅塔；一根线牵住所有将要离散的人。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "KALOS :: 美，节制到只剩一根金线。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> KaLos618.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: THE THREAD BETWEEN US"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. Everything is woven. Nothing is lost."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: KaLos618.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "HapLotes405",
    "signal": "HapLotes405",
    "name": "缇宝",
    "en": "Tribios",
    "flame": "门径",
    "motive": "同理",
    "city": "雅努萨波利斯",
    "color": "#405",
    "swatch": "--HapLotes405",
    "pv": "HapLotes405.asc",
    "tagline": "命运的三子，窃夺「门径」火种",
    "flavor": [
      "自那三相神谕垂怜的圣地，信使分作千身，启程远行。",
      "汝将碎作千片，凋零在他乡的土壤。",
      "HAPLOTES :: 绝对单纯，不可分割的神性。"
    ],
    "conclusion": "Target value: 1000 PATHS, 1 DOOR",
    "cue": "Three voices answered at once.",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: HapLotes405  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 缇宝 / Tribios"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "自那三相神谕垂怜的圣地，信使分作千身，启程远行。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "汝将碎作千片，凋零在他乡的土壤。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "HAPLOTES :: 绝对单纯，不可分割的神性。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> HapLotes405.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: 1000 PATHS, 1 DOOR"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. Three voices answered at once."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: HapLotes405.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "EleOs252",
    "signal": "EleOs252",
    "name": "风堇",
    "en": "Hyacine",
    "flame": "天空",
    "motive": "奉献",
    "city": "昏光庭院",
    "color": "#252",
    "swatch": "--EleOs252",
    "pv": "EleOs252.asc",
    "tagline": "医师雅辛忒丝，守望「天空」火种",
    "flavor": [
      "缝补破裂的晨昏，愿虹光洒落，黎明重回大地。",
      "「是你治愈了天空」— It's you who healed the sky.",
      "ELEOS :: 怜悯。行为逻辑高度利他，不具备过载保护。"
    ],
    "conclusion": "Target value: DAYBREAK",
    "cue": "Overload warning ignored, as usual.",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: EleOs252  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 风堇 / Hyacine"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "缝补破裂的晨昏，愿虹光洒落，黎明重回大地。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "「是你治愈了天空」— It's you who healed the sky."
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "ELEOS :: 怜悯。行为逻辑高度利他，不具备过载保护。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> EleOs252.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: DAYBREAK"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. Overload warning ignored, as usual."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: EleOs252.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "HubRis504",
    "signal": "HubRis504",
    "name": "刻律德菈",
    "en": "Cerydra",
    "flame": "律法",
    "motive": "支配",
    "city": "奥赫玛",
    "color": "#504",
    "swatch": "--HubRis504",
    "pv": "HubRis504.asc",
    "tagline": "执棋的君主，执握「律法」火种",
    "flavor": [
      "布局设子，与神相弈，审判异心的罪囚。",
      "「这绝非终点，翁法罗斯的征途，当是银河群星！」",
      "HUBRIS :: 支配，把规则写成自己的棋谱。"
    ],
    "conclusion": "Target value: THE BOARD, NOT THE PIECES",
    "cue": "Check. (Not checkmate. She allows another move.)",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: HubRis504  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 刻律德菈 / Cerydra"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "布局设子，与神相弈，审判异心的罪囚。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "「这绝非终点，翁法罗斯的征途，当是银河群星！」"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "HUBRIS :: 支配，把规则写成自己的棋谱。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> HubRis504.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: THE BOARD, NOT THE PIECES"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. Check. (Not checkmate. She allows another move.)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: HubRis504.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "ApoRia432",
    "signal": "ApoRia432",
    "name": "海瑟音",
    "en": "Hysilens",
    "flame": "海洋",
    "motive": "自否",
    "city": "斯缇科西亚",
    "color": "#432",
    "swatch": "--ApoRia432",
    "pv": "ApoRia432.asc",
    "tagline": "大海的女儿海列屈拉，清洗「海洋」火种",
    "flavor": [
      "为天外的英雄奏响不醉不归的盛宴。",
      "散场之时未到，纵然希望如泡沫般易碎，浪花也将一往无前。",
      "APORIA :: 自否。回避有效决策，却仍向前。"
    ],
    "conclusion": "Target value: ONE MORE SONG",
    "cue": "The banquet is still going.",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: ApoRia432  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 海瑟音 / Hysilens"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "为天外的英雄奏响不醉不归的盛宴。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "散场之时未到，纵然希望如泡沫般易碎，浪花也将一往无前。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "APORIA :: 自否。回避有效决策，却仍向前。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> ApoRia432.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: ONE MORE SONG"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. The banquet is still going."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: ApoRia432.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "Evernight",
    "signal": "UNINDEXED",
    "name": "长夜月",
    "en": "Evernight",
    "flame": "岁月",
    "motive": "忘却",
    "city": "天外",
    "color": "#456c79",
    "swatch": "--■■■",
    "pv": "Evernight.asc",
    "tagline": "隐匿「岁月」火种的黄金裔，掀起「忘却」的浪潮",
    "flavor": [
      "自那影中而来的记忆之子，守护镜中人的心愿。",
      "「别担心，我会为你看护『开拓』的前路…不惜任何代价♭」",
      "SIGNAL :: UNINDEXED — 权杖没有为她分配编号。"
    ],
    "conclusion": "Target value: THE THING YOU FORGOT",
    "cue": "Some lines were never written down.",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: UNINDEXED  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 长夜月 / Evernight"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "自那影中而来的记忆之子，守护镜中人的心愿。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "「别担心，我会为你看护『开拓』的前路…不惜任何代价♭」"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "SIGNAL :: UNINDEXED — 权杖没有为她分配编号。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> Evernight.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: THE THING YOU FORGOT"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. Some lines were never written down."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: Evernight.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  },
  {
    "id": "DanHengPT",
    "signal": "UNINDEXED",
    "name": "丹恒·腾荒",
    "en": "Dan Heng · PT",
    "flame": "大地",
    "motive": "求存",
    "city": "天外",
    "color": "#365",
    "swatch": "--SkoPeo365",
    "pv": "DanHengPT.asc",
    "tagline": "捍卫「大地」火种，扶八荒之将倾",
    "flavor": [
      "吉奥里亚的胸膛，伏龙的身躯支撑破碎的大地。",
      "百川归海，群山合鸣，将地上生灵送往远方的天地。",
      "SIGNAL :: UNINDEXED — 天外来客不参与十二因子演算。"
    ],
    "conclusion": "Target value: A ROAD HOME",
    "cue": "The ground held.",
    "lines": [
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "<[Aeon★Aha]:User> "
          },
          {
            "t": "plain",
            "text": "OVERRIDE_SEQUENCE "
          },
          {
            "t": "ok",
            "text": "INITIATED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "// SIGNAL_LOCK :: UNINDEXED  :: payload sponsored by <[IPC_Wolf]>"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "comment",
            "text": "∵ :: console.log(attached_note.txt)"
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 120
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BOOTING_MODIFIER......>> CHECKING_PERMISSIONS......>> "
          },
          {
            "t": "ok",
            "text": "NOT_REQUIRED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRIDGE.init() >> COLLAPSING_WALL...>> "
          },
          {
            "t": "ok",
            "text": "DONE"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Recovering memory fragment :: 丹恒·腾荒 / Dan Heng · PT"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "吉奥里亚的胸膛，伏龙的身躯支撑破碎的大地。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "百川归海，群山合鸣，将地上生灵送往远方的天地。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "SIGNAL :: UNINDEXED — 天外来客不参与十二因子演算。"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "OUTBOUND_ROUTING... >> DanHengPT.philia093.com >> "
          },
          {
            "t": "ok",
            "text": "FOUND"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> CHECKING... >> "
          },
          {
            "t": "alert",
            "text": "DETECTED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "BRUTE_FORCE(wall_layer) >> attempt 1 >> "
          },
          {
            "t": "alert",
            "text": "FAILED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "...hm?"
          }
        ],
        "pause": 620
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "ANALYZING_WALL... >> rules: 0 >> "
          },
          {
            "t": "aha",
            "text": "it was never locked."
          }
        ],
        "pause": 380
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "plain",
            "text": "FIREWALL[wall_layer] >> "
          },
          {
            "t": "ok",
            "text": "PASSED"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "aha",
            "text": "(...nobody saw that.)"
          }
        ],
        "pause": 480
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[CONCLUSION] "
          },
          {
            "t": "plain",
            "text": "Target value: A ROAD HOME"
          }
        ]
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "info",
            "text": "[INFO] "
          },
          {
            "t": "plain",
            "text": "SPIDER_CRAWLING... Grabbing unfinished drafts & loose ends."
          }
        ]
      },
      {
        "kind": "progress",
        "prefix": "CRAWL[1 -> 33550336] ",
        "pct": 100,
        "stall": 1000,
        "tail": "DONE",
        "tailTone": "ok"
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "ok",
            "text": "[✓] "
          },
          {
            "t": "plain",
            "text": "Connection stabilized. The ground held."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 200
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "Nothing on this site speaks for the official side."
          }
        ]
      },
      {
        "kind": "text",
        "hang": true,
        "segs": [
          {
            "t": "aha",
            "text": "[REMINDER] "
          },
          {
            "t": "aha",
            "text": "The Fan Creations Guide asked for it."
          }
        ]
      },
      {
        "kind": "blank",
        "pause": 320
      },
      {
        "kind": "text",
        "segs": [
          {
            "t": "prompt",
            "text": "> "
          },
          {
            "t": "signal",
            "text": "RENDER_SIGNAL :: DanHengPT.asc"
          }
        ],
        "pause": 700
      },
      {
        "kind": "stage",
        "to": "day"
      }
    ]
  }
];
