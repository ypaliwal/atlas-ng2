import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { MpDataComponent } from './components/pages/mpData/mpData.component';

const APP_ROUTES: Routes = [
    { 
        path: '', 
        component: HomeComponent
    },
    { 
        path: 'about', 
        component: AboutComponent
    },
    {
        path: 'mpData',
        component: MpDataComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);