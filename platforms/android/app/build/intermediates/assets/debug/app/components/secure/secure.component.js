"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var item_service_1 = require("../../item/item.service");
var firebase = require('nativescript-plugin-firebase');
var SecureComponent = /** @class */ (function () {
    function SecureComponent(router, itemService, ngZone) {
        this.router = router;
        this.itemService = itemService;
        this.ngZone = ngZone;
    }
    SecureComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    SecureComponent.prototype.logout = function () {
        this.router.navigate(['/login']);
    };
    // getMyTodos(): Observable<any> {
    //   return firebase.query('/Todos', {
    //     //   // set this to true if you want to check if the value exists or just want the event to fire once
    //     //   // default false, so it listens continuously.
    //     //   // Only when true, this function will return the data in the promise as well!
    //     //   singleEvent: true,
    //     //   orderBy: {
    //     //     type: firebase.QueryOrderByType.CHILD,
    //     //     value: 'since' // mandatory when type is 'child'
    //     //   }
    //   });
    // }
    SecureComponent.prototype.add = function () {
        firebase.push('/Todos', { name: this.name }).then(function (result) {
            console.log('created key: ' + result.key);
        }, function (errorMessage) {
            console.log(errorMessage);
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
            core_2.NgZone])
    ], SecureComponent);
    return SecureComponent;
}());
exports.SecureComponent = SecureComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY3VyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0NBQW1EO0FBQ25ELHNEQUErRDtBQUcvRCx3REFBc0Q7QUFFdEQsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFPekQ7SUFRRSx5QkFDVSxNQUF3QixFQUN4QixXQUF3QixFQUN4QixNQUFjO1FBRmQsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUNyQixDQUFDO0lBUEosa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBTU0sZ0NBQU0sR0FBYjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0Qsa0NBQWtDO0lBQ2xDLHNDQUFzQztJQUN0Qyw0R0FBNEc7SUFDNUcseURBQXlEO0lBQ3pELHlGQUF5RjtJQUN6Riw4QkFBOEI7SUFDOUIsc0JBQXNCO0lBQ3RCLG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsYUFBYTtJQUNiLFFBQVE7SUFDUixJQUFJO0lBRUosNkJBQUcsR0FBSDtRQUNFLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDL0MsVUFBUyxNQUFXO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxDQUFDLEVBQ0QsVUFBUyxZQUFpQjtZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXRDVSxlQUFlO1FBTDNCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHVCQUF1QjtTQUNyQyxDQUFDO3lDQVVrQix5QkFBZ0I7WUFDWCwwQkFBVztZQUNoQixhQUFNO09BWGIsZUFBZSxDQXVDM0I7SUFBRCxzQkFBQztDQUFBLEFBdkNELElBdUNDO0FBdkNZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IEl0ZW0gfSBmcm9tICcuLi8uLi9pdGVtL2l0ZW0nO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi9pdGVtL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnKTtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbnMtc2VjdXJlJyxcbiAgdGVtcGxhdGVVcmw6ICdzZWN1cmUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNlY3VyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vIHB1YmxpYyBpdGVtcyQ6IE9ic2VydmFibGU8YW55PjtcbiAgbmFtZTogU3RyaW5nO1xuICBfYWxsSXRlbXM6IGFueVtdO1xuICBpdGVtczogSXRlbVtdO1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICB9XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXG4gICkge31cbiAgcHVibGljIGxvZ291dCgpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcbiAgfVxuICAvLyBnZXRNeVRvZG9zKCk6IE9ic2VydmFibGU8YW55PiB7XG4gIC8vICAgcmV0dXJuIGZpcmViYXNlLnF1ZXJ5KCcvVG9kb3MnLCB7XG4gIC8vICAgICAvLyAgIC8vIHNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGV4aXN0cyBvciBqdXN0IHdhbnQgdGhlIGV2ZW50IHRvIGZpcmUgb25jZVxuICAvLyAgICAgLy8gICAvLyBkZWZhdWx0IGZhbHNlLCBzbyBpdCBsaXN0ZW5zIGNvbnRpbnVvdXNseS5cbiAgLy8gICAgIC8vICAgLy8gT25seSB3aGVuIHRydWUsIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIGRhdGEgaW4gdGhlIHByb21pc2UgYXMgd2VsbCFcbiAgLy8gICAgIC8vICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gIC8vICAgICAvLyAgIG9yZGVyQnk6IHtcbiAgLy8gICAgIC8vICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxuICAvLyAgICAgLy8gICAgIHZhbHVlOiAnc2luY2UnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAvLyAgICAgLy8gICB9XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICBhZGQoKSB7XG4gICAgZmlyZWJhc2UucHVzaCgnL1RvZG9zJywgeyBuYW1lOiB0aGlzLm5hbWUgfSkudGhlbihcbiAgICAgIGZ1bmN0aW9uKHJlc3VsdDogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGtleTogJyArIHJlc3VsdC5rZXkpO1xuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uKGVycm9yTWVzc2FnZTogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl19