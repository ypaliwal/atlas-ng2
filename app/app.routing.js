"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./components/pages/home/home.component');
var about_component_1 = require('./components/pages/about/about.component');
var mpData_component_1 = require('./components/pages/mpData/mpData.component');
var APP_ROUTES = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent
    },
    {
        path: 'mpData',
        component: mpData_component_1.MpDataComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routing.js.map