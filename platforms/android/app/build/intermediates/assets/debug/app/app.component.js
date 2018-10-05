"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require('nativescript-plugin-firebase');
var router_1 = require("@angular/router");
var backend_service_1 = require("~/components/services/backend.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        this.localUser = localStorage.getItem('loggedIn');
        firebase
            .init({
            //persist should be set to false as otherwise numbers aren't returned during livesync
            persist: false,
            onAuthStateChanged: function (data) {
                // console.log(JSON.stringify(data));
                if (data.loggedIn) {
                    console.log(data.user.uid);
                    backend_service_1.BackendService.token = data.user.uid;
                    if (_this.localUser) {
                        console.log('heyhey i am already logged in');
                        _this.router.navigate(['secure']);
                    }
                    else {
                        console.log('heyhey i am not logged in');
                        _this.router.navigate(['login']);
                    }
                }
                else {
                    backend_service_1.BackendService.token = '';
                }
            }
        })
            .then(function (instance) {
            console.log('firebase.init done');
        }, function (error) {
            console.log('firebase.init error: ' + error);
        });
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'ns-app',
            templateUrl: 'app.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsMENBQXlDO0FBQ3pDLHlFQUF1RTtBQUt2RTtJQUVFLHNCQUFvQixNQUFjO1FBQWxDLGlCQWdDQztRQWhDbUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbEQsUUFBUTthQUNMLElBQUksQ0FBQztZQUNKLHFGQUFxRjtZQUNyRixPQUFPLEVBQUUsS0FBSztZQUNkLGtCQUFrQixFQUFFLFVBQUMsSUFBUztnQkFDNUIscUNBQXFDO2dCQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMzQixnQ0FBYyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDckMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQzt3QkFDN0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQzt3QkFDekMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxDQUFDO2dCQUNILENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sZ0NBQWMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUM1QixDQUFDO1lBQ0gsQ0FBQztTQUNGLENBQUM7YUFDRCxJQUFJLENBQ0gsVUFBUyxRQUFRO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsRUFDRCxVQUFTLEtBQUs7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQWxDVSxZQUFZO1FBSnhCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ2xDLENBQUM7eUNBRzRCLGVBQU07T0FGdkIsWUFBWSxDQW1DeEI7SUFBRCxtQkFBQztDQUFBLEFBbkNELElBbUNDO0FBbkNZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJhY2tlbmRTZXJ2aWNlIH0gZnJvbSAnfi9jb21wb25lbnRzL3NlcnZpY2VzL2JhY2tlbmQuc2VydmljZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1hcHAnLFxuICB0ZW1wbGF0ZVVybDogJ2FwcC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiAgbG9jYWxVc2VyOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB0aGlzLmxvY2FsVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZWRJbicpO1xuXG4gICAgZmlyZWJhc2VcbiAgICAgIC5pbml0KHtcbiAgICAgICAgLy9wZXJzaXN0IHNob3VsZCBiZSBzZXQgdG8gZmFsc2UgYXMgb3RoZXJ3aXNlIG51bWJlcnMgYXJlbid0IHJldHVybmVkIGR1cmluZyBsaXZlc3luY1xuICAgICAgICBwZXJzaXN0OiBmYWxzZSxcbiAgICAgICAgb25BdXRoU3RhdGVDaGFuZ2VkOiAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgIGlmIChkYXRhLmxvZ2dlZEluKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnVzZXIudWlkKTtcbiAgICAgICAgICAgIEJhY2tlbmRTZXJ2aWNlLnRva2VuID0gZGF0YS51c2VyLnVpZDtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsVXNlcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGV5aGV5IGkgYW0gYWxyZWFkeSBsb2dnZWQgaW4nKTtcbiAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydzZWN1cmUnXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGV5aGV5IGkgYW0gbm90IGxvZ2dlZCBpbicpO1xuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2xvZ2luJ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBCYWNrZW5kU2VydmljZS50b2tlbiA9ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKFxuICAgICAgICBmdW5jdGlvbihpbnN0YW5jZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdmaXJlYmFzZS5pbml0IGRvbmUnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZmlyZWJhc2UuaW5pdCBlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxufVxuIl19