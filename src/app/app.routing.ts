import { Routes, RouterModule } from '@angular/router';
import { RtlContainerComponent } from './tasks-operations/pages/rtl-container/rtl-container.component';
import { LtrContainerComponent } from './tasks-operations/pages/ltr-container/ltr-container.component';

export const routes: Routes = [
  { path: '', redirectTo: 'rtl', pathMatch: 'full' },
  { path: 'rtl', component: RtlContainerComponent },
  { path: 'ltr', component: LtrContainerComponent }
];


