import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ASK_LEVELS, BID_LEVELS, type OrderBookLevel } from '../sample-data';

@Component({
  selector: 'app-order-book-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="height:100%;background:var(--bn-bg1);overflow:auto;display:flex;flex-direction:column">
      <div class="hdr">
        <span>PRICE</span>
        <span style="text-align:right">SIZE</span>
        <span style="text-align:right">ORD</span>
      </div>
      <div
        *ngFor="let l of asksReversed"
        class="ob-row-ask row"
        [style.--fill-pct]="pct(l.sz) + '%'"
      >
        <span class="px" style="color:var(--bn-red)">{{ l.px.toFixed(3) }}</span>
        <span class="val">{{ l.sz.toLocaleString() }}</span>
        <span class="ord">{{ l.orders }}</span>
      </div>
      <div class="spread">SPREAD {{ spread.toFixed(3) }}</div>
      <div *ngFor="let l of bids" class="ob-row-bid row" [style.--fill-pct]="pct(l.sz) + '%'">
        <span class="px" style="color:var(--bn-blue)">{{ l.px.toFixed(3) }}</span>
        <span class="val">{{ l.sz.toLocaleString() }}</span>
        <span class="ord">{{ l.orders }}</span>
      </div>
    </div>
  `,
  styles: [`
    .hdr {
      display: grid;
      grid-template-columns: 1fr 1fr 60px;
      padding: 6px 10px;
      font-family: var(--fi-mono);
      font-size: 9px;
      letter-spacing: 0.05em;
      color: var(--bn-t2);
      border-bottom: 1px solid var(--bn-border);
      text-transform: uppercase;
    }
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr 60px;
      padding: 3px 10px;
      font-family: var(--fi-mono);
      font-size: 11px;
      color: var(--bn-t0);
    }
    .row .px { font-weight: 600; position: relative; z-index: 1; }
    .row .val { text-align: right; position: relative; z-index: 1; }
    .row .ord { text-align: right; color: var(--bn-t2); position: relative; z-index: 1; }
    .spread {
      padding: 6px 10px;
      font-family: var(--fi-mono);
      font-size: 12px;
      color: var(--bn-cyan);
      border-top: 1px solid var(--bn-border);
      border-bottom: 1px solid var(--bn-border);
      background: var(--bn-bg2);
      font-weight: 700;
    }
  `],
})
export class OrderBookWidget {
  asksReversed: OrderBookLevel[] = [...ASK_LEVELS].reverse();
  bids: OrderBookLevel[] = BID_LEVELS;
  maxSize = Math.max(
    ...ASK_LEVELS.map((l) => l.sz),
    ...BID_LEVELS.map((l) => l.sz),
  );
  spread = ASK_LEVELS[ASK_LEVELS.length - 1].px - BID_LEVELS[0].px;

  pct(sz: number) {
    return (sz / this.maxSize) * 100;
  }
}
