import { ASK_LEVELS, BID_LEVELS } from '@/data/sampleData';

const maxSize = Math.max(
  ...ASK_LEVELS.map(l => l.sz),
  ...BID_LEVELS.map(l => l.sz),
);

function Row({ side, px, sz, orders }: { side: 'ask' | 'bid'; px: number; sz: number; orders: number }) {
  const pct = (sz / maxSize) * 100;
  const color = side === 'ask' ? 'var(--bn-red)' : 'var(--bn-blue)';
  return (
    <div
      className={side === 'ask' ? 'ob-row-ask' : 'ob-row-bid'}
      style={
        {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 60px',
          padding: '3px 10px',
          fontFamily: 'var(--fi-mono)',
          fontSize: 11,
          color: 'var(--bn-t0)',
          '--fill-pct': `${pct}%`,
        } as React.CSSProperties
      }
    >
      <span style={{ color, fontWeight: 600, position: 'relative', zIndex: 1 }}>{px.toFixed(3)}</span>
      <span style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>{sz.toLocaleString()}</span>
      <span style={{ textAlign: 'right', color: 'var(--bn-t2)', position: 'relative', zIndex: 1 }}>{orders}</span>
    </div>
  );
}

export function OrderBookPanel() {
  return (
    <div style={{ height: '100%', background: 'var(--bn-bg1)', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 60px',
          padding: '6px 10px',
          fontFamily: 'var(--fi-mono)',
          fontSize: 9,
          letterSpacing: '0.05em',
          color: 'var(--bn-t2)',
          borderBottom: '1px solid var(--bn-border)',
          textTransform: 'uppercase',
        }}
      >
        <span>PRICE</span>
        <span style={{ textAlign: 'right' }}>SIZE</span>
        <span style={{ textAlign: 'right' }}>ORD</span>
      </div>
      {[...ASK_LEVELS].reverse().map(l => (
        <Row key={'a' + l.px} side="ask" {...l} />
      ))}
      <div
        style={{
          padding: '6px 10px',
          fontFamily: 'var(--fi-mono)',
          fontSize: 12,
          color: 'var(--bn-cyan)',
          borderTop: '1px solid var(--bn-border)',
          borderBottom: '1px solid var(--bn-border)',
          background: 'var(--bn-bg2)',
          fontWeight: 700,
        }}
      >
        SPREAD {(ASK_LEVELS[ASK_LEVELS.length - 1].px - BID_LEVELS[0].px).toFixed(3)}
      </div>
      {BID_LEVELS.map(l => (
        <Row key={'b' + l.px} side="bid" {...l} />
      ))}
    </div>
  );
}
