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
        localStorage.clear();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY3VyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0NBQW1EO0FBQ25ELHNEQUErRDtBQUcvRCx3REFBc0Q7QUFFdEQsNkRBQXNEO0FBQ3RELDJFQUF5RTtBQUN6RSxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQU96RDtJQVFFLHlCQUNVLE1BQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLE1BQWMsRUFDZCxlQUFnQztRQUhoQyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRXhDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBZkQsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBY00sZ0NBQU0sR0FBYjtRQUNFLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDZCQUFHLEdBQUg7UUFDRSxJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQVk7WUFDakQsbUJBQW1CO1lBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFoQ1UsZUFBZTtRQUwzQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx1QkFBdUI7U0FDckMsQ0FBQzt5Q0FVa0IseUJBQWdCO1lBQ1gsMEJBQVc7WUFDaEIsYUFBTTtZQUNHLGtDQUFlO09BWi9CLGVBQWUsQ0E2QzNCO0lBQUQsc0JBQUM7Q0FBQSxBQTdDRCxJQTZDQztBQTdDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSAnLi4vLi4vaXRlbS9pdGVtJztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vaXRlbS9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gJ34vY29tcG9uZW50cy9tb2RlbHMvZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tICd+L2NvbXBvbmVudHMvc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnKTtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbnMtc2VjdXJlJyxcbiAgdGVtcGxhdGVVcmw6ICdzZWN1cmUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNlY3VyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGRhdGE6IERhdGE7XG5cbiAgaXRlbXM6IEl0ZW1bXTtcbiAgbmFtZTogc3RyaW5nO1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICB9XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGEoKTtcbiAgICB0aGlzLmRhdGEuaWQgPSAnJztcbiAgICB0aGlzLmRhdGEuZGF0ZSA9ICcnO1xuICAgIHRoaXMuZGF0YS5kZXNjcmlwdGlvbiA9ICcnO1xuICAgIHRoaXMuZGF0YS5uYW1lID0gJyc7XG4gICAgdGhpcy5kYXRhLlVJRCA9ICcnO1xuICB9XG4gIHB1YmxpYyBsb2dvdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XG4gIH1cblxuICBhZGQoKSB7XG4gICAgbGV0IG15VG9kbzogc3RyaW5nID0gdGhpcy5uYW1lO1xuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmFkZChteVRvZG8pLnRoZW4oKG1lc3NhZ2U6IGFueSkgPT4ge1xuICAgICAgLy8gIHRoaXMubmFtZSA9IFwiXCI7XG4gICAgICBhbGVydChtZXNzYWdlKTtcbiAgICB9KTtcbiAgfVxuICAvLyBnZXRNeVRvZG9zKCk6IE9ic2VydmFibGU8YW55PiB7XG4gIC8vICAgcmV0dXJuIGZpcmViYXNlLnF1ZXJ5KCcvVG9kb3MnLCB7XG4gIC8vICAgICAvLyAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxuICAvLyAgICAgLy8gICAvLyBkZWZhdWx0IGZhbHNlLCBzbyBpdCBsaXN0ZW5zIGNvbnRpbnVvdXNseS5cbiAgLy8gICAgIC8vICAgLy8gT25seSB3aGVuIHRydWUsIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIGRhdGEgaW4gdGhlIHByb21pc2UgYXMgd2VsbCFcbiAgLy8gICAgIC8vICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gIC8vICAgICAvLyAgIG9yZGVyQnk6IHtcbiAgLy8gICAgIC8vICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxuICAvLyAgICAgLy8gICAgIHZhbHVlOiAnc2luY2UnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAvLyAgICAgLy8gICB9XG4gIC8vICAgfSk7XG4gIC8vIH1cbn1cbiJdfQ==