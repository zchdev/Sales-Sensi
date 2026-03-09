import { Routes } from '@angular/router';
import { LoginView } from './views/login-view/login-view';
import { PrivateView } from './views/private-view/private-view';
import { ErrorView } from './views/error-view/error-view';
import { HomeDashboard } from './views/components/home-dashboard/home-dashboard';
import { UploadView } from './views/components/upload-view/upload-view';
import { ProductDashboard } from './views/components/product-dashboard/product-dashboard';
import { OverviewDashboard } from './views/components/overview-dashboard/overview-dashboard';
import { accessGuardGuard } from './core/guards/access-guard-guard';
import { Predictions } from './views/components/predictions/predictions';
import { ErrorLogin } from './views/error-login/error-login';
import { SenseiView } from './views/components/sensei-view/sensei-view';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: PrivateView,
    children: [
      // {
      //   path: 'slider',
      //   component: SliderComponent,
      // },
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: OverviewDashboard,
        canActivate: [accessGuardGuard],
      },
      {
        path: 'products',
        component: HomeDashboard,
        canActivate: [accessGuardGuard],
      },
      {
        path: 'predictions',
        component: Predictions,
        canActivate: [accessGuardGuard],
      },
       {
        path: 'sensei',
        component: SenseiView,
        canActivate: [accessGuardGuard],
      },
      {
        path: 'upload',
        component: UploadView,
        canActivate: [accessGuardGuard],
      },
      { path: '**', component: ErrorView },
    ],
  },
  {
    path: 'login',
    component: LoginView,
  },

  {
    path: 'welcome',
    component: ErrorView,
  },
  { path: '**', component: ErrorLogin },
];
