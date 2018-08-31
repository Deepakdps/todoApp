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
        // this.items = this.itemService.getItems();
        this.items$ = this.getMyTodos();
    };
    SecureComponent.prototype.logout = function () {
        this.router.navigate(['/login']);
    };
    SecureComponent.prototype.getMyTodos = function () {
        return firebase.query('/Todos', {});
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY3VyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0NBQW1EO0FBQ25ELHNEQUErRDtBQUcvRCx3REFBc0Q7QUFFdEQsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFPekQ7SUFRRSx5QkFDVSxNQUF3QixFQUN4QixXQUF3QixFQUN4QixNQUFjO1FBRmQsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUNyQixDQUFDO0lBUkosa0NBQVEsR0FBUjtRQUNFLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFRLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBTU0sZ0NBQU0sR0FBYjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0Qsb0NBQVUsR0FBVjtRQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQVMvQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNkJBQUcsR0FBSDtRQUNFLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDL0MsVUFBUyxNQUFXO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxDQUFDLEVBQ0QsVUFBUyxZQUFpQjtZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXRDVSxlQUFlO1FBTDNCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHVCQUF1QjtTQUNyQyxDQUFDO3lDQVVrQix5QkFBZ0I7WUFDWCwwQkFBVztZQUNoQixhQUFNO09BWGIsZUFBZSxDQXVDM0I7SUFBRCxzQkFBQztDQUFBLEFBdkNELElBdUNDO0FBdkNZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IEl0ZW0gfSBmcm9tICcuLi8uLi9pdGVtL2l0ZW0nO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi9pdGVtL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnKTtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbnMtc2VjdXJlJyxcbiAgdGVtcGxhdGVVcmw6ICdzZWN1cmUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNlY3VyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBpdGVtcyQ6IE9ic2VydmFibGU8YW55PjtcbiAgbmFtZTogU3RyaW5nO1xuICBfYWxsSXRlbXM6IGFueVtdO1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyB0aGlzLml0ZW1zID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtcygpO1xuICAgIHRoaXMuaXRlbXMkID0gPGFueT50aGlzLmdldE15VG9kb3MoKTtcbiAgfVxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICApIHt9XG4gIHB1YmxpYyBsb2dvdXQoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XG4gIH1cbiAgZ2V0TXlUb2RvcygpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBmaXJlYmFzZS5xdWVyeSgnL1RvZG9zJywge1xuICAgICAgLy8gICAvLyBzZXQgdGhpcyB0byB0cnVlIGlmIHlvdSB3YW50IHRvIGNoZWNrIGlmIHRoZSB2YWx1ZSBleGlzdHMgb3IganVzdCB3YW50IHRoZSBldmVudCB0byBmaXJlIG9uY2VcbiAgICAgIC8vICAgLy8gZGVmYXVsdCBmYWxzZSwgc28gaXQgbGlzdGVucyBjb250aW51b3VzbHkuXG4gICAgICAvLyAgIC8vIE9ubHkgd2hlbiB0cnVlLCB0aGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSBkYXRhIGluIHRoZSBwcm9taXNlIGFzIHdlbGwhXG4gICAgICAvLyAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgLy8gICBvcmRlckJ5OiB7XG4gICAgICAvLyAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcbiAgICAgIC8vICAgICB2YWx1ZTogJ3NpbmNlJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgIC8vICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkKCkge1xuICAgIGZpcmViYXNlLnB1c2goJy9Ub2RvcycsIHsgbmFtZTogdGhpcy5uYW1lIH0pLnRoZW4oXG4gICAgICBmdW5jdGlvbihyZXN1bHQ6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBrZXk6ICcgKyByZXN1bHQua2V5KTtcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbihlcnJvck1lc3NhZ2U6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==