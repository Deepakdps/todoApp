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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY3VyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsc0RBQStEO0FBSy9ELDZEQUFzRDtBQUN0RCwyRUFBeUU7QUFDekUsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFPekQ7SUFjRSx5QkFDVSxNQUF3QixFQUN4QixlQUFnQztRQURoQyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDdkMsQ0FBQztJQVBKLGtDQUFRLEdBQVI7UUFDRSw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFELENBQUM7SUFLTSxnQ0FBTSxHQUFiO1FBQ0UsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsNkJBQUcsR0FBSDtRQUFBLGlCQWNDO1FBYkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLENBQ2xCLElBQUksQ0FBQyxFQUFFLEVBQ1AsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxTQUFTLEVBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFDO1FBQ0YsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBWTtZQUNqRCxLQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxnQ0FBTSxHQUFOLFVBQU8sSUFBVTtRQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUN0QyxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUExQ1UsZUFBZTtRQUwzQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx1QkFBdUI7U0FDckMsQ0FBQzt5Q0FnQmtCLHlCQUFnQjtZQUNQLGtDQUFlO09BaEIvQixlQUFlLENBMkMzQjtJQUFELHNCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7QUEzQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gJy4uLy4uL2l0ZW0vaXRlbSc7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uL2l0ZW0vaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGEgfSBmcm9tICd+L2NvbXBvbmVudHMvbW9kZWxzL2RhdGEubW9kZWwnO1xuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSAnfi9jb21wb25lbnRzL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2UnO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlJyk7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ25zLXNlY3VyZScsXG4gIHRlbXBsYXRlVXJsOiAnc2VjdXJlLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBTZWN1cmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGRhdGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaW1hZ2VwYXRoOiBzdHJpbmc7XG4gIFVJRDogc3RyaW5nO1xuXG4gIHB1YmxpYyBkYXRhOiBEYXRhO1xuICBwdWJsaWMgZGF0YXMkOiBPYnNlcnZhYmxlPGFueT47XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCk7XG4gICAgdGhpcy5kYXRhcyQgPSA8YW55PnRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldE15V2lzaExpc3QoKTtcbiAgfVxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxuICApIHt9XG4gIHB1YmxpYyBsb2dvdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gIH1cblxuICBhZGQoKSB7XG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGEoXG4gICAgICB0aGlzLmlkLFxuICAgICAgdGhpcy5uYW1lLFxuICAgICAgdGhpcy5kYXRlLFxuICAgICAgdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIHRoaXMuaW1hZ2VwYXRoLFxuICAgICAgdGhpcy5VSURcbiAgICApO1xuICAgIGxldCBteVRvZG86IHN0cmluZyA9IHRoaXMuZGF0YS5uYW1lO1xuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmFkZChteVRvZG8pLnRoZW4oKG1lc3NhZ2U6IGFueSkgPT4ge1xuICAgICAgdGhpcy5uYW1lID0gJyc7XG4gICAgICBhbGVydChtZXNzYWdlKTtcbiAgICB9KTtcbiAgfVxuICBkZWxldGUoZGF0YTogRGF0YSkge1xuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmRlbGV0ZShkYXRhKS5jYXRjaCgoKSA9PiB7XG4gICAgICBhbGVydCgnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZGVsZXRpbmcgYW4gaXRlbSBmcm9tIHlvdXIgbGlzdC4nKTtcbiAgICB9KTtcbiAgfVxufVxuIl19