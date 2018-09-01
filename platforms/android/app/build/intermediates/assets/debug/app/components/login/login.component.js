"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require('nativescript-plugin-firebase');
var router_1 = require("nativescript-angular/router");
var user_model_1 = require("~/components/models/user.model");
var firebase_service_1 = require("~/components/services/firebase.service");
var page_1 = require("tns-core-modules/ui/page/page");
var dialogs_1 = require("ui/dialogs");
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
            message: 'Enter the email address you used to register for Giftler to reset your password.',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3pELHNEQUErRDtBQUMvRCw2REFBc0Q7QUFDdEQsMkVBQXlFO0FBQ3pFLHNEQUFxRDtBQUNyRCxzQ0FBb0M7QUFPcEM7SUFHRSx3QkFDVSxNQUF3QixFQUN4QixlQUFnQyxFQUNoQyxLQUFXO1FBRlgsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQU07UUFFbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyx3QkFBd0IsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztJQUNELGlDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUNNLDhCQUFLLEdBQVo7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxlQUFlO2FBQ2pCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2hCLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDVixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM1RCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsT0FBWTtZQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsdUNBQWMsR0FBZDtRQUFBLGlCQW1CQztRQWxCQyxnQkFBTSxDQUFDO1lBQ0wsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixPQUFPLEVBQ0wsa0ZBQWtGO1lBQ3BGLFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLElBQUk7WUFDbEIsZ0JBQWdCLEVBQUUsUUFBUTtTQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUNWLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFJLENBQUMsZUFBZTtxQkFDakIsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQy9CLElBQUksQ0FBQyxVQUFDLE1BQVc7b0JBQ2hCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNoQixDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTlDVSxjQUFjO1FBTDFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHNCQUFzQjtTQUNwQyxDQUFDO3lDQUtrQix5QkFBZ0I7WUFDUCxrQ0FBZTtZQUN6QixXQUFJO09BTlYsY0FBYyxDQStDMUI7SUFBRCxxQkFBQztDQUFBLEFBL0NELElBK0NDO0FBL0NZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNuYWNrYmFyJztcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnfi9jb21wb25lbnRzL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gJ34vY29tcG9uZW50cy9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBwcm9tcHQgfSBmcm9tICd1aS9kaWFsb2dzJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbnMtbG9naW4nLFxuICB0ZW1wbGF0ZVVybDogJ2xvZ2luLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHVzZXI6IFVzZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcbiAgICBwcml2YXRlIF9wYWdlOiBQYWdlXG4gICkge1xuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgdGhpcy51c2VyLmVtYWlsID0gJ2RlZXBha2RwczQzMUBnbWFpbC5jb20nO1xuICAgIHRoaXMudXNlci5wYXNzd29yZCA9ICdkZGRwcHBzc3MnO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxuICBwdWJsaWMgbG9naW4oKSB7XG4gICAgdGhpcy5maXJlYmFzZVNlcnZpY2VcbiAgICAgIC5sb2dpbih0aGlzLnVzZXIpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc2VjdXJlJ10sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChtZXNzYWdlOiBhbnkpID0+IHtcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBmb3Jnb3RQYXNzd29yZCgpIHtcbiAgICBwcm9tcHQoe1xuICAgICAgdGl0bGU6ICdGb3Jnb3QgUGFzc3dvcmQnLFxuICAgICAgbWVzc2FnZTpcbiAgICAgICAgJ0VudGVyIHRoZSBlbWFpbCBhZGRyZXNzIHlvdSB1c2VkIHRvIHJlZ2lzdGVyIGZvciBHaWZ0bGVyIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmQuJyxcbiAgICAgIGRlZmF1bHRUZXh0OiAnJyxcbiAgICAgIG9rQnV0dG9uVGV4dDogJ09rJyxcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWwnXG4gICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZVxuICAgICAgICAgIC5yZXNldFBhc3N3b3JkKGRhdGEudGV4dC50cmltKCkpXG4gICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==