"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var data_model_1 = require("~/components/models/data.model");
var firebase_service_1 = require("~/components/services/firebase.service");
var firebase = require('nativescript-plugin-firebase');
var dialogs = require("ui/dialogs");
var SecureComponent = /** @class */ (function () {
    function SecureComponent(router, firebaseService) {
        this.router = router;
        this.firebaseService = firebaseService;
    }
    SecureComponent.prototype.ngOnInit = function () {
        // this.items = this.itemService.getItems();
        console.log('inside oninit');
        this.datas$ = this.firebaseService.getMyWishList();
    };
    SecureComponent.prototype.logout = function () {
        var _this = this;
        dialogs
            .confirm({
            title: 'Confirm Logut',
            message: 'Are you sure you want to Logout?',
            cancelButtonText: 'Cancel',
            okButtonText: 'Ok'
        })
            .then(function (result) {
            // result argument is boolean
            console.log('Dialog result: ' + result);
            if (result === true) {
                localStorage.clear();
                _this.router.navigate(['/login'], { clearHistory: true });
            }
        });
    };
    SecureComponent.prototype.add = function () {
        var _this = this;
        this.data = new data_model_1.Data(this.id, this.name, this.date, this.description, this.imagepath, this.UID);
        var myTodo = this.data.name;
        this.firebaseService.add(myTodo).then(function (message) {
            _this.name = '';
            alert(message);
        });
    };
    SecureComponent.prototype.delete = function (data) {
        this.firebaseService.delete(data).catch(function () {
            alert('An error occurred while deleting an item from your list.');
        });
    };
    SecureComponent.prototype.viewDetail = function (id) {
        this.router.navigate(['/secure-detail', id]);
    };
    SecureComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-secure',
            templateUrl: 'secure.component.html'
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            firebase_service_1.FirebaseService])
    ], SecureComponent);
    return SecureComponent;
}());
exports.SecureComponent = SecureComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY3VyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsc0RBQStEO0FBRy9ELDZEQUFzRDtBQUN0RCwyRUFBeUU7QUFDekUsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsb0NBQXNDO0FBT3RDO0lBZUUseUJBQ1UsTUFBd0IsRUFDeEIsZUFBZ0M7UUFEaEMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3ZDLENBQUM7SUFSSixrQ0FBUSxHQUFSO1FBQ0UsNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFELENBQUM7SUFLTSxnQ0FBTSxHQUFiO1FBQUEsaUJBaUJDO1FBaEJDLE9BQU87YUFDSixPQUFPLENBQUM7WUFDUCxLQUFLLEVBQUUsZUFBZTtZQUN0QixPQUFPLEVBQUUsa0NBQWtDO1lBQzNDLGdCQUFnQixFQUFFLFFBQVE7WUFFMUIsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFBLE1BQU07WUFDViw2QkFBNkI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDM0QsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZCQUFHLEdBQUg7UUFBQSxpQkFjQztRQWJDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUNsQixJQUFJLENBQUMsRUFBRSxFQUNQLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQztRQUNGLElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQVk7WUFDakQsS0FBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsZ0NBQU0sR0FBTixVQUFPLElBQVU7UUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdEMsS0FBSyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQVUsR0FBVixVQUFXLEVBQVU7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUE3RFUsZUFBZTtRQUwzQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx1QkFBdUI7U0FDckMsQ0FBQzt5Q0FpQmtCLHlCQUFnQjtZQUNQLGtDQUFlO09BakIvQixlQUFlLENBOEQzQjtJQUFELHNCQUFDO0NBQUEsQUE5REQsSUE4REM7QUE5RFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gJ34vY29tcG9uZW50cy9tb2RlbHMvZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tICd+L2NvbXBvbmVudHMvc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnKTtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSAndWkvZGlhbG9ncyc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ25zLXNlY3VyZScsXG4gIHRlbXBsYXRlVXJsOiAnc2VjdXJlLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBTZWN1cmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGRhdGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaW1hZ2VwYXRoOiBzdHJpbmc7XG4gIFVJRDogc3RyaW5nO1xuXG4gIHB1YmxpYyBkYXRhOiBEYXRhO1xuICBwdWJsaWMgZGF0YXMkOiBPYnNlcnZhYmxlPGFueT47XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gICAgY29uc29sZS5sb2coJ2luc2lkZSBvbmluaXQnKTtcbiAgICB0aGlzLmRhdGFzJCA9IDxhbnk+dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0TXlXaXNoTGlzdCgpO1xuICB9XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlXG4gICkge31cbiAgcHVibGljIGxvZ291dCgpIHtcbiAgICBkaWFsb2dzXG4gICAgICAuY29uZmlybSh7XG4gICAgICAgIHRpdGxlOiAnQ29uZmlybSBMb2d1dCcsXG4gICAgICAgIG1lc3NhZ2U6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gTG9nb3V0PycsXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWwnLFxuXG4gICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJ1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIC8vIHJlc3VsdCBhcmd1bWVudCBpcyBib29sZWFuXG4gICAgICAgIGNvbnNvbGUubG9nKCdEaWFsb2cgcmVzdWx0OiAnICsgcmVzdWx0KTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGFkZCgpIHtcbiAgICB0aGlzLmRhdGEgPSBuZXcgRGF0YShcbiAgICAgIHRoaXMuaWQsXG4gICAgICB0aGlzLm5hbWUsXG4gICAgICB0aGlzLmRhdGUsXG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgdGhpcy5pbWFnZXBhdGgsXG4gICAgICB0aGlzLlVJRFxuICAgICk7XG4gICAgbGV0IG15VG9kbzogc3RyaW5nID0gdGhpcy5kYXRhLm5hbWU7XG4gICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuYWRkKG15VG9kbykudGhlbigobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICB0aGlzLm5hbWUgPSAnJztcbiAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9XG4gIGRlbGV0ZShkYXRhOiBEYXRhKSB7XG4gICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuZGVsZXRlKGRhdGEpLmNhdGNoKCgpID0+IHtcbiAgICAgIGFsZXJ0KCdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBkZWxldGluZyBhbiBpdGVtIGZyb20geW91ciBsaXN0LicpO1xuICAgIH0pO1xuICB9XG5cbiAgdmlld0RldGFpbChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc2VjdXJlLWRldGFpbCcsIGlkXSk7XG4gIH1cbn1cbiJdfQ==