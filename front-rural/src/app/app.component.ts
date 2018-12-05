import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConfigurationService, PlazaService } from './configuration.service';
import { WebSocketService } from './web-socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  columns = [
    {
      key: 'zona',
      title: 'Zonas',
      width: '8%',
      orderEnabled: true,
      searchEnabled: true
    },
    {
      key: 'distrito',
      title: 'Distrito',
      width: '15%',
      orderEnabled: true
    },
    { key: 'provincia', title: 'Provincia', width: '10%', orderEnabled: true },
    { key: 'canton', title: 'Cantón', width: '10%', orderEnabled: false },
    { key: 'parroquia', title: 'Parroquia', width: '10%', orderEnabled: false },
    {
      key: 'unicodigo',
      title: 'Unicodigo',
      width: '10%',
      orderEnabled: true
    },
    {
      key: 'establecimiento',
      title: 'Establecimiento',
      width: '10%',
      orderEnabled: false
    },
    {
      key: 'tipologia',
      title: 'Tipología',
      width: '10%',
      orderEnabled: false
    },
    {
      key: 'numeroPlazasDisponibles',
      title: 'Plazas disponibles',
      width: '5%',
      orderEnabled: false,
      searchEnabled: false
    },
    {
      key: 'numeroIntencionPlaza',
      title: 'Estoy interesado',
      width: '5%',
      orderEnabled: false,
      searchEnabled: false
    }
  ];
  data: IPlaza[] = [];
  configuration;
  toggleRowIndex;

  constructor(
    private plazaService: PlazaService,
    private ws: WebSocketService,
    private cd: ChangeDetectorRef
  ) {
    this.configuration = ConfigurationService.config;
  }

  ngOnInit(): void {
    this.ws
      .getSocketSession()
      .get(environment.serverUrl + 'Plaza?limit=1000', res => {
        this.data = res;
        this.cd.detectChanges();
      });

    this.ws
      .getSocketSession()
      .on('plaza', (respuesta: { verb: string; data: IPlaza; id: string }) => {
        if (respuesta.verb === 'updated') {
          const indexData = this.data.findIndex(
            plaza => plaza.id === respuesta.id
          );
          this.data[indexData].numeroIntencionPlaza =
            respuesta.data.numeroIntencionPlaza;
          this.cd.detectChanges();
        }
      });
  }

  actualizarPlaza(plaza: IPlaza) {
    this.plazaService
      .actualizarPlaza(plaza)
      .subscribe(data => {}, error => console.log(error));
  }

  votarEnPlaza($event, index: number): void {
    $event.preventDefault();
    this.data[index].numeroIntencionPlaza =
      this.data[index].numeroIntencionPlaza + 1;
    this.actualizarPlaza(this.data[index]);
  }

  descargarInformacion(info: { event: string; value: { row: IPlaza } }) {
    if (info.event === 'onClick') {
    } else if (info.event === 'onDoubleClick') {
    }
  }
}

interface IPlaza {
  canton: string;
  distrito: string;
  establecimiento: string;
  id: string;
  numeroIntencionPlaza: number;
  numeroPlazasDisponibles: number;
  parroquia: string;
  provincia: string;
  tipologia: string;
  unicodigo: string;
  zona: string;
}
