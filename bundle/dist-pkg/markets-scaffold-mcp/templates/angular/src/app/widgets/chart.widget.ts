import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CANDLES, type Candle } from '../sample-data';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="height:100%;width:100%;background:var(--bn-bg1);padding:12px;box-sizing:border-box;display:flex;flex-direction:column">
      <div style="font-family:var(--fi-mono);font-size:11px;color:var(--bn-t1);margin-bottom:8px;letter-spacing:0.05em">
        T 4.5 05/35 · INTRADAY
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        <svg [attr.viewBox]="'0 0 ' + W + ' ' + H" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <rect [attr.width]="W" [attr.height]="H" fill="var(--bn-bg1)" />
          <g *ngFor="let c of candles; let i = index">
            <line
              [attr.x1]="xAt(i)" [attr.x2]="xAt(i)"
              [attr.y1]="y(c.h)" [attr.y2]="y(c.l)"
              [attr.stroke]="colorFor(c)" stroke-width="1"
            />
            <rect
              [attr.x]="xAt(i) - xStep/3"
              [attr.y]="y(topOf(c))"
              [attr.width]="(xStep/3)*2"
              [attr.height]="bodyHeight(c)"
              [attr.fill]="colorFor(c)"
            />
          </g>
        </svg>
      </div>
    </div>
  `,
})
export class ChartWidget {
  candles = CANDLES;
  W = 600;
  H = 260;
  pad = 20;
  min = Math.min(...CANDLES.map((c) => c.l));
  max = Math.max(...CANDLES.map((c) => c.h));
  xStep = (this.W - this.pad * 2) / CANDLES.length;

  y(v: number) {
    return this.H - this.pad - ((v - this.min) / (this.max - this.min)) * (this.H - this.pad * 2);
  }
  xAt(i: number) {
    return this.pad + i * this.xStep + this.xStep / 2;
  }
  colorFor(c: Candle) {
    return c.c >= c.o ? 'var(--bn-green)' : 'var(--bn-red)';
  }
  topOf(c: Candle) {
    return Math.max(c.o, c.c);
  }
  bodyHeight(c: Candle) {
    return Math.max(1, Math.abs(this.y(c.o) - this.y(c.c)));
  }
}
