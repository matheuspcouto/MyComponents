import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ModalDetalhesService {

  action$ = new Subject<boolean>();
  lastFocusElement: Element | null = null;

  hide() {
    this.action$.next(false);
  }

  show(): Promise<boolean> {
    this.lastFocusElement = document.activeElement;

    return this.action$.pipe(
      take(1),
      tap(() => {
        if (this.lastFocusElement) {
          (this.lastFocusElement as any).focus();
        }
      })
    ).toPromise();
  }
}
