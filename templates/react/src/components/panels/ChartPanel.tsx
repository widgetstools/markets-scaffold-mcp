import { CANDLES } from '@/data/sampleData';

export function ChartPanel() {
  const W = 600, H = 260, pad = 20;
  const min = Math.min(...CANDLES.map(c => c.l));
  const max = Math.max(...CANDLES.map(c => c.h));
  const xStep = (W - pad * 2) / CANDLES.length;
  const y = (v: number) => H - pad - ((v - min) / (max - min)) * (H - pad * 2);

  return (
    <div style={{ height: '100%', width: '100%', background: 'var(--bn-bg1)', padding: 12, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontFamily: 'var(--fi-mono)', fontSize: 11, color: 'var(--bn-t1)', marginBottom: 8, letterSpacing: '0.05em' }}>
        T 4.5 05/35 · INTRADAY
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <rect x={0} y={0} width={W} height={H} fill="var(--bn-bg1)" />
          {CANDLES.map((c, i) => {
            const x = pad + i * xStep + xStep / 2;
            const up = c.c >= c.o;
            const color = up ? 'var(--bn-green)' : 'var(--bn-red)';
            return (
              <g key={i}>
                <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth={1} />
                <rect
                  x={x - xStep / 3}
                  y={y(Math.max(c.o, c.c))}
                  width={(xStep / 3) * 2}
                  height={Math.max(1, Math.abs(y(c.o) - y(c.c)))}
                  fill={color}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
