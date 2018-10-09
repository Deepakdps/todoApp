"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var firebase_service_1 = require("~/components/services/firebase.service");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var SecureDetailComponent = /** @class */ (function () {
    function SecureDetailComponent(_page, route, router, ngZone, firebaseService, location) {
        this._page = _page;
        this.route = route;
        this.router = router;
        this.ngZone = ngZone;
        this.firebaseService = firebaseService;
        this.location = location;
    }
    SecureDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.actionBarHidden = true;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.firebaseService.getMyTodo(_this.id).subscribe(function (gift) {
                _this.ngZone.run(function () {
                    for (var prop in gift) {
                        //props
                        if (prop === 'id') {
                            _this.id = gift[prop];
                        }
                        if (prop === 'name') {
                            _this.name = gift[prop];
                        }
                        if (prop === 'description') {
                            _this.description = gift[prop];
                        }
                    }
                });
            });
        });
    };
    SecureDetailComponent.prototype.editTodo = function (id) {
        var _this = this;
        this.firebaseService.editName(id, this.name).then(function (result) {
            console.log(result);
            if (result) {
                _this.location.back();
            }
        }, function (error) {
            alert(error);
        });
    };
    SecureDetailComponent.prototype.cancel = function () {
        this.location.back();
    };
    SecureDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-secure-detail',
            templateUrl: 'secure-detail.component.html'
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.ActivatedRoute,
            router_1.Router,
            core_2.NgZone,
            firebase_service_1.FirebaseService,
            common_1.Location])
    ], SecureDetailComponent);
    return SecureDetailComponent;
}());
exports.SecureDetailComponent = SecureDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLWRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWN1cmUtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzQ0FBbUQ7QUFLbkQsMkVBQXlFO0FBQ3pFLHNEQUFxRDtBQUNyRCwwQ0FBeUQ7QUFDekQsMENBQTJDO0FBTzNDO0lBV0UsK0JBQ1UsS0FBVyxFQUNYLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxNQUFjLEVBQ2QsZUFBZ0MsRUFDaEMsUUFBa0I7UUFMbEIsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDekIsQ0FBQztJQUNKLHdDQUFRLEdBQVI7UUFBQSxpQkFxQkM7UUFwQkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBVztZQUNqRCxLQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtnQkFDcEQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7b0JBQ2QsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsT0FBTzt3QkFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDbEIsS0FBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3ZCLENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQ3BCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QixDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDOzRCQUMzQixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDaEMsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx3Q0FBUSxHQUFSLFVBQVMsRUFBVTtRQUFuQixpQkFZQztRQVhDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMvQyxVQUFDLE1BQVc7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixDQUFDO1FBQ0gsQ0FBQyxFQUNELFVBQUMsS0FBVTtZQUNULEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUNELHNDQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUF6RFUscUJBQXFCO1FBTGpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsOEJBQThCO1NBQzVDLENBQUM7eUNBYWlCLFdBQUk7WUFDSix1QkFBYztZQUNiLGVBQU07WUFDTixhQUFNO1lBQ0csa0NBQWU7WUFDdEIsaUJBQVE7T0FqQmpCLHFCQUFxQixDQTBEakM7SUFBRCw0QkFBQztDQUFBLEFBMURELElBMERDO0FBMURZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnfi9jb21wb25lbnRzL21vZGVscy9kYXRhLm1vZGVsJztcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gJ34vY29tcG9uZW50cy9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbnMtc2VjdXJlLWRldGFpbCcsXG4gIHRlbXBsYXRlVXJsOiAnc2VjdXJlLWRldGFpbC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU2VjdXJlRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBpbWFnZXBhdGg6IHN0cmluZztcbiAgaW1hZ2U6IGFueTtcbiAgcHJpdmF0ZSBzdWI6IGFueTtcbiAgcHJpdmF0ZSBpbWFnZVBhdGg6IHN0cmluZztcbiAgcHJpdmF0ZSB1cGxvYWRlZEltYWdlTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIHVwbG9hZGVkSW1hZ2VQYXRoOiBzdHJpbmc7XG4gIHB1YmxpYyBnaWZ0OiBPYnNlcnZhYmxlPGFueT47XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb25cbiAgKSB7fVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUoKHBhcmFtczogYW55KSA9PiB7XG4gICAgICB0aGlzLmlkID0gcGFyYW1zWydpZCddO1xuICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0TXlUb2RvKHRoaXMuaWQpLnN1YnNjcmliZShnaWZ0ID0+IHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGdpZnQpIHtcbiAgICAgICAgICAgIC8vcHJvcHNcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnaWQnKSB7XG4gICAgICAgICAgICAgIHRoaXMuaWQgPSBnaWZ0W3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICduYW1lJykge1xuICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBnaWZ0W3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdkZXNjcmlwdGlvbicpIHtcbiAgICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGdpZnRbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZWRpdFRvZG8oaWQ6IHN0cmluZykge1xuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmVkaXROYW1lKGlkLCB0aGlzLm5hbWUpLnRoZW4oXG4gICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgYWxlcnQoZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbiAgY2FuY2VsKCkge1xuICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICB9XG59XG4iXX0=