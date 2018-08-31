"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var firebase = require('nativescript-plugin-firebase');
var router_1 = require("nativescript-angular/router");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router) {
        this.router = router;
        this.isLoggingIn = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELCtEQUFpRDtBQUNqRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxzREFBK0Q7QUFPL0Q7SUFLRSx3QkFBMkIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFKbkQsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDWixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLGFBQVEsR0FBVyxFQUFFLENBQUM7SUFFeUIsQ0FBQztJQUNoRCw4QkFBSyxHQUFaO1FBQUEsaUJBcUJDO1FBcEJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsUUFBUTtpQkFDTCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUTtnQkFDakMsZUFBZSxFQUFFO29CQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2lCQUN4QjthQUNGLENBQUM7aUJBQ0QsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDVixpQ0FBaUM7Z0JBQ2pDLElBQUksZ0NBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUM5QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7Z0JBQ1YsSUFBSSxnQ0FBUSxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLGdDQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNoRCxDQUFDO0lBQ0gsQ0FBQztJQTNCVSxjQUFjO1FBTDFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHNCQUFzQjtTQUNwQyxDQUFDO3lDQU1tQyx5QkFBZ0I7T0FMeEMsY0FBYyxDQTRCMUI7SUFBRCxxQkFBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNuYWNrYmFyJztcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ25zLWxvZ2luJyxcbiAgdGVtcGxhdGVVcmw6ICdsb2dpbi5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQge1xuICBpc0xvZ2dpbmdJbiA9IHRydWU7XG4gIHB1YmxpYyBlbWFpbDogU3RyaW5nID0gJyc7XG4gIHB1YmxpYyBwYXNzd29yZDogU3RyaW5nID0gJyc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zKSB7fVxuICBwdWJsaWMgbG9naW4oKSB7XG4gICAgaWYgKHRoaXMuZW1haWwgJiYgdGhpcy5wYXNzd29yZCkge1xuICAgICAgZmlyZWJhc2VcbiAgICAgICAgLmxvZ2luKHtcbiAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXG4gICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XG4gICAgICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIC8vIGFsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xuICAgICAgICAgIG5ldyBTbmFja0JhcigpLnNpbXBsZSgnQ29ycmVjdCBDcmVkZW50aWFscyEnKTtcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zZWN1cmUnXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbmV3IFNuYWNrQmFyKCkuc2ltcGxlKCdJbmNvcnJlY3QgQ3JlZGVudGlhbHMhJyk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgU25hY2tCYXIoKS5zaW1wbGUoJ0FsbCBGaWVsZHMgUmVxdWlyZWQhJyk7XG4gICAgfVxuICB9XG59XG4iXX0=