import { Component, signal, effect, PLATFORM_ID, inject, Type } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { DockManagerCoreComponent, type DockTheme } from '@widgetstools/angular-dock-manager';
import { type DockManagerState, slateDark, vsCodeLight } from '@widgetstools/dock-manager-core';

import { BondBlotterWidget } from './widgets/bond-blotter.widget';
import { ChartWidget } from './widgets/chart.widget';
import { OrderBookWidget } from './widgets/order-book.widget';
import { DesignSystemWidget } from './widgets/design-system.widget';

const WIDGETS: Record<string, Type<any>> = {
  blotter: BondBlotterWidget,
  chart: ChartWidget,
  orderBook: OrderBookWidget,
  designSystem: DesignSystemWidget,
};

const INITIAL_LAYOUT: DockManagerState = {
  layout: {
    type: 'split',
    id: 'root',
    direction: 'horizontal',
    sizes: [40, 60],
    children: [
      { type: 'tabgroup', id: 'tg-left', panels: ['blotter', 'designSystem'], activePanel: 'blotter' },
      {
        type: 'split',
        id: 'right',
        direction: 'vertical',
        sizes: [60, 40],
        children: [
          { type: 'tabgroup', id: 'tg-chart', panels: ['chart'], activePanel: 'chart' },
          { type: 'tabgroup', id: 'tg-ob', panels: ['orderBook'], activePanel: 'orderBook' },
        ],
      },
    ],
  },
  panels: {
    blotter: { id: 'blotter', title: 'Bond Blotter', widgetType: 'blotter', closable: false },
    chart: { id: 'chart', title: 'Chart', widgetType: 'chart', closable: false },
    orderBook: { id: 'orderBook', title: 'Order Book', widgetType: 'orderBook', closable: false },
    designSystem: { id: 'designSystem', title: 'Design System', widgetType: 'designSystem', closable: false },
  },
  floatingPanels: [],
  popoutPanels: [],
  unpinnedPanels: [],
  nextZIndex: 100,
  activePaneId: 'blotter',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DockManagerCoreComponent],
  template: `
    <header>
      <div class="brand">
        <span class="title">{{ title }}</span>
        <span class="sub">MARKETS DESIGN SYSTEM · STARTER</span>
      </div>
      <button class="theme-btn" (click)="toggleTheme()" [title]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
        {{ isDark() ? '☀' : '☽' }}
      </button>
    </header>
    <div class="dock-manager-container" style="flex:1;overflow:hidden">
      <dock-manager-core [initialState]="initialLayout" [widgets]="widgets" [theme]="dockTheme" />
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      background: var(--bn-bg);
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 14px;
      border-bottom: 1px solid var(--bn-border);
      background: var(--bn-bg1);
      flex-shrink: 0;
    }
    .brand { display: flex; align-items: baseline; gap: 10px; }
    .title {
      font-family: var(--fi-mono);
      font-weight: 700;
      font-size: 13px;
      color: var(--bn-t0);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .sub { font-size: 10px; color: var(--bn-t2); letter-spacing: 0.08em; }
    .theme-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 4px;
      border: 1px solid var(--bn-border);
      background: var(--bn-bg2);
      color: var(--bn-t0);
      cursor: pointer;
      font-size: 14px;
    }
  `],
})
export class App {
  private platformId = inject(PLATFORM_ID);
  title = '{{APP_NAME}}';
  isDark = signal(true);
  widgets = WIDGETS;
  initialLayout: DockManagerState = INITIAL_LAYOUT;
  dockTheme: DockTheme = slateDark;

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const mode = this.isDark() ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', mode);
        document.body.dataset['agThemeMode'] = mode;
      }
    });
    effect(() => {
      this.dockTheme = this.isDark() ? slateDark : vsCodeLight;
    });
  }

  toggleTheme() {
    this.isDark.update((v) => !v);
  }
}
