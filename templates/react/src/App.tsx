import { DockManagerCore, type WidgetProps } from '@widgetstools/react-dock-manager';
import { type DockManagerState, slateDark, vsCodeLight } from '@widgetstools/dock-manager-core';
import '@widgetstools/react-dock-manager/styles.css';

import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BondBlotterPanel } from '@/components/panels/BondBlotterPanel';
import { ChartPanel } from '@/components/panels/ChartPanel';
import { OrderBookPanel } from '@/components/panels/OrderBookPanel';
import { DesignSystemPanel } from '@/components/panels/DesignSystemPanel';

function W_Blotter(_p: WidgetProps) { return <BondBlotterPanel />; }
function W_Chart(_p: WidgetProps) { return <ChartPanel />; }
function W_OrderBook(_p: WidgetProps) { return <OrderBookPanel />; }
function W_DesignSystem(_p: WidgetProps) { return <DesignSystemPanel />; }

const WIDGETS: Record<string, React.ComponentType<WidgetProps>> = {
  blotter: W_Blotter,
  chart: W_Chart,
  orderBook: W_OrderBook,
  designSystem: W_DesignSystem,
};

const INITIAL_LAYOUT: DockManagerState = {
  layout: {
    type: 'split',
    id: 'root',
    direction: 'horizontal',
    sizes: [40, 60],
    children: [
      { type: 'tabgroup', id: 'tg-left',  panels: ['blotter', 'designSystem'], activePanel: 'blotter' },
      {
        type: 'split',
        id: 'right',
        direction: 'vertical',
        sizes: [60, 40],
        children: [
          { type: 'tabgroup', id: 'tg-chart', panels: ['chart'],     activePanel: 'chart' },
          { type: 'tabgroup', id: 'tg-ob',    panels: ['orderBook'], activePanel: 'orderBook' },
        ],
      },
    ],
  },
  panels: {
    blotter:      { id: 'blotter',      title: 'Bond Blotter',  widgetType: 'blotter',      closable: false },
    chart:        { id: 'chart',        title: 'Chart',         widgetType: 'chart',        closable: false },
    orderBook:    { id: 'orderBook',    title: 'Order Book',    widgetType: 'orderBook',    closable: false },
    designSystem: { id: 'designSystem', title: 'Design System', widgetType: 'designSystem', closable: false },
  },
  floatingPanels: [],
  popoutPanels: [],
  unpinnedPanels: [],
  nextZIndex: 100,
  activePaneId: 'blotter',
};

export default function App() {
  const { isDark } = useTheme();
  const dockTheme = isDark ? slateDark : vsCodeLight;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        background: 'var(--bn-bg)',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          borderBottom: '1px solid var(--bn-border)',
          background: 'var(--bn-bg1)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span
            style={{
              fontFamily: 'var(--fi-mono)',
              fontWeight: 700,
              fontSize: 13,
              color: 'var(--bn-t0)',
              letterSpacing: '0.05em',
            }}
          >
            {'{{APP_NAME}}'.toUpperCase()}
          </span>
          <span style={{ fontSize: 10, color: 'var(--bn-t2)', letterSpacing: '0.08em' }}>
            MARKETS DESIGN SYSTEM · STARTER
          </span>
        </div>
        <ThemeToggle />
      </header>
      <div className="dock-manager-container" style={{ flex: 1, overflow: 'hidden' }}>
        <DockManagerCore initialState={INITIAL_LAYOUT} widgets={WIDGETS} theme={dockTheme} />
      </div>
    </div>
  );
}
