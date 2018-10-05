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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY3VyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsc0RBQStEO0FBRy9ELDZEQUFzRDtBQUN0RCwyRUFBeUU7QUFDekUsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFPekQ7SUFlRSx5QkFDVSxNQUF3QixFQUN4QixlQUFnQztRQURoQyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDdkMsQ0FBQztJQVJKLGtDQUFRLEdBQVI7UUFDRSw0Q0FBNEM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFRLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUtNLGdDQUFNLEdBQWI7UUFDRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw2QkFBRyxHQUFIO1FBQUEsaUJBY0M7UUFiQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksQ0FDbEIsSUFBSSxDQUFDLEVBQUUsRUFDUCxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsR0FBRyxDQUNULENBQUM7UUFDRixJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFZO1lBQ2pELEtBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGdDQUFNLEdBQU4sVUFBTyxJQUFVO1FBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3RDLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFVLEdBQVYsVUFBVyxFQUFVO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQS9DVSxlQUFlO1FBTDNCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHVCQUF1QjtTQUNyQyxDQUFDO3lDQWlCa0IseUJBQWdCO1lBQ1Asa0NBQWU7T0FqQi9CLGVBQWUsQ0FnRDNCO0lBQUQsc0JBQUM7Q0FBQSxBQWhERCxJQWdEQztBQWhEWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnfi9jb21wb25lbnRzL21vZGVscy9kYXRhLm1vZGVsJztcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gJ34vY29tcG9uZW50cy9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICducy1zZWN1cmUnLFxuICB0ZW1wbGF0ZVVybDogJ3NlY3VyZS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU2VjdXJlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBkYXRlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGltYWdlcGF0aDogc3RyaW5nO1xuICBVSUQ6IHN0cmluZztcblxuICBwdWJsaWMgZGF0YTogRGF0YTtcbiAgcHVibGljIGRhdGFzJDogT2JzZXJ2YWJsZTxhbnk+O1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgb25pbml0Jyk7XG4gICAgdGhpcy5kYXRhcyQgPSA8YW55PnRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldE15V2lzaExpc3QoKTtcbiAgfVxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxuICApIHt9XG4gIHB1YmxpYyBsb2dvdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gIH1cblxuICBhZGQoKSB7XG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGEoXG4gICAgICB0aGlzLmlkLFxuICAgICAgdGhpcy5uYW1lLFxuICAgICAgdGhpcy5kYXRlLFxuICAgICAgdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIHRoaXMuaW1hZ2VwYXRoLFxuICAgICAgdGhpcy5VSURcbiAgICApO1xuICAgIGxldCBteVRvZG86IHN0cmluZyA9IHRoaXMuZGF0YS5uYW1lO1xuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmFkZChteVRvZG8pLnRoZW4oKG1lc3NhZ2U6IGFueSkgPT4ge1xuICAgICAgdGhpcy5uYW1lID0gJyc7XG4gICAgICBhbGVydChtZXNzYWdlKTtcbiAgICB9KTtcbiAgfVxuICBkZWxldGUoZGF0YTogRGF0YSkge1xuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmRlbGV0ZShkYXRhKS5jYXRjaCgoKSA9PiB7XG4gICAgICBhbGVydCgnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZGVsZXRpbmcgYW4gaXRlbSBmcm9tIHlvdXIgbGlzdC4nKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZpZXdEZXRhaWwoaWQ6IHN0cmluZykge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QtZGV0YWlsJywgaWRdKTtcbiAgfVxufVxuIl19