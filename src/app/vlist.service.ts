import { Injectable } from '@angular/core';
import { VTB } from './vtb';
import { infos } from './info'
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VlistService {

  constructor() { }
  getVList(): Observable<VTB[]> {
    let VTBS: VTB[] = infos;
    return of(VTBS);
  }
}
