import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  openSideMenu$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  setSideMenuState(open: boolean) {
    this.openSideMenu$.next(open);
  }
}
