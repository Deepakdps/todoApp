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
        console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeee');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY3VyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsc0RBQStEO0FBRy9ELDZEQUFzRDtBQUN0RCwyRUFBeUU7QUFDekUsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsb0NBQXNDO0FBT3RDO0lBZUUseUJBQ1UsTUFBd0IsRUFDeEIsZUFBZ0M7UUFEaEMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3ZDLENBQUM7SUFSSixrQ0FBUSxHQUFSO1FBQ0UsNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFELENBQUM7SUFLTSxnQ0FBTSxHQUFiO1FBQUEsaUJBaUJDO1FBaEJDLE9BQU87YUFDSixPQUFPLENBQUM7WUFDUCxLQUFLLEVBQUUsZUFBZTtZQUN0QixPQUFPLEVBQUUsa0NBQWtDO1lBQzNDLGdCQUFnQixFQUFFLFFBQVE7WUFFMUIsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFBLE1BQU07WUFDViw2QkFBNkI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDM0QsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZCQUFHLEdBQUg7UUFBQSxpQkFjQztRQWJDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUNsQixJQUFJLENBQUMsRUFBRSxFQUNQLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQztRQUNGLElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQVk7WUFDakQsS0FBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsZ0NBQU0sR0FBTixVQUFPLElBQVU7UUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdEMsS0FBSyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQVUsR0FBVixVQUFXLEVBQVU7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBOURVLGVBQWU7UUFMM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1NBQ3JDLENBQUM7eUNBaUJrQix5QkFBZ0I7WUFDUCxrQ0FBZTtPQWpCL0IsZUFBZSxDQStEM0I7SUFBRCxzQkFBQztDQUFBLEFBL0RELElBK0RDO0FBL0RZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGEgfSBmcm9tICd+L2NvbXBvbmVudHMvbW9kZWxzL2RhdGEubW9kZWwnO1xuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSAnfi9jb21wb25lbnRzL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2UnO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlJyk7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gJ3VpL2RpYWxvZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICducy1zZWN1cmUnLFxuICB0ZW1wbGF0ZVVybDogJ3NlY3VyZS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU2VjdXJlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBkYXRlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGltYWdlcGF0aDogc3RyaW5nO1xuICBVSUQ6IHN0cmluZztcblxuICBwdWJsaWMgZGF0YTogRGF0YTtcbiAgcHVibGljIGRhdGFzJDogT2JzZXJ2YWJsZTxhbnk+O1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgb25pbml0Jyk7XG4gICAgdGhpcy5kYXRhcyQgPSA8YW55PnRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldE15V2lzaExpc3QoKTtcbiAgfVxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxuICApIHt9XG4gIHB1YmxpYyBsb2dvdXQoKSB7XG4gICAgZGlhbG9nc1xuICAgICAgLmNvbmZpcm0oe1xuICAgICAgICB0aXRsZTogJ0NvbmZpcm0gTG9ndXQnLFxuICAgICAgICBtZXNzYWdlOiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIExvZ291dD8nLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsJyxcblxuICAgICAgICBva0J1dHRvblRleHQ6ICdPaydcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAvLyByZXN1bHQgYXJndW1lbnQgaXMgYm9vbGVhblxuICAgICAgICBjb25zb2xlLmxvZygnRGlhbG9nIHJlc3VsdDogJyArIHJlc3VsdCk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBhZGQoKSB7XG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGEoXG4gICAgICB0aGlzLmlkLFxuICAgICAgdGhpcy5uYW1lLFxuICAgICAgdGhpcy5kYXRlLFxuICAgICAgdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIHRoaXMuaW1hZ2VwYXRoLFxuICAgICAgdGhpcy5VSURcbiAgICApO1xuICAgIGxldCBteVRvZG86IHN0cmluZyA9IHRoaXMuZGF0YS5uYW1lO1xuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmFkZChteVRvZG8pLnRoZW4oKG1lc3NhZ2U6IGFueSkgPT4ge1xuICAgICAgdGhpcy5uYW1lID0gJyc7XG4gICAgICBhbGVydChtZXNzYWdlKTtcbiAgICB9KTtcbiAgfVxuICBkZWxldGUoZGF0YTogRGF0YSkge1xuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmRlbGV0ZShkYXRhKS5jYXRjaCgoKSA9PiB7XG4gICAgICBhbGVydCgnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZGVsZXRpbmcgYW4gaXRlbSBmcm9tIHlvdXIgbGlzdC4nKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZpZXdEZXRhaWwoaWQ6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKCdoZXJlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZScpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3NlY3VyZS1kZXRhaWwnLCBpZF0pO1xuICB9XG59XG4iXX0=