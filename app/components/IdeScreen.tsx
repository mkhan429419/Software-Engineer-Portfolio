"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const INITIAL = `const maheen = {
  role: "Software Engineer",
  at: "PAM",
  location: "Abu Dhabi, UAE",
  experience: "2 years",
  users: "10,000+",
  openTo: "new roles",
};`;

const MAX_LENGTH = 800;
const EDITOR_PX = 16;

const files = [
  { name: "about.ts", color: "#7aa2f7", active: true },
  { name: "work.ts", color: "#7aa2f7" },
  { name: "stack.json", color: "#e5c07b" },
  { name: "README.md", color: "#8b95a7" },
];

const TOKEN =
  /(\/\/.*$)|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?|`[^`]*`?)|\b(const|let|var|function|return|if|else|import|from|export|default|new|true|false|null|undefined|async|await|type|interface|class)\b|(\b\d[\d,._]*\b)|([A-Za-z_$][\w$]*)(?=\s*:)|([{}()[\];,.=:+\-*/<>!&|?]+)/gm;

const COLORS = {
  comment: "#6b7685",
  string: "#9ece6a",
  keyword: "#FFBF88",
  number: "#e5c07b",
  prop: "#7aa2f7",
  punct: "#8b95a7",
};

function highlight(text: string) {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  TOKEN.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN.exec(text))) {
    const i = m.index;
    if (i > last) out.push(text.slice(last, i));
    const color = m[1]
      ? COLORS.comment
      : m[2]
        ? COLORS.string
        : m[3]
          ? COLORS.keyword
          : m[4]
            ? COLORS.number
            : m[5]
              ? COLORS.prop
              : COLORS.punct;
    out.push(
      <span key={key++} style={{ color }}>
        {m[0]}
      </span>
    );
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

type Metrics = { scale: number; width: number; height: number; padEm: number };

export default function IdeScreen({
  typing,
  onFocusChange,
}: {
  typing: boolean;
  onFocusChange?: (focused: boolean) => void;
}) {
  const [text, setText] = useState("");
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const [caret, setCaret] = useState({ line: 1, col: 1 });
  const [scroll, setScroll] = useState({ top: 0, left: 0 });
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  const areaRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const measure = () => {
      const root = area.closest("[data-laptop]") as HTMLElement | null;
      if (!root) return;
      const compact = sideRef.current ? getComputedStyle(sideRef.current).display === "none" : true;
      const fontCqw = compact ? 2.7 : 2.4;
      const padCqw = compact ? 1 : 1.4;
      const fontPx = (fontCqw * root.clientWidth) / 100;
      const scale = fontPx / EDITOR_PX;
      setMetrics({
        scale,
        width: area.clientWidth / scale,
        height: area.clientHeight / scale,
        padEm: padCqw / fontCqw,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(area);
    const root = area.closest("[data-laptop]");
    if (root) ro.observe(root);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!typing || touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(INITIAL);
      return;
    }
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (n < INITIAL.length) {
        n += 1;
        setText(INITIAL.slice(0, n));
        timer = setTimeout(tick, 32);
      }
    };
    timer = setTimeout(tick, 350);
    return () => clearTimeout(timer);
  }, [typing, touched]);

  const updateCaret = useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    const before = ta.value.slice(0, ta.selectionStart);
    const lines = before.split("\n");
    setCaret({ line: lines.length, col: lines[lines.length - 1].length + 1 });
  }, []);

  const handleFocus = () => {
    if (!touched) {
      setTouched(true);
      setText(INITIAL);
    }
    setFocused(true);
    onFocusChange?.(true);
    requestAnimationFrame(updateCaret);
  };

  const handleBlur = () => {
    setFocused(false);
    onFocusChange?.(false);
  };

  const lineCount = text.split("\n").length;
  const shown = text.endsWith("\n") ? text + " " : text;

  return (
    <div className="ide">
      <div className="ide-title">
        <span className="ide-dots">
          <i style={{ background: "#ff6b6b" }} />
          <i style={{ background: "#FFBF88" }} />
          <i style={{ background: "#9ece6a" }} />
        </span>
        <span className="ide-title-text">about.ts - portfolio</span>
      </div>

      <div className="ide-main">
        <div className="ide-side" ref={sideRef} aria-hidden>
          <div className="ide-side-head">EXPLORER</div>
          <div className="ide-folder">&#9662; portfolio</div>
          {files.map((f) => (
            <div key={f.name} className={`ide-file${f.active ? " is-active" : ""}`}>
              <i style={{ background: f.color }} />
              {f.name}
            </div>
          ))}
        </div>

        <div className="ide-editor">
          <div className="ide-tab" aria-hidden>
            <span>
              <i style={{ background: "#7aa2f7" }} />
              about.ts
            </span>
          </div>

          <div className="ide-area" ref={areaRef}>
            {metrics && (
              <div
                className="ide-surface"
                style={{
                  width: metrics.width,
                  height: metrics.height,
                  transform: `scale(${metrics.scale})`,
                  fontSize: EDITOR_PX,
                  paddingTop: `${metrics.padEm}em`,
                }}
              >
                <div className="ide-gutter" aria-hidden>
                  <div style={{ transform: `translateY(${-scroll.top}px)` }}>
                    {Array.from({ length: lineCount }, (_, i) => (
                      <div key={i} className="ide-num">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ide-field">
                  <pre
                    className="ide-pre"
                    aria-hidden
                    style={{ transform: `translate(${-scroll.left}px, ${-scroll.top}px)` }}
                  >
                    {highlight(shown)}
                  </pre>
                  <textarea
                    ref={taRef}
                    className="ide-ta"
                    value={text}
                    maxLength={MAX_LENGTH}
                    wrap="off"
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="off"
                    aria-label="Editable code editor. Type to change the code."
                    onChange={(e) => {
                      setText(e.target.value);
                      updateCaret();
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onSelect={updateCaret}
                    onKeyUp={updateCaret}
                    onClick={updateCaret}
                    onScroll={(e) =>
                      setScroll({ top: e.currentTarget.scrollTop, left: e.currentTarget.scrollLeft })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ide-status" aria-hidden>
        <span>{focused ? `Ln ${caret.line}, Col ${caret.col}` : "Click to edit"}</span>
        <span>TypeScript</span>
      </div>
    </div>
  );
}
