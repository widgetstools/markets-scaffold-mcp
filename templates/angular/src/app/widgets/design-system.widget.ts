import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Swatch {
  label: string;
  cssVar: string;
}

@Component({
  selector: 'app-design-system-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ds-root">
      <!-- ── COLORS ── -->
      <section class="sec">
        <h3 class="sec-title">Colors · Surface</h3>
        <div class="row">
          <div
            *ngFor="let s of surface"
            class="swatch bordered"
            [style.background]="'var(' + s.cssVar + ')'"
          >
            <span class="sw-label">{{ s.cssVar }}</span>
          </div>
        </div>

        <h3 class="sec-title mt">Colors · Text</h3>
        <div class="row">
          <div
            *ngFor="let s of text"
            class="text-swatch"
            [style.color]="'var(' + s.cssVar + ')'"
          >
            <span class="bold">Aa Bb 123</span>
            <span class="mono-xs muted">{{ s.cssVar }}</span>
          </div>
        </div>

        <h3 class="sec-title mt">Colors · Accent</h3>
        <div class="row">
          <div
            *ngFor="let s of accent"
            class="swatch"
            [style.background]="'var(' + s.cssVar + ')'"
          >
            <span class="sw-label">{{ s.cssVar }}</span>
          </div>
        </div>

        <h3 class="sec-title mt">Colors · Actions</h3>
        <div class="row">
          <div
            *ngFor="let s of action"
            class="swatch"
            [style.background]="'var(' + s.cssVar + ')'"
          >
            <span class="sw-label">{{ s.cssVar }}</span>
          </div>
        </div>
      </section>

      <!-- ── TYPOGRAPHY ── -->
      <section class="sec">
        <h3 class="sec-title">Typography</h3>
        <div class="type-col">
          <div *ngFor="let f of fontSizes" class="type-row">
            <span class="type-var">{{ f.cssVar }}</span>
            <span
              class="mono"
              [style.fontSize]="'var(' + f.cssVar + ')'"
            >
              Mono — The quick brown fox · {{ f.label }}
            </span>
          </div>
          <div *ngFor="let f of fontSizes" class="type-row">
            <span class="type-var">{{ f.cssVar }}</span>
            <span
              class="sans"
              [style.fontSize]="'var(' + f.cssVar + ')'"
            >
              Sans — The quick brown fox · {{ f.label }}
            </span>
          </div>
        </div>
      </section>

      <!-- ── SPACING & RADIUS ── -->
      <section class="sec">
        <h3 class="sec-title">Spacing</h3>
        <div class="spacing-row">
          <div *ngFor="let s of spacing" class="spacing-cell">
            <div
              class="spacing-box"
              [style.width.px]="s"
              [style.height.px]="s"
            ></div>
            <span class="mono-xs muted">{{ s }}px</span>
          </div>
        </div>

        <h3 class="sec-title mt">Radius</h3>
        <div class="radius-row">
          <div *ngFor="let r of radii" class="radius-cell">
            <div class="radius-box" [style.borderRadius.px]="r"></div>
            <span class="mono-xs muted">{{ r }}px</span>
          </div>
        </div>
      </section>

      <!-- ── COMPONENTS ── -->
      <section class="sec">
        <h3 class="sec-title">Components · Buttons</h3>
        <div class="btn-row">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-buy">Buy</button>
          <button class="btn btn-sell">Sell</button>
        </div>

        <h3 class="sec-title mt">Components · Badges</h3>
        <div class="btn-row">
          <span class="badge badge-green">Long</span>
          <span class="badge badge-red">Short</span>
          <span class="badge badge-yellow">Pending</span>
          <span class="badge badge-cyan">AAA</span>
        </div>

        <h3 class="sec-title mt">Components · KPI Card</h3>
        <div class="kpi">
          <span class="kpi-label">Portfolio P&amp;L</span>
          <span class="kpi-value">+$124,503.82</span>
          <span class="kpi-delta">+2.14% today</span>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    .ds-root {
      height: 100%;
      width: 100%;
      overflow: auto;
      background: var(--bn-bg1);
      color: var(--bn-t0);
      font-family: var(--fi-sans);
    }
    .sec {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 16px 18px;
      border-bottom: 1px solid var(--bn-border);
    }
    .sec-title {
      font-family: var(--fi-mono);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: var(--bn-t2);
      text-transform: uppercase;
      margin: 0;
    }
    .sec-title.mt { margin-top: 8px; }
    .row { display: flex; flex-wrap: wrap; gap: 10px; }
    .swatch {
      width: 96px;
      height: 62px;
      border-radius: 4px;
      display: flex;
      align-items: flex-end;
      padding: 6px;
    }
    .swatch.bordered { border: 1px solid var(--bn-border); }
    .sw-label {
      font-family: var(--fi-mono);
      font-size: 9px;
      color: var(--bn-t0);
      mix-blend-mode: difference;
    }
    .text-swatch {
      width: 96px;
      padding: 8px 10px;
      border-radius: 4px;
      background: var(--bn-bg2);
      border: 1px solid var(--bn-border);
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-family: var(--fi-mono);
      font-size: 11px;
    }
    .bold { font-weight: 700; }
    .mono-xs { font-family: var(--fi-mono); font-size: 9px; }
    .muted { color: var(--bn-t2); }
    .type-col { display: flex; flex-direction: column; gap: 6px; }
    .type-row { display: flex; align-items: baseline; gap: 14px; color: var(--bn-t0); }
    .type-var {
      font-family: var(--fi-mono);
      font-size: 9px;
      color: var(--bn-t2);
      width: 80px;
    }
    .mono { font-family: var(--fi-mono); }
    .sans { font-family: var(--fi-sans); color: var(--bn-t1); }
    .spacing-row { display: flex; align-items: flex-end; gap: 10px; }
    .spacing-cell { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .spacing-box { background: var(--bn-yellow); border-radius: 2px; }
    .radius-row { display: flex; gap: 12px; }
    .radius-cell { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .radius-box {
      width: 44px;
      height: 44px;
      background: var(--bn-bg3);
      border: 1px solid var(--bn-border2);
    }
    .btn-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .btn {
      padding: 6px 14px;
      border-radius: 4px;
      border: none;
      font-family: var(--fi-mono);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      cursor: pointer;
      text-transform: uppercase;
    }
    .btn-primary { background: var(--bn-yellow); color: #111; }
    .btn-secondary {
      background: var(--bn-bg2);
      color: var(--bn-t0);
      border: 1px solid var(--bn-border);
    }
    .btn-buy { background: var(--bn-buy-bg); color: var(--bn-cta-text); }
    .btn-sell { background: var(--bn-sell-bg); color: var(--bn-cta-text); }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      font-family: var(--fi-mono);
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: var(--bn-bg2);
    }
    .badge-green  { color: var(--bn-green);  border: 1px solid var(--bn-green); }
    .badge-red    { color: var(--bn-red);    border: 1px solid var(--bn-red); }
    .badge-yellow { color: var(--bn-yellow); border: 1px solid var(--bn-yellow); }
    .badge-cyan   { color: var(--bn-cyan);   border: 1px solid var(--bn-cyan); }
    .kpi {
      display: inline-flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px 14px;
      background: var(--bn-bg2);
      border: 1px solid var(--bn-border);
      border-radius: 4px;
      min-width: 160px;
    }
    .kpi-label {
      font-family: var(--fi-mono);
      font-size: 9px;
      color: var(--bn-t2);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .kpi-value {
      font-family: var(--fi-mono);
      font-size: 18px;
      font-weight: 700;
      color: var(--bn-green);
    }
    .kpi-delta {
      font-family: var(--fi-mono);
      font-size: 10px;
      color: var(--bn-t1);
    }
  `],
})
export class DesignSystemWidget {
  surface: Swatch[] = [
    { label: 'bg',  cssVar: '--bn-bg' },
    { label: 'bg1', cssVar: '--bn-bg1' },
    { label: 'bg2', cssVar: '--bn-bg2' },
    { label: 'bg3', cssVar: '--bn-bg3' },
  ];
  text: Swatch[] = [
    { label: 't0', cssVar: '--bn-t0' },
    { label: 't1', cssVar: '--bn-t1' },
    { label: 't2', cssVar: '--bn-t2' },
    { label: 't3', cssVar: '--bn-t3' },
  ];
  accent: Swatch[] = [
    { label: 'green',  cssVar: '--bn-green' },
    { label: 'red',    cssVar: '--bn-red' },
    { label: 'yellow', cssVar: '--bn-yellow' },
    { label: 'blue',   cssVar: '--bn-blue' },
    { label: 'cyan',   cssVar: '--bn-cyan' },
    { label: 'purple', cssVar: '--fi-purple' },
  ];
  action: Swatch[] = [
    { label: 'buy',  cssVar: '--bn-buy-bg' },
    { label: 'sell', cssVar: '--bn-sell-bg' },
  ];
  fontSizes = [
    { label: 'xs', cssVar: '--fi-font-xs' },
    { label: 'sm', cssVar: '--fi-font-sm' },
    { label: 'md', cssVar: '--fi-font-md' },
    { label: 'lg', cssVar: '--fi-font-lg' },
  ];
  spacing = [4, 8, 12, 16, 24, 32];
  radii = [2, 4, 6, 8, 12];
}
