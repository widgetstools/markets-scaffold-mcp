export interface Bond {
  id: string;
  ticker: string;
  issuer: string;
  cpn: number;
  mat: string;
  rtg: string;
  bid: number;
  ask: number;
  ytm: number;
  dur: number;
}

export const BONDS: Bond[] = [
  { id: '1', ticker: 'T 4.5 05/35',   issuer: 'US Treasury',        cpn: 4.500, mat: '05/35', rtg: 'AAA', bid: 99.812, ask: 99.843, ytm: 4.521, dur: 8.9 },
  { id: '2', ticker: 'AAPL 3.85 08/29',issuer: 'Apple Inc.',         cpn: 3.850, mat: '08/29', rtg: 'AA+', bid: 98.125, ask: 98.250, ytm: 4.312, dur: 4.6 },
  { id: '3', ticker: 'MSFT 2.4 08/26', issuer: 'Microsoft Corp.',    cpn: 2.400, mat: '08/26', rtg: 'AAA', bid: 96.750, ask: 96.875, ytm: 4.121, dur: 2.3 },
  { id: '4', ticker: 'JPM 4.125 12/32',issuer: 'JPMorgan Chase',     cpn: 4.125, mat: '12/32', rtg: 'A-',  bid: 97.380, ask: 97.500, ytm: 4.512, dur: 6.8 },
  { id: '5', ticker: 'GS 3.5 04/30',   issuer: 'Goldman Sachs',      cpn: 3.500, mat: '04/30', rtg: 'BBB+',bid: 95.240, ask: 95.380, ytm: 4.631, dur: 5.1 },
  { id: '6', ticker: 'BAC 4.0 09/34',  issuer: 'Bank of America',    cpn: 4.000, mat: '09/34', rtg: 'A-',  bid: 96.125, ask: 96.250, ytm: 4.480, dur: 7.9 },
  { id: '7', ticker: 'XOM 3.25 03/27', issuer: 'ExxonMobil',         cpn: 3.250, mat: '03/27', rtg: 'AA-', bid: 97.560, ask: 97.680, ytm: 4.210, dur: 2.9 },
  { id: '8', ticker: 'KO 2.875 10/27', issuer: 'Coca-Cola',          cpn: 2.875, mat: '10/27', rtg: 'A+',  bid: 96.110, ask: 96.230, ytm: 4.015, dur: 3.4 },
  { id: '9', ticker: 'VZ 4.65 11/28',  issuer: 'Verizon',            cpn: 4.650, mat: '11/28', rtg: 'BBB+',bid: 99.420, ask: 99.550, ytm: 4.781, dur: 4.1 },
  { id: '10',ticker: 'PFE 3.1 06/31',  issuer: 'Pfizer',             cpn: 3.100, mat: '06/31', rtg: 'A',   bid: 94.860, ask: 94.980, ytm: 4.410, dur: 5.8 },
];

// ── Order book (static snapshot) ──
export interface OrderBookLevel { px: number; sz: number; orders: number; }
export const ASK_LEVELS: OrderBookLevel[] = [
  { px: 99.875, sz: 12000, orders: 4 },
  { px: 99.860, sz: 8500,  orders: 3 },
  { px: 99.855, sz: 15000, orders: 6 },
  { px: 99.848, sz: 6000,  orders: 2 },
  { px: 99.844, sz: 9500,  orders: 3 },
];
export const BID_LEVELS: OrderBookLevel[] = [
  { px: 99.812, sz: 10000, orders: 4 },
  { px: 99.808, sz: 7500,  orders: 3 },
  { px: 99.800, sz: 14000, orders: 5 },
  { px: 99.792, sz: 5500,  orders: 2 },
  { px: 99.785, sz: 11000, orders: 4 },
];

// ── Candlestick OHLC ──
export interface Candle { t: number; o: number; h: number; l: number; c: number; }
function genCandles(): Candle[] {
  const out: Candle[] = [];
  let last = 99.5;
  for (let i = 0; i < 60; i++) {
    const o = last;
    const c = +(o + (Math.sin(i * 0.4) + (i % 7 - 3) * 0.05) * 0.08).toFixed(3);
    const h = +(Math.max(o, c) + 0.04).toFixed(3);
    const l = +(Math.min(o, c) - 0.04).toFixed(3);
    out.push({ t: i, o, h, l, c });
    last = c;
  }
  return out;
}
export const CANDLES = genCandles();
