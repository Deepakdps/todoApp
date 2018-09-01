"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var firebase = require('nativescript-plugin-firebase');
var common_1 = require("@angular/common");
var user_model_1 = require("~/components/models/user.model");
var firebase_service_1 = require("~/components/services/firebase.service");
var page_1 = require("tns-core-modules/ui/page/page");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(location, firebaseService, router, _page) {
        this.location = location;
        this.firebaseService = firebaseService;
        this.router = router;
        this._page = _page;
        this.user = new user_model_1.User();
        this.user.email = '';
        this.user.password = '';
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.firebaseService
            .register(this.user)
            .then(function (result) {
            if (result) {
                alert('user added sucessfully');
                _this.router.navigate(['/login'], { clearHistory: true });
            }
        })
            .catch(function (message) {
            alert(message);
        });
    };
    RegisterComponent.prototype.goBack = function () {
        this.location.back();
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-register',
            templateUrl: 'register.component.html'
        }),
        __metadata("design:paramtypes", [common_1.Location,
            firebase_service_1.FirebaseService,
            router_1.RouterExtensions,
            page_1.Page])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELHNEQUErRDtBQUMvRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCwwQ0FBMkM7QUFDM0MsNkRBQXNEO0FBQ3RELDJFQUF5RTtBQUN6RSxzREFBcUQ7QUFPckQ7SUFDRSwyQkFDVSxRQUFrQixFQUNsQixlQUFnQyxFQUNoQyxNQUF3QixFQUN4QixLQUFXO1FBSFgsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUVuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELG9DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUdNLG9DQUFRLEdBQWY7UUFBQSxpQkFZQztRQVhDLElBQUksQ0FBQyxlQUFlO2FBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ25CLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDVixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDM0QsQ0FBQztRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLE9BQVk7WUFDbEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNNLGtDQUFNLEdBQWI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUEvQlUsaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLHlCQUF5QjtTQUN2QyxDQUFDO3lDQUdvQixpQkFBUTtZQUNELGtDQUFlO1lBQ3hCLHlCQUFnQjtZQUNqQixXQUFJO09BTFYsaUJBQWlCLENBZ0M3QjtJQUFELHdCQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7QUFoQ1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNuYWNrYmFyJztcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnKTtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICd+L2NvbXBvbmVudHMvbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSAnfi9jb21wb25lbnRzL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbnMtcmVnaXN0ZXInLFxuICB0ZW1wbGF0ZVVybDogJ3JlZ2lzdGVyLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBSZWdpc3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBfcGFnZTogUGFnZVxuICApIHtcbiAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgIHRoaXMudXNlci5lbWFpbCA9ICcnO1xuICAgIHRoaXMudXNlci5wYXNzd29yZCA9ICcnO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIHVzZXI6IFVzZXI7XG4gIHB1YmxpYyByZWdpc3RlcigpIHtcbiAgICB0aGlzLmZpcmViYXNlU2VydmljZVxuICAgICAgLnJlZ2lzdGVyKHRoaXMudXNlcilcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICBhbGVydCgndXNlciBhZGRlZCBzdWNlc3NmdWxseScpO1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChtZXNzYWdlOiBhbnkpID0+IHtcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ29CYWNrKCkge1xuICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICB9XG59XG4iXX0=