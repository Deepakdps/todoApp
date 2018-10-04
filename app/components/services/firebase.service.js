"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var backend_service_1 = require("./backend.service");
var firebase = require("nativescript-plugin-firebase");
var rxjs_1 = require("rxjs");
var FirebaseService = /** @class */ (function () {
    function FirebaseService(ngZone) {
        this.ngZone = ngZone;
        this.items = new rxjs_1.BehaviorSubject([]);
        this._allItems = [];
    }
    FirebaseService.prototype.register = function (user) {
        return firebase
            .createUser({
            email: user.email,
            password: user.password
        })
            .then(function (result) {
            return JSON.stringify(result);
        }, function (errorMessage) {
            alert(errorMessage);
        });
    };
    FirebaseService.prototype.login = function (user) {
        return firebase
            .login({
            type: firebase.LoginType.PASSWORD,
            email: user.email,
            password: user.password
        })
            .then(function (result) {
            backend_service_1.BackendService.token = result.uid;
            return JSON.stringify(result);
        }, function (errorMessage) {
            alert(errorMessage);
        });
    };
    FirebaseService.prototype.resetPassword = function (email) {
        return firebase
            .resetPassword({
            email: email
        })
            .then(function (result) {
            // alert(JSON.stringify(result));
            return JSON.stringify(result);
        }, function (errorMessage) {
            alert(errorMessage);
        })
            .catch(this.handleErrors);
    };
    FirebaseService.prototype.add = function (myTodo) {
        return firebase
            .push('/Todos', {
            name: myTodo,
            UID: backend_service_1.BackendService.token,
            date: 0 - Date.now()
        })
            .then(function (result) {
            return ' added :) ';
        }, function (errorMessage) {
            console.log(errorMessage);
        });
    };
    FirebaseService.prototype.delete = function (data) {
        return firebase.remove('/Todos/' + data.id + '').catch(this.handleErrors);
    };
    FirebaseService.prototype.getMyWishList = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            var path = 'Todos';
            var onValueEvent = function (snapshot) {
                _this.ngZone.run(function () {
                    console.log('snapshot', snapshot.value);
                    var results = _this.handleSnapshot(snapshot.value);
                    console.log(JSON.stringify(results));
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, "/" + path);
        });
    };
    FirebaseService.prototype.handleSnapshot = function (data) {
        //empty array, then refill and filter
        this._allItems = [];
        if (data) {
            for (var id in data) {
                var result = Object.assign({ id: id }, data[id]);
                if (backend_service_1.BackendService.token === result.UID) {
                    this._allItems.push(result);
                }
            }
            this.publishUpdates();
        }
        return this._allItems;
    };
    FirebaseService.prototype.publishUpdates = function () {
        // here, we sort must emit a *new* value (immutability!)
        this._allItems.sort(function (a, b) {
            if (a.date < b.date)
                return -1;
            if (a.date > b.date)
                return 1;
            return 0;
        });
        this.items.next(this._allItems.slice());
    };
    FirebaseService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error));
        return Promise.reject(error.message);
    };
    FirebaseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBbUQ7QUFDbkQscURBQW1EO0FBQ25ELHVEQUEwRDtBQUUxRCw2QkFBbUQ7QUFJbkQ7SUFFRSx5QkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFEbEMsVUFBSyxHQUFpQyxJQUFJLHNCQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFHdEQsY0FBUyxHQUFnQixFQUFFLENBQUM7SUFGQyxDQUFDO0lBR3RDLGtDQUFRLEdBQVIsVUFBUyxJQUFVO1FBQ2pCLE1BQU0sQ0FBQyxRQUFRO2FBQ1osVUFBVSxDQUFDO1lBQ1YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO2FBQ0QsSUFBSSxDQUNILFVBQVMsTUFBVztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQ0QsVUFBUyxZQUFpQjtZQUN4QixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRUQsK0JBQUssR0FBTCxVQUFNLElBQVU7UUFDZCxNQUFNLENBQUMsUUFBUTthQUNaLEtBQUssQ0FBQztZQUNMLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7WUFDakMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO2FBQ0QsSUFBSSxDQUNILFVBQUMsTUFBVztZQUNWLGdDQUFjLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFD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Z0JBQzlCLENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsd0NBQWMsR0FBZDtRQUNFLHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUssSUFBSSxDQUFDLFNBQVMsU0FBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxzQ0FBWSxHQUFaLFVBQWEsS0FBSztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQXhIVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBR2lCLGFBQU07T0FGdkIsZUFBZSxDQXlIM0I7SUFBRCxzQkFBQztDQUFBLEFBekhELElBeUhDO0FBekhZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYWNrZW5kU2VydmljZSB9IGZyb20gJy4vYmFja2VuZC5zZXJ2aWNlJztcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnKTtcbmltcG9ydCB7IFVzZXIgfSBmcm9tICd+L2NvbXBvbmVudHMvbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnfi9jb21wb25lbnRzL21vZGVscy9kYXRhLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpcmViYXNlU2VydmljZSB7XG4gIGl0ZW1zOiBCZWhhdmlvclN1YmplY3Q8QXJyYXk8RGF0YT4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHt9XG5cbiAgcHJpdmF0ZSBfYWxsSXRlbXM6IEFycmF5PERhdGE+ID0gW107XG4gIHJlZ2lzdGVyKHVzZXI6IFVzZXIpIHtcbiAgICByZXR1cm4gZmlyZWJhc2VcbiAgICAgIC5jcmVhdGVVc2VyKHtcbiAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXG4gICAgICB9KVxuICAgICAgLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKHJlc3VsdDogYW55KSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVycm9yTWVzc2FnZTogYW55KSB7XG4gICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG4gIGxvZ2luKHVzZXI6IFVzZXIpIHtcbiAgICByZXR1cm4gZmlyZWJhc2VcbiAgICAgIC5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcbiAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXG4gICAgICB9KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgIEJhY2tlbmRTZXJ2aWNlLnRva2VuID0gcmVzdWx0LnVpZDtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuICByZXNldFBhc3N3b3JkKGVtYWlsKSB7XG4gICAgcmV0dXJuIGZpcmViYXNlXG4gICAgICAucmVzZXRQYXNzd29yZCh7XG4gICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgfSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAvLyBhbGVydChKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyb3JNZXNzYWdlOiBhbnkpIHtcbiAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICB9XG5cbiAgYWRkKG15VG9kbzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZpcmViYXNlXG4gICAgICAucHVzaCgnL1RvZG9zJywge1xuICAgICAgICBuYW1lOiBteVRvZG8sXG4gICAgICAgIFVJRDogQmFja2VuZFNlcnZpY2UudG9rZW4sXG4gICAgICAgIGRhdGU6IDAgLSBEYXRlLm5vdygpXG4gICAgICB9KVxuICAgICAgLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKHJlc3VsdDogYW55KSB7XG4gICAgICAgICAgcmV0dXJuICcgYWRkZWQgOikgJztcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyb3JNZXNzYWdlOiBhbnkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgZGVsZXRlKGRhdGE6IERhdGEpIHtcbiAgICByZXR1cm4gZmlyZWJhc2UucmVtb3ZlKCcvVG9kb3MvJyArIGRhdGEuaWQgKyAnJykuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICB9XG5cbiAgZ2V0TXlXaXNoTGlzdCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgbGV0IHBhdGggPSAnVG9kb3MnO1xuXG4gICAgICBsZXQgb25WYWx1ZUV2ZW50ID0gKHNuYXBzaG90OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc25hcHNob3QnLCBzbmFwc2hvdC52YWx1ZSk7XG4gICAgICAgICAgbGV0IHJlc3VsdHMgPSB0aGlzLmhhbmRsZVNuYXBzaG90KHNuYXBzaG90LnZhbHVlKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHRzKSk7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHRzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKG9uVmFsdWVFdmVudCwgYC8ke3BhdGh9YCk7XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTbmFwc2hvdChkYXRhOiBhbnkpIHtcbiAgICAvL2VtcHR5IGFycmF5LCB0aGVuIHJlZmlsbCBhbmQgZmlsdGVyXG4gICAgdGhpcy5fYWxsSXRlbXMgPSBbXTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgZm9yIChsZXQgaWQgaW4gZGF0YSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24oeyBpZDogaWQgfSwgZGF0YVtpZF0pO1xuICAgICAgICBpZiAoQmFja2VuZFNlcnZpY2UudG9rZW4gPT09IHJlc3VsdC5VSUQpIHtcbiAgICAgICAgICB0aGlzLl9hbGxJdGVtcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucHVibGlzaFVwZGF0ZXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2FsbEl0ZW1zO1xuICB9XG5cbiAgcHVibGlzaFVwZGF0ZXMoKSB7XG4gICAgLy8gaGVyZSwgd2Ugc29ydCBtdXN0IGVtaXQgYSAqbmV3KiB2YWx1ZSAoaW1tdXRhYmlsaXR5ISlcbiAgICB0aGlzLl9hbGxJdGVtcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIGlmIChhLmRhdGUgPCBiLmRhdGUpIHJldHVybiAtMTtcbiAgICAgIGlmIChhLmRhdGUgPiBiLmRhdGUpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gICAgdGhpcy5pdGVtcy5uZXh0KFsuLi50aGlzLl9hbGxJdGVtc10pO1xuICB9XG5cbiAgaGFuZGxlRXJyb3JzKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IubWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==