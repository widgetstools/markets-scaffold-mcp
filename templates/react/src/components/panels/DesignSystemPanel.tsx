import type { CSSProperties } from 'react';

const SURFACE_VARS = ['--bn-bg', '--bn-bg1', '--bn-bg2', '--bn-bg3'];
const TEXT_VARS = ['--bn-t0', '--bn-t1', '--bn-t2', '--bn-t3'];
const ACCENT_VARS = [
  '--bn-green',
  '--bn-red',
  '--bn-yellow',
  '--bn-blue',
  '--bn-cyan',
  '--fi-purple',
];
const ACTION_VARS = ['--bn-buy-bg', '--bn-sell-bg'];

const FONT_SIZES: Array<{ label: string; cssVar: string }> = [
  { label: 'xs', cssVar: '--fi-font-xs' },
  { label: 'sm', cssVar: '--fi-font-sm' },
  { label: 'md', cssVar: '--fi-font-md' },
  { label: 'lg', cssVar: '--fi-font-lg' },
];

const SPACING_STEPS = [4, 8, 12, 16, 24, 32];
const RADIUS_STEPS = [2, 4, 6, 8, 12];

const section: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  padding: '16px 18px',
  borderBottom: '1px solid var(--bn-border)',
};

const sectionTitle: CSSProperties = {
  fontFamily: 'var(--fi-mono)',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.12em',
  color: 'var(--bn-t2)',
  textTransform: 'uppercase',
  margin: 0,
};

const swatchRow: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
};

const swatchCell = (bg: string, border = false): CSSProperties => ({
  width: 96,
  height: 62,
  borderRadius: 4,
  background: `var(${bg})`,
  border: border ? '1px solid var(--bn-border)' : 'none',
  display: 'flex',
  alignItems: 'flex-end',
  padding: 6,
});

const swatchLabel: CSSProperties = {
  fontFamily: 'var(--fi-mono)',
  fontSize: 9,
  color: 'var(--bn-t0)',
  mixBlendMode: 'difference',
};

const textSwatch = (v: string): CSSProperties => ({
  width: 96,
  padding: '8px 10px',
  borderRadius: 4,
  background: 'var(--bn-bg2)',
  border: '1px solid var(--bn-border)',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  color: `var(${v})`,
  fontFamily: 'var(--fi-mono)',
  fontSize: 11,
});

const button = (variant: 'primary' | 'secondary' | 'buy' | 'sell'): CSSProperties => {
  const base: CSSProperties = {
    padding: '6px 14px',
    borderRadius: 4,
    border: 'none',
    fontFamily: 'var(--fi-mono)',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.04em',
    cursor: 'pointer',
    textTransform: 'uppercase',
  };
  if (variant === 'primary') {
    return { ...base, background: 'var(--bn-yellow)', color: '#111' };
  }
  if (variant === 'secondary') {
    return {
      ...base,
      background: 'var(--bn-bg2)',
      color: 'var(--bn-t0)',
      border: '1px solid var(--bn-border)',
    };
  }
  if (variant === 'buy') {
    return { ...base, background: 'var(--bn-buy-bg)', color: 'var(--bn-cta-text)' };
  }
  return { ...base, background: 'var(--bn-sell-bg)', color: 'var(--bn-cta-text)' };
};

const badge = (color: string): CSSProperties => ({
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: 10,
  fontFamily: 'var(--fi-mono)',
  fontSize: 9,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  background: 'var(--bn-bg2)',
  color: `var(${color})`,
  border: `1px solid var(${color})`,
});

export function DesignSystemPanel() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'auto',
        background: 'var(--bn-bg1)',
        color: 'var(--bn-t0)',
        fontFamily: 'var(--fi-sans)',
      }}
    >
      {/* ── COLORS ── */}
      <section style={section}>
        <h3 style={sectionTitle}>Colors · Surface</h3>
        <div style={swatchRow}>
          {SURFACE_VARS.map((v) => (
            <div key={v} style={swatchCell(v, true)}>
              <span style={swatchLabel}>{v}</span>
            </div>
          ))}
        </div>

        <h3 style={{ ...sectionTitle, marginTop: 8 }}>Colors · Text</h3>
        <div style={swatchRow}>
          {TEXT_VARS.map((v) => (
            <div key={v} style={textSwatch(v)}>
              <span style={{ fontWeight: 700 }}>Aa Bb 123</span>
              <span style={{ fontSize: 9, color: 'var(--bn-t2)' }}>{v}</span>
            </div>
          ))}
        </div>

        <h3 style={{ ...sectionTitle, marginTop: 8 }}>Colors · Accent</h3>
        <div style={swatchRow}>
          {ACCENT_VARS.map((v) => (
            <div key={v} style={swatchCell(v)}>
              <span style={swatchLabel}>{v}</span>
            </div>
          ))}
        </div>

        <h3 style={{ ...sectionTitle, marginTop: 8 }}>Colors · Actions</h3>
        <div style={swatchRow}>
          {ACTION_VARS.map((v) => (
            <div key={v} style={swatchCell(v)}>
              <span style={swatchLabel}>{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TYPOGRAPHY ── */}
      <section style={section}>
        <h3 style={sectionTitle}>Typography</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {FONT_SIZES.map(({ label, cssVar }) => (
            <div
              key={cssVar}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                color: 'var(--bn-t0)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--fi-mono)',
                  fontSize: 9,
                  color: 'var(--bn-t2)',
                  width: 80,
                }}
              >
                {cssVar}
              </span>
              <span style={{ fontFamily: 'var(--fi-mono)', fontSize: `var(${cssVar})` }}>
                Mono — The quick brown fox · {label}
              </span>
            </div>
          ))}
          {FONT_SIZES.map(({ label, cssVar }) => (
            <div
              key={`sans-${cssVar}`}
              style={{ display: 'flex', alignItems: 'baseline', gap: 14, color: 'var(--bn-t1)' }}
            >
              <span
                style={{
                  fontFamily: 'var(--fi-mono)',
                  fontSize: 9,
                  color: 'var(--bn-t2)',
                  width: 80,
                }}
              >
                {cssVar}
              </span>
              <span style={{ fontFamily: 'var(--fi-sans)', fontSize: `var(${cssVar})` }}>
                Sans — The quick brown fox · {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPACING & RADIUS ── */}
      <section style={section}>
        <h3 style={sectionTitle}>Spacing</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
          {SPACING_STEPS.map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div
                style={{
                  width: s,
                  height: s,
                  background: 'var(--bn-yellow)',
                  borderRadius: 2,
                }}
              />
              <span style={{ fontFamily: 'var(--fi-mono)', fontSize: 9, color: 'var(--bn-t2)' }}>
                {s}px
              </span>
            </div>
          ))}
        </div>

        <h3 style={{ ...sectionTitle, marginTop: 10 }}>Radius</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          {RADIUS_STEPS.map((r) => (
            <div key={r} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: 'var(--bn-bg3)',
                  border: '1px solid var(--bn-border2)',
                  borderRadius: r,
                }}
              />
              <span style={{ fontFamily: 'var(--fi-mono)', fontSize: 9, color: 'var(--bn-t2)' }}>
                {r}px
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPONENTS ── */}
      <section style={section}>
        <h3 style={sectionTitle}>Components · Buttons</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button style={button('primary')}>Primary</button>
          <button style={button('secondary')}>Secondary</button>
          <button style={button('buy')}>Buy</button>
          <button style={button('sell')}>Sell</button>
        </div>

        <h3 style={{ ...sectionTitle, marginTop: 10 }}>Components · Badges</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={badge('--bn-green')}>Long</span>
          <span style={badge('--bn-red')}>Short</span>
          <span style={badge('--bn-yellow')}>Pending</span>
          <span style={badge('--bn-cyan')}>AAA</span>
        </div>

        <h3 style={{ ...sectionTitle, marginTop: 10 }}>Components · KPI Card</h3>
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: 4,
            padding: '10px 14px',
            background: 'var(--bn-bg2)',
            border: '1px solid var(--bn-border)',
            borderRadius: 4,
            minWidth: 160,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--fi-mono)',
              fontSize: 9,
              color: 'var(--bn-t2)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Portfolio P&amp;L
          </span>
          <span
            style={{
              fontFamily: 'var(--fi-mono)',
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--bn-green)',
            }}
          >
            +$124,503.82
          </span>
          <span style={{ fontFamily: 'var(--fi-mono)', fontSize: 10, color: 'var(--bn-t1)' }}>
            +2.14% today
          </span>
        </div>
      </section>
    </div>
  );
}
