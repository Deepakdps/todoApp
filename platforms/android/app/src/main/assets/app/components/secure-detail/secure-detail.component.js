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
            alert(result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLWRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWN1cmUtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzQ0FBbUQ7QUFLbkQsMkVBQXlFO0FBQ3pFLHNEQUFxRDtBQUNyRCwwQ0FBeUQ7QUFDekQsMENBQTJDO0FBTzNDO0lBV0UsK0JBQ1UsS0FBVyxFQUNYLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxNQUFjLEVBQ2QsZUFBZ0MsRUFDaEMsUUFBa0I7UUFMbEIsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDekIsQ0FBQztJQUNKLHdDQUFRLEdBQVI7UUFBQSxpQkFxQkM7UUFwQkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBVztZQUNqRCxLQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtnQkFDcEQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7b0JBQ2QsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsT0FBTzt3QkFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDbEIsS0FBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3ZCLENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQ3BCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QixDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDOzRCQUMzQixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDaEMsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx3Q0FBUSxHQUFSLFVBQVMsRUFBVTtRQUFuQixpQkFZQztRQVhDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMvQyxVQUFDLE1BQVc7WUFDVixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkIsQ0FBQztRQUNILENBQUMsRUFDRCxVQUFDLEtBQVU7WUFDVCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDZixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFDRCxzQ0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBekRVLHFCQUFxQjtRQUxqQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLDhCQUE4QjtTQUM1QyxDQUFDO3lDQWFpQixXQUFJO1lBQ0osdUJBQWM7WUFDYixlQUFNO1lBQ04sYUFBTTtZQUNHLGtDQUFlO1lBQ3RCLGlCQUFRO09BakJqQixxQkFBcUIsQ0EwRGpDO0lBQUQsNEJBQUM7Q0FBQSxBQTFERCxJQTBEQztBQTFEWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gJ34vY29tcG9uZW50cy9tb2RlbHMvZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tICd+L2NvbXBvbmVudHMvc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ25zLXNlY3VyZS1kZXRhaWwnLFxuICB0ZW1wbGF0ZVVybDogJ3NlY3VyZS1kZXRhaWwuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNlY3VyZURldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaW1hZ2VwYXRoOiBzdHJpbmc7XG4gIGltYWdlOiBhbnk7XG4gIHByaXZhdGUgc3ViOiBhbnk7XG4gIHByaXZhdGUgaW1hZ2VQYXRoOiBzdHJpbmc7XG4gIHByaXZhdGUgdXBsb2FkZWRJbWFnZU5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSB1cGxvYWRlZEltYWdlUGF0aDogc3RyaW5nO1xuICBwdWJsaWMgZ2lmdDogT2JzZXJ2YWJsZTxhbnk+O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uXG4gICkge31cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKChwYXJhbXM6IGFueSkgPT4ge1xuICAgICAgdGhpcy5pZCA9IHBhcmFtc1snaWQnXTtcbiAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldE15VG9kbyh0aGlzLmlkKS5zdWJzY3JpYmUoZ2lmdCA9PiB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBnaWZ0KSB7XG4gICAgICAgICAgICAvL3Byb3BzXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2lkJykge1xuICAgICAgICAgICAgICB0aGlzLmlkID0gZ2lmdFtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnbmFtZScpIHtcbiAgICAgICAgICAgICAgdGhpcy5uYW1lID0gZ2lmdFtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnZGVzY3JpcHRpb24nKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBnaWZ0W3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXRUb2RvKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmZpcmViYXNlU2VydmljZS5lZGl0TmFtZShpZCwgdGhpcy5uYW1lKS50aGVuKFxuICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlc3VsdCk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG4gIGNhbmNlbCgpIHtcbiAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgfVxufVxuIl19