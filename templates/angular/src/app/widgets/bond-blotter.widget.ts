import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, themeQuartz, type ColDef } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { agGridLightParams, agGridDarkParams } from '@design-system/adapters/ag-grid';
import { BONDS, type Bond } from '../sample-data';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const fiGridTheme = themeQuartz
  .withParams(agGridLightParams as any, 'light')
  .withParams(agGridDarkParams as any, 'dark');

@Component({
  selector: 'app-bond-blotter-widget',
  standalone: true,
  imports: [AgGridAngular],
  template: `
    <div style="height:100%;width:100%;background:var(--bn-bg1)">
      <ag-grid-angular
        style="width:100%;height:100%"
        [theme]="theme"
        [rowData]="rowData"
        [columnDefs]="colDefs"
        [defaultColDef]="defaultColDef"
        [headerHeight]="30"
        [rowHeight]="28"
      />
    </div>
  `,
})
export class BondBlotterWidget {
  theme = fiGridTheme;
  rowData: Bond[] = BONDS;
  colDefs: ColDef<Bond>[] = [
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
  ];
  defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    cellStyle: { fontFamily: 'JetBrains Mono,monospace', fontSize: '11px' },
  };
}
