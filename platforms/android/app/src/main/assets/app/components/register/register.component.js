"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require('nativescript-plugin-firebase');
var common_1 = require("@angular/common");
var user_model_1 = require("~/components/models/user.model");
var firebase_service_1 = require("~/components/services/firebase.service");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(location, firebaseService) {
        this.location = location;
        this.firebaseService = firebaseService;
        this.email = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
        this.user = new user_model_1.User();
        this.user.email = '';
        this.user.password = '';
    }
    RegisterComponent.prototype.register = function () {
        this.firebaseService
            .register(this.user)
            .then(function () {
            alert('user added sucessfully');
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
            firebase_service_1.FirebaseService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBSWxELElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3pELDBDQUEyQztBQUMzQyw2REFBc0Q7QUFDdEQsMkVBQXlFO0FBT3pFO0lBTUUsMkJBQ1UsUUFBa0IsRUFDbEIsZUFBZ0M7UUFEaEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFQbkMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQU0zQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLG9DQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsZUFBZTthQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNuQixJQUFJLENBQUM7WUFDSixLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxPQUFZO1lBQ2xCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTSxrQ0FBTSxHQUFiO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBM0JVLGlCQUFpQjtRQUw3QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSx5QkFBeUI7U0FDdkMsQ0FBQzt5Q0FRb0IsaUJBQVE7WUFDRCxrQ0FBZTtPQVIvQixpQkFBaUIsQ0E0QjdCO0lBQUQsd0JBQUM7Q0FBQSxBQTVCRCxJQTRCQztBQTVCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tICduYXRpdmVzY3JpcHQtc25hY2tiYXInO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ34vY29tcG9uZW50cy9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tICd+L2NvbXBvbmVudHMvc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ25zLXJlZ2lzdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdyZWdpc3Rlci5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnQge1xuICBwdWJsaWMgZW1haWw6IFN0cmluZyA9ICcnO1xuICBwdWJsaWMgcGFzc3dvcmQ6IFN0cmluZyA9ICcnO1xuICBwdWJsaWMgZmlyc3RuYW1lOiBTdHJpbmcgPSAnJztcbiAgcHVibGljIGxhc3RuYW1lOiBTdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgdGhpcy51c2VyLmVtYWlsID0gJyc7XG4gICAgdGhpcy51c2VyLnBhc3N3b3JkID0gJyc7XG4gIH1cbiAgdXNlcjogVXNlcjtcbiAgcHVibGljIHJlZ2lzdGVyKCkge1xuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlXG4gICAgICAucmVnaXN0ZXIodGhpcy51c2VyKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBhbGVydCgndXNlciBhZGRlZCBzdWNlc3NmdWxseScpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgcHVibGljIGdvQmFjaygpIHtcbiAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgfVxufVxuIl19