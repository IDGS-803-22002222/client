import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { RegisterComponent } from './pages/register/register';
import { AccountComponent } from './pages/account/account';
import { authGuard } from './guards/auth-guard';
import { UsersComponent } from './pages/users/users';
import { roleGuard } from './guards/role-guard';
import { RoleComponent } from './pages/role/role';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password';
import { ResetPasswordComponent } from './pages/reset-password/reset-password';
import { ChangePasswordComponent } from './pages/change-password/change-password';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'account/:id',
    component: AccountComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['Admin'],
    },
  },
  {
    path: 'roles',
    component: RoleComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['Admin'],
    },
  },
];