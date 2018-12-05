import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var io: any;

@Injectable()
export class WebSocketService {
  private socketSession: any = null;

  constructor() {
    this.socketSession = io.sails.connect(environment.serverUrl);
  }

  getSocketSession(): any {
    return this.socketSession;
  }
}
