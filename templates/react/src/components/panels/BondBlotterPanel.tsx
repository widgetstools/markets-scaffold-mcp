import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import type { ColDef } from 'ag-grid-community';
import { fiGridTheme } from '@/lib/agGridTheme';
import { BONDS, type Bond } from '@/data/sampleData';

ModuleRegistry.registerModules([AllEnterpriseModule]);

export function BondBlotterPanel() {
  const colDefs = useMemo(() => ([
    { field: 'ticker', headerName: 'TICKER', width: 140, pinned: 'left' },
    { field: 'issuer', headerName: 'ISSUER', flex: 1, cellStyle: { color: 'var(--bn-t1)' } },
    { field: 'cpn',    headerName: 'CPN',    width: 70, type: 'numericColumn', valueFormatter: (p: any) => p.value?.toFixed(3) },
    { field: 'mat',    headerName: 'MAT',    width: 70, cellStyle: { color: 'var(--bn-t1)' } },
    { field: 'rtg',    headerName: 'RTG',    width: 60, cellStyle: { color: 'var(--bn-cyan)' } },
    { field: 'bid',    headerName: 'BID',    width: 80, type: 'numericColumn', valueFormatter: (p: any) => p.value?.toFixed(3),
      cellStyle: { color: 'var(--bn-blue)', fontWeight: 600 } },
    { field: 'ask',    headerName: 'ASK',    width: 80, type: 'numericColumn', valueFormatter: (p: any) => p.value?.toFixed(3),
      cellStyle: { color: 'var(--bn-red)', fontWeight: 600 } },
    { field: 'ytm',    headerName: 'YTM',    width: 70, type: 'numericColumn', valueFormatter: (p: any) => p.value?.toFixed(3) + '%' },
    { field: 'dur',    headerName: 'DUR',    width: 60, type: 'numericColumn', valueFormatter: (p: any) => p.value?.toFixed(1) },
  ] as ColDef<Bond>[]), []);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    resizable: true,
    cellStyle: { fontFamily: 'JetBrains Mono,monospace', fontSize: 11 },
  }), []);

  return (
    <div style={{ height: '100%', width: '100%', background: 'var(--bn-bg1)' }}>
      <AgGridReact<Bond>
        theme={fiGridTheme}
        rowData={BONDS}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        headerHeight={30}
        rowHeight={28}
      />
    </div>
  );
}
