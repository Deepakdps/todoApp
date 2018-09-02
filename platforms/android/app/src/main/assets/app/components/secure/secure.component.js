"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var item_service_1 = require("../../item/item.service");
var data_model_1 = require("~/components/models/data.model");
var firebase_service_1 = require("~/components/services/firebase.service");
var firebase = require('nativescript-plugin-firebase');
var SecureComponent = /** @class */ (function () {
    function SecureComponent(router, itemService, ngZone, firebaseService) {
        this.router = router;
        this.itemService = itemService;
        this.ngZone = ngZone;
        this.firebaseService = firebaseService;
        this.data = new data_model_1.Data();
        this.data.id = '';
        this.data.date = '';
        this.data.description = '';
        this.data.name = '';
        this.data.UID = '';
    }
    SecureComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    SecureComponent.prototype.logout = function () {
        this.router.navigate(['/login']);
    };
    SecureComponent.prototype.add = function () {
        var myTodo = this.name;
        this.firebaseService.add(myTodo).then(function (message) {
            //  this.name = "";
            alert(message);
        });
    };
    SecureComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-secure',
            templateUrl: 'secure.component.html'
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            item_service_1.ItemService,
            core_2.NgZone,
            firebase_service_1.FirebaseService])
    ], SecureComponent);
    return SecureComponent;
}());
exports.SecureComponent = SecureComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY3VyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0NBQW1EO0FBQ25ELHNEQUErRDtBQUcvRCx3REFBc0Q7QUFFdEQsNkRBQXNEO0FBQ3RELDJFQUF5RTtBQUN6RSxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQU96RDtJQVFFLHlCQUNVLE1BQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLE1BQWMsRUFDZCxlQUFnQztRQUhoQyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRXhDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBZkQsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBY00sZ0NBQU0sR0FBYjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNkJBQUcsR0FBSDtRQUNFLElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBWTtZQUNqRCxtQkFBbUI7WUFDbkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQS9CVSxlQUFlO1FBTDNCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHVCQUF1QjtTQUNyQyxDQUFDO3lDQVVrQix5QkFBZ0I7WUFDWCwwQkFBVztZQUNoQixhQUFNO1lBQ0csa0NBQWU7T0FaL0IsZUFBZSxDQTRDM0I7SUFBRCxzQkFBQztDQUFBLEFBNUNELElBNENDO0FBNUNZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IEl0ZW0gfSBmcm9tICcuLi8uLi9pdGVtL2l0ZW0nO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi9pdGVtL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnfi9jb21wb25lbnRzL21vZGVscy9kYXRhLm1vZGVsJztcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gJ34vY29tcG9uZW50cy9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICducy1zZWN1cmUnLFxuICB0ZW1wbGF0ZVVybDogJ3NlY3VyZS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU2VjdXJlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZGF0YTogRGF0YTtcblxuICBpdGVtczogSXRlbVtdO1xuICBuYW1lOiBzdHJpbmc7XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gIH1cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgaXRlbVNlcnZpY2U6IEl0ZW1TZXJ2aWNlLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxuICApIHtcbiAgICB0aGlzLmRhdGEgPSBuZXcgRGF0YSgpO1xuICAgIHRoaXMuZGF0YS5pZCA9ICcnO1xuICAgIHRoaXMuZGF0YS5kYXRlID0gJyc7XG4gICAgdGhpcy5kYXRhLmRlc2NyaXB0aW9uID0gJyc7XG4gICAgdGhpcy5kYXRhLm5hbWUgPSAnJztcbiAgICB0aGlzLmRhdGEuVUlEID0gJyc7XG4gIH1cbiAgcHVibGljIGxvZ291dCgpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcbiAgfVxuXG4gIGFkZCgpIHtcbiAgICBsZXQgbXlUb2RvOiBzdHJpbmcgPSB0aGlzLm5hbWU7XG4gICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuYWRkKG15VG9kbykudGhlbigobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAvLyAgdGhpcy5uYW1lID0gXCJcIjtcbiAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9XG4gIC8vIGdldE15VG9kb3MoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgLy8gICByZXR1cm4gZmlyZWJhc2UucXVlcnkoJy9Ub2RvcycsIHtcbiAgLy8gICAgIC8vICAgLy8gc2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBjaGVjayBpZiB0aGUgdmFsdWUgZXhpc3RzIG9yIGp1c3Qgd2FudCB0aGUgZXZlbnQgdG8gZmlyZSBvbmNlXG4gIC8vICAgICAvLyAgIC8vIGRlZmF1bHQgZmFsc2UsIHNvIGl0IGxpc3RlbnMgY29udGludW91c2x5LlxuICAvLyAgICAgLy8gICAvLyBPbmx5IHdoZW4gdHJ1ZSwgdGhpcyBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgZGF0YSBpbiB0aGUgcHJvbWlzZSBhcyB3ZWxsIVxuICAvLyAgICAgLy8gICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgLy8gICAgIC8vICAgb3JkZXJCeToge1xuICAvLyAgICAgLy8gICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXG4gIC8vICAgICAvLyAgICAgdmFsdWU6ICdzaW5jZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXG4gIC8vICAgICAvLyAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfVxufVxuIl19