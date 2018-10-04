"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var login_component_1 = require("~/components/login/login.component");
// Uncomment and add to NgModule imports if you need to use two-way binding
var forms_1 = require("nativescript-angular/forms");
var register_component_1 = require("~/components/register/register.component");
var secure_component_1 = require("~/components/secure/secure.component");
var backend_service_1 = require("~/components/services/backend.service");
var firebase_service_1 = require("~/components/services/firebase.service");
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            imports: [nativescript_module_1.NativeScriptModule, app_routing_1.AppRoutingModule, forms_1.NativeScriptFormsModule],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                secure_component_1.SecureComponent
            ],
            providers: [backend_service_1.BackendService, firebase_service_1.FirebaseService],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFFL0Msc0VBQW9FO0FBRXBFLDJFQUEyRTtBQUMzRSxvREFBcUU7QUFDckUsK0VBQTZFO0FBQzdFLHlFQUF1RTtBQUN2RSx5RUFBdUU7QUFDdkUsMkVBQXlFO0FBRXpFLDZFQUE2RTtBQUM3RSxzRUFBc0U7QUFpQnRFO0lBSEE7O01BRUU7SUFDRjtJQUF3QixDQUFDO0lBQVosU0FBUztRQWZyQixlQUFRLENBQUM7WUFDUixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxDQUFDLHdDQUFrQixFQUFFLDhCQUFnQixFQUFFLCtCQUF1QixDQUFDO1lBQ3hFLFlBQVksRUFBRTtnQkFDWiw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCxzQ0FBaUI7Z0JBQ2pCLGtDQUFlO2FBQ2hCO1lBQ0QsU0FBUyxFQUFFLENBQUMsZ0NBQWMsRUFBRSxrQ0FBZSxDQUFDO1lBQzVDLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBRztJQUFELGdCQUFDO0NBQUEsQUFBekIsSUFBeUI7QUFBWiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlJztcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2FwcC5yb3V0aW5nJztcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnfi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XG5cbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgaWYgeW91IG5lZWQgdG8gdXNlIHR3by13YXkgYmluZGluZ1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gJ34vY29tcG9uZW50cy9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VjdXJlQ29tcG9uZW50IH0gZnJvbSAnfi9jb21wb25lbnRzL3NlY3VyZS9zZWN1cmUuY29tcG9uZW50JztcbmltcG9ydCB7IEJhY2tlbmRTZXJ2aWNlIH0gZnJvbSAnfi9jb21wb25lbnRzL3NlcnZpY2VzL2JhY2tlbmQuc2VydmljZSc7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tICd+L2NvbXBvbmVudHMvc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5cbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgIGlmIHlvdSBuZWVkIHRvIHVzZSB0aGUgSFRUUCB3cmFwcGVyXG4vLyBpbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcblxuQE5nTW9kdWxlKHtcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW05hdGl2ZVNjcmlwdE1vZHVsZSwgQXBwUm91dGluZ01vZHVsZSwgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBcHBDb21wb25lbnQsXG4gICAgTG9naW5Db21wb25lbnQsXG4gICAgUmVnaXN0ZXJDb21wb25lbnQsXG4gICAgU2VjdXJlQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW0JhY2tlbmRTZXJ2aWNlLCBGaXJlYmFzZVNlcnZpY2VdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiJdfQ==