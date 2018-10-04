"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var data_model_1 = require("~/components/models/data.model");
var firebase_service_1 = require("~/components/services/firebase.service");
var firebase = require('nativescript-plugin-firebase');
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
        localStorage.clear();
        this.router.navigate(['/login'], { clearHistory: true });
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
        this.router.navigate(['/list-detail', id]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY3VyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsc0RBQStEO0FBSy9ELDZEQUFzRDtBQUN0RCwyRUFBeUU7QUFDekUsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFPekQ7SUFlRSx5QkFDVSxNQUF3QixFQUN4QixlQUFnQztRQURoQyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDdkMsQ0FBQztJQVJKLGtDQUFRLEdBQVI7UUFDRSw0Q0FBNEM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFRLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUtNLGdDQUFNLEdBQWI7UUFDRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw2QkFBRyxHQUFIO1FBQUEsaUJBY0M7UUFiQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksQ0FDbEIsSUFBSSxDQUFDLEVBQUUsRUFDUCxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsR0FBRyxDQUNULENBQUM7UUFDRixJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFZO1lBQ2pELEtBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGdDQUFNLEdBQU4sVUFBTyxJQUFVO1FBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3RDLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFVLEdBQVYsVUFBVyxFQUFVO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQS9DVSxlQUFlO1FBTDNCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHVCQUF1QjtTQUNyQyxDQUFDO3lDQWlCa0IseUJBQWdCO1lBQ1Asa0NBQWU7T0FqQi9CLGVBQWUsQ0FnRDNCO0lBQUQsc0JBQUM7Q0FBQSxBQWhERCxJQWdEQztBQWhEWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSAnLi4vLi4vaXRlbS9pdGVtJztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vaXRlbS9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gJ34vY29tcG9uZW50cy9tb2RlbHMvZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tICd+L2NvbXBvbmVudHMvc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnKTtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbnMtc2VjdXJlJyxcbiAgdGVtcGxhdGVVcmw6ICdzZWN1cmUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNlY3VyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgZGF0ZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBpbWFnZXBhdGg6IHN0cmluZztcbiAgVUlEOiBzdHJpbmc7XG5cbiAgcHVibGljIGRhdGE6IERhdGE7XG4gIHB1YmxpYyBkYXRhcyQ6IE9ic2VydmFibGU8YW55PjtcbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gdGhpcy5pdGVtcyA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbXMoKTtcbiAgICBjb25zb2xlLmxvZygnaW5zaWRlIG9uaW5pdCcpO1xuICAgIHRoaXMuZGF0YXMkID0gPGFueT50aGlzLmZpcmViYXNlU2VydmljZS5nZXRNeVdpc2hMaXN0KCk7XG4gIH1cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2VcbiAgKSB7fVxuICBwdWJsaWMgbG9nb3V0KCkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICB9XG5cbiAgYWRkKCkge1xuICAgIHRoaXMuZGF0YSA9IG5ldyBEYXRhKFxuICAgICAgdGhpcy5pZCxcbiAgICAgIHRoaXMubmFtZSxcbiAgICAgIHRoaXMuZGF0ZSxcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICB0aGlzLmltYWdlcGF0aCxcbiAgICAgIHRoaXMuVUlEXG4gICAgKTtcbiAgICBsZXQgbXlUb2RvOiBzdHJpbmcgPSB0aGlzLmRhdGEubmFtZTtcbiAgICB0aGlzLmZpcmViYXNlU2VydmljZS5hZGQobXlUb2RvKS50aGVuKChtZXNzYWdlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMubmFtZSA9ICcnO1xuICAgICAgYWxlcnQobWVzc2FnZSk7XG4gICAgfSk7XG4gIH1cbiAgZGVsZXRlKGRhdGE6IERhdGEpIHtcbiAgICB0aGlzLmZpcmViYXNlU2VydmljZS5kZWxldGUoZGF0YSkuY2F0Y2goKCkgPT4ge1xuICAgICAgYWxlcnQoJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGRlbGV0aW5nIGFuIGl0ZW0gZnJvbSB5b3VyIGxpc3QuJyk7XG4gICAgfSk7XG4gIH1cblxuICB2aWV3RGV0YWlsKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9saXN0LWRldGFpbCcsIGlkXSk7XG4gIH1cbn1cbiJdfQ==