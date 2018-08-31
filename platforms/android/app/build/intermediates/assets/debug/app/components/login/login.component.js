"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var firebase = require('nativescript-plugin-firebase');
var router_1 = require("nativescript-angular/router");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router) {
        this.router = router;
        this.email = '';
        this.password = '';
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.email && this.password) {
            firebase
                .login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(function (result) {
                // alert(JSON.stringify(result));
                new nativescript_snackbar_1.SnackBar().simple('Correct Credentials!');
                _this.router.navigate(['/secure']);
            })
                .catch(function (error) {
                new nativescript_snackbar_1.SnackBar().simple('Incorrect Credentials!');
            });
        }
        else {
            new nativescript_snackbar_1.SnackBar().simple('All Fields Required!');
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-login',
            templateUrl: 'login.component.html'
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELCtEQUFpRDtBQUNqRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxzREFBK0Q7QUFPL0Q7SUFJRSx3QkFBMkIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFINUMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixhQUFRLEdBQVcsRUFBRSxDQUFDO0lBRXlCLENBQUM7SUFDaEQsOEJBQUssR0FBWjtRQUFBLGlCQXFCQztRQXBCQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLFFBQVE7aUJBQ0wsS0FBSyxDQUFDO2dCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7Z0JBQ2pDLGVBQWUsRUFBRTtvQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtpQkFDeEI7YUFDRixDQUFDO2lCQUNELElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQ1YsaUNBQWlDO2dCQUNqQyxJQUFJLGdDQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDOUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO2dCQUNWLElBQUksZ0NBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxnQ0FBUSxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDaEQsQ0FBQztJQUNILENBQUM7SUExQlUsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxzQkFBc0I7U0FDcEMsQ0FBQzt5Q0FLbUMseUJBQWdCO09BSnhDLGNBQWMsQ0EyQjFCO0lBQUQscUJBQUM7Q0FBQSxBQTNCRCxJQTJCQztBQTNCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zbmFja2Jhcic7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnKTtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICducy1sb2dpbicsXG4gIHRlbXBsYXRlVXJsOiAnbG9naW4uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IHtcbiAgcHVibGljIGVtYWlsOiBTdHJpbmcgPSAnJztcbiAgcHVibGljIHBhc3N3b3JkOiBTdHJpbmcgPSAnJztcblxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMpIHt9XG4gIHB1YmxpYyBsb2dpbigpIHtcbiAgICBpZiAodGhpcy5lbWFpbCAmJiB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZVxuICAgICAgICAubG9naW4oe1xuICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcbiAgICAgICAgICBwYXNzd29yZE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XG4gICAgICAgICAgbmV3IFNuYWNrQmFyKCkuc2ltcGxlKCdDb3JyZWN0IENyZWRlbnRpYWxzIScpO1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3NlY3VyZSddKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBuZXcgU25hY2tCYXIoKS5zaW1wbGUoJ0luY29ycmVjdCBDcmVkZW50aWFscyEnKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBTbmFja0JhcigpLnNpbXBsZSgnQWxsIEZpZWxkcyBSZXF1aXJlZCEnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==