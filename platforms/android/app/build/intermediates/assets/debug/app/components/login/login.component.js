"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require('nativescript-plugin-firebase');
var router_1 = require("nativescript-angular/router");
var user_model_1 = require("~/components/models/user.model");
var firebase_service_1 = require("~/components/services/firebase.service");
var page_1 = require("tns-core-modules/ui/page/page");
var dialogs_1 = require("ui/dialogs");
var localStorage = require('nativescript-localstorage');
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, firebaseService, _page) {
        this.router = router;
        this.firebaseService = firebaseService;
        this._page = _page;
        this.user = new user_model_1.User();
        this.user.email = 'deepakdps431@gmail.com';
        this.user.password = 'dddpppsss';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.firebaseService
            .login(this.user)
            .then(function (result) {
            if (result) {
                // console.log('result', result);
                localStorage.setItem('loggedIn', JSON.stringify(_this.user.email));
                _this.router.navigate(['/secure'], { clearHistory: true });
            }
        })
            .catch(function (message) {
            alert(message);
        });
    };
    LoginComponent.prototype.forgotPassword = function () {
        var _this = this;
        dialogs_1.prompt({
            title: 'Forgot Password',
            message: 'Enter the email address you used to register to reset your password.',
            defaultText: '',
            okButtonText: 'Ok',
            cancelButtonText: 'Cancel'
        }).then(function (data) {
            if (data.result) {
                _this.firebaseService
                    .resetPassword(data.text.trim())
                    .then(function (result) {
                    if (result) {
                        alert(result);
                    }
                    else {
                        alert('pls type correct email');
                    }
                });
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-login',
            templateUrl: 'login.component.html'
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            firebase_service_1.FirebaseService,
            page_1.Page])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3pELHNEQUErRDtBQUMvRCw2REFBc0Q7QUFDdEQsMkVBQXlFO0FBQ3pFLHNEQUFxRDtBQUNyRCxzQ0FBb0M7QUFDcEMsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFPeEQ7SUFHRSx3QkFDVSxNQUF3QixFQUN4QixlQUFnQyxFQUNoQyxLQUFXO1FBRlgsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQU07UUFFbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyx3QkFBd0IsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztJQUNELGlDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUNNLDhCQUFLLEdBQVo7UUFBQSxpQkFhQztRQVpDLElBQUksQ0FBQyxlQUFlO2FBQ2pCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2hCLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDVixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNYLGlDQUFpQztnQkFDakMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM1RCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsT0FBWTtZQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsdUNBQWMsR0FBZDtRQUFBLGlCQXFCQztRQXBCQyxnQkFBTSxDQUFDO1lBQ0wsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixPQUFPLEVBQ0wsc0VBQXNFO1lBQ3hFLFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLElBQUk7WUFDbEIsZ0JBQWdCLEVBQUUsUUFBUTtTQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUNWLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFJLENBQUMsZUFBZTtxQkFDakIsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQy9CLElBQUksQ0FBQyxVQUFDLE1BQVc7b0JBQ2hCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNoQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO29CQUNsQyxDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWxEVSxjQUFjO1FBTDFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHNCQUFzQjtTQUNwQyxDQUFDO3lDQUtrQix5QkFBZ0I7WUFDUCxrQ0FBZTtZQUN6QixXQUFJO09BTlYsY0FBYyxDQW1EMUI7SUFBRCxxQkFBQztDQUFBLEFBbkRELElBbURDO0FBbkRZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNuYWNrYmFyJztcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnfi9jb21wb25lbnRzL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gJ34vY29tcG9uZW50cy9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBwcm9tcHQgfSBmcm9tICd1aS9kaWFsb2dzJztcbnZhciBsb2NhbFN0b3JhZ2UgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlJyk7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ25zLWxvZ2luJyxcbiAgdGVtcGxhdGVVcmw6ICdsb2dpbi5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB1c2VyOiBVc2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfcGFnZTogUGFnZVxuICApIHtcbiAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgIHRoaXMudXNlci5lbWFpbCA9ICdkZWVwYWtkcHM0MzFAZ21haWwuY29tJztcbiAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSAnZGRkcHBwc3NzJztcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gIH1cbiAgcHVibGljIGxvZ2luKCkge1xuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlXG4gICAgICAubG9naW4odGhpcy51c2VyKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZXN1bHQnLCByZXN1bHQpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dnZWRJbicsIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlci5lbWFpbCkpO1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3NlY3VyZSddLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgZm9yZ290UGFzc3dvcmQoKSB7XG4gICAgcHJvbXB0KHtcbiAgICAgIHRpdGxlOiAnRm9yZ290IFBhc3N3b3JkJyxcbiAgICAgIG1lc3NhZ2U6XG4gICAgICAgICdFbnRlciB0aGUgZW1haWwgYWRkcmVzcyB5b3UgdXNlZCB0byByZWdpc3RlciB0byByZXNldCB5b3VyIHBhc3N3b3JkLicsXG4gICAgICBkZWZhdWx0VGV4dDogJycsXG4gICAgICBva0J1dHRvblRleHQ6ICdPaycsXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsJ1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2VcbiAgICAgICAgICAucmVzZXRQYXNzd29yZChkYXRhLnRleHQudHJpbSgpKVxuICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICBhbGVydChyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYWxlcnQoJ3BscyB0eXBlIGNvcnJlY3QgZW1haWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19