import { Injectable } from '@angular/core';
import { Config, STYLE, THEME } from 'ngx-easy-table';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConfigurationService {
  public static config: Config = {
    searchEnabled: true,
    headerEnabled: true,
    orderEnabled: true,
    globalSearchEnabled: false,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: false,
    selectRow: false,
    selectCol: false,
    selectCell: false,
    rows: 1000,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: true,
    groupRows: false,
    paginationRangeEnabled: false,
    collapseAllRows: false,
    checkboxes: false,
    resizeColumn: false,
    fixedColumnWidth: false,
    horizontalScroll: false,
    draggable: false,
    logger: false,
    showDetailsArrow: false,
    showContextMenu: false,
    persistState: false,
    tableLayout: {
      style: STYLE.TINY,
      theme: THEME.LIGHT,
      borderless: false,
      hover: true,
      striped: false
    }
  };
}

@Injectable()
export class PlazaService {
  constructor(private http: HttpClient) {}

  descargarPlaza(): Observable<any> {
    return this.http.get(environment.serverUrl + 'Plaza');
  }

  actualizarPlaza(plaza: any): Observable<any> {
    return this.http.patch(environment.serverUrl + 'Plaza/' + plaza.id, plaza);
  }
}
