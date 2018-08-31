"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var firebase = require('nativescript-plugin-firebase');
var common_1 = require("@angular/common");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(location) {
        this.location = location;
        this.email = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        if (this.firstname && this.lastname && this.email && this.password) {
            firebase
                .createUser({
                email: this.email,
                password: this.password
            })
                .then(function (user) {
                console.log(user);
                firebase.push('/Users', {
                    email: _this.email,
                    uid: user.key,
                    password: _this.password
                });
            }, function (error) {
                console.log('error' + error);
            });
            this.location.back();
        }
        else {
            new nativescript_snackbar_1.SnackBar().simple('All Fields Required!');
        }
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
        __metadata("design:paramtypes", [common_1.Location])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELCtEQUFpRDtBQUdqRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCwwQ0FBMkM7QUFPM0M7SUFNRSwyQkFBMkIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUx0QyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixhQUFRLEdBQVcsRUFBRSxDQUFDO0lBRW1CLENBQUM7SUFDMUMsb0NBQVEsR0FBZjtRQUFBLGlCQXlCQztRQXhCQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuRSxRQUFRO2lCQUNMLFVBQVUsQ0FBQztnQkFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUN4QixDQUFDO2lCQUNELElBQUksQ0FDSCxVQUFBLElBQUk7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3RCLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSztvQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO29CQUNiLFFBQVEsRUFBRSxLQUFJLENBQUMsUUFBUTtpQkFDeEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUNELFVBQUEsS0FBSztnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQ0YsQ0FBQztZQUVKLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxnQ0FBUSxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDaEQsQ0FBQztJQUNILENBQUM7SUFDTSxrQ0FBTSxHQUFiO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBbkNVLGlCQUFpQjtRQUw3QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSx5QkFBeUI7U0FDdkMsQ0FBQzt5Q0FPcUMsaUJBQVE7T0FObEMsaUJBQWlCLENBb0M3QjtJQUFELHdCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7QUFwQ1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNuYWNrYmFyJztcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnKTtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbnMtcmVnaXN0ZXInLFxuICB0ZW1wbGF0ZVVybDogJ3JlZ2lzdGVyLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBSZWdpc3RlckNvbXBvbmVudCB7XG4gIHB1YmxpYyBlbWFpbDogU3RyaW5nID0gJyc7XG4gIHB1YmxpYyBwYXNzd29yZDogU3RyaW5nID0gJyc7XG4gIHB1YmxpYyBmaXJzdG5hbWU6IFN0cmluZyA9ICcnO1xuICBwdWJsaWMgbGFzdG5hbWU6IFN0cmluZyA9ICcnO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbikge31cbiAgcHVibGljIHJlZ2lzdGVyKCkge1xuICAgIGlmICh0aGlzLmZpcnN0bmFtZSAmJiB0aGlzLmxhc3RuYW1lICYmIHRoaXMuZW1haWwgJiYgdGhpcy5wYXNzd29yZCkge1xuICAgICAgZmlyZWJhc2VcbiAgICAgICAgLmNyZWF0ZVVzZXIoe1xuICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgIHVzZXIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2codXNlcik7XG4gICAgICAgICAgICBmaXJlYmFzZS5wdXNoKCcvVXNlcnMnLCB7XG4gICAgICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgICAgICAgICB1aWQ6IHVzZXIua2V5LFxuICAgICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InICsgZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBTbmFja0JhcigpLnNpbXBsZSgnQWxsIEZpZWxkcyBSZXF1aXJlZCEnKTtcbiAgICB9XG4gIH1cbiAgcHVibGljIGdvQmFjaygpIHtcbiAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgfVxufVxuIl19