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
                    // console.log('snapshot', snapshot.value);
                    var results = _this.handleSnapshot(snapshot.value);
                    // console.log(JSON.stringify(results));
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, "/" + path);
        });
    };
    FirebaseService.prototype.getMyTodo = function (id) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            observer.next(_this._allItems.filter(function (s) { return s.id === id; })[0]);
        });
    };
    FirebaseService.prototype.editName = function (id, name) {
        this.publishUpdates();
        return firebase
            .update('/Todos/' + id + '', {
            name: name
        })
            .then(function (result) {
            return 'You have successfully edited !';
        }, function (errorMessage) {
            console.log(errorMessage);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBbUQ7QUFDbkQscURBQW1EO0FBQ25ELHVEQUEwRDtBQUUxRCw2QkFBbUQ7QUFJbkQ7SUFFRSx5QkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFEbEMsVUFBSyxHQUFpQyxJQUFJLHNCQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFHdEQsY0FBUyxHQUFnQixFQUFFLENBQUM7SUFGQyxDQUFDO0lBR3RDLGtDQUFRLEdBQVIsVUFBUyxJQUFVO1FBQ2pCLE1BQU0sQ0FBQyxRQUFRO2FBQ1osVUFBVSxDQUFDO1lBQ1YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO2FBQ0QsSUFBSSxDQUNILFVBQVMsTUFBVztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQ0QsVUFBUyxZQUFpQjtZQUN4QixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRUQsK0JBQUssR0FBTCxVQUFNLElBQVU7UUFDZCxNQUFNLENBQUMsUUFBUTthQUNaLEtBQUssQ0FBQztZQUNMLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7WUFDakMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO2FBQ0QsSUFBSSxDQUNILFVBQUMsTUFBVztZQUNWLGdDQUFjLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFD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QUFLLENBQUMsSUFBSSxDQUFLLElBQUksQ0FBQyxTQUFTLFNBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsc0NBQVksR0FBWixVQUFhLEtBQUs7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUE3SVUsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQUdpQixhQUFNO09BRnZCLGVBQWUsQ0E4STNCO0lBQUQsc0JBQUM7Q0FBQSxBQTlJRCxJQThJQztBQTlJWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFja2VuZFNlcnZpY2UgfSBmcm9tICcuL2JhY2tlbmQuc2VydmljZSc7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlJyk7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnfi9jb21wb25lbnRzL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gJ34vY29tcG9uZW50cy9tb2RlbHMvZGF0YS5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZVNlcnZpY2Uge1xuICBpdGVtczogQmVoYXZpb3JTdWJqZWN0PEFycmF5PERhdGE+PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7fVxuXG4gIHByaXZhdGUgX2FsbEl0ZW1zOiBBcnJheTxEYXRhPiA9IFtdO1xuICByZWdpc3Rlcih1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIGZpcmViYXNlXG4gICAgICAuY3JlYXRlVXNlcih7XG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxuICAgICAgfSlcbiAgICAgIC50aGVuKFxuICAgICAgICBmdW5jdGlvbihyZXN1bHQ6IGFueSkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlcnJvck1lc3NhZ2U6IGFueSkge1xuICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBsb2dpbih1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIGZpcmViYXNlXG4gICAgICAubG9naW4oe1xuICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxuICAgICAgfSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBCYWNrZW5kU2VydmljZS50b2tlbiA9IHJlc3VsdC51aWQ7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xuICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cbiAgcmVzZXRQYXNzd29yZChlbWFpbCkge1xuICAgIHJldHVybiBmaXJlYmFzZVxuICAgICAgLnJlc2V0UGFzc3dvcmQoe1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVycm9yTWVzc2FnZTogYW55KSB7XG4gICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuXG4gIGFkZChteVRvZG86IHN0cmluZykge1xuICAgIHJldHVybiBmaXJlYmFzZVxuICAgICAgLnB1c2goJy9Ub2RvcycsIHtcbiAgICAgICAgbmFtZTogbXlUb2RvLFxuICAgICAgICBVSUQ6IEJhY2tlbmRTZXJ2aWNlLnRva2VuLFxuICAgICAgICBkYXRlOiAwIC0gRGF0ZS5ub3coKVxuICAgICAgfSlcbiAgICAgIC50aGVuKFxuICAgICAgICBmdW5jdGlvbihyZXN1bHQ6IGFueSkge1xuICAgICAgICAgIHJldHVybiAnIGFkZGVkIDopICc7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVycm9yTWVzc2FnZTogYW55KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG4gIGRlbGV0ZShkYXRhOiBEYXRhKSB7XG4gICAgcmV0dXJuIGZpcmViYXNlLnJlbW92ZSgnL1RvZG9zLycgKyBkYXRhLmlkICsgJycpLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuXG4gIGdldE15V2lzaExpc3QoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIGxldCBwYXRoID0gJ1RvZG9zJztcblxuICAgICAgbGV0IG9uVmFsdWVFdmVudCA9IChzbmFwc2hvdDogYW55KSA9PiB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NuYXBzaG90Jywgc25hcHNob3QudmFsdWUpO1xuICAgICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5oYW5kbGVTbmFwc2hvdChzbmFwc2hvdC52YWx1ZSk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0cykpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcihvblZhbHVlRXZlbnQsIGAvJHtwYXRofWApO1xuICAgIH0pO1xuICB9XG4gIGdldE15VG9kbyhpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQodGhpcy5fYWxsSXRlbXMuZmlsdGVyKHMgPT4gcy5pZCA9PT0gaWQpWzBdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXROYW1lKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMucHVibGlzaFVwZGF0ZXMoKTtcbiAgICByZXR1cm4gZmlyZWJhc2VcbiAgICAgIC51cGRhdGUoJy9Ub2Rvcy8nICsgaWQgKyAnJywge1xuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICB9KVxuICAgICAgLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKHJlc3VsdDogYW55KSB7XG4gICAgICAgICAgcmV0dXJuICdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZWRpdGVkICEnO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlcnJvck1lc3NhZ2U6IGFueSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBoYW5kbGVTbmFwc2hvdChkYXRhOiBhbnkpIHtcbiAgICAvL2VtcHR5IGFycmF5LCB0aGVuIHJlZmlsbCBhbmQgZmlsdGVyXG4gICAgdGhpcy5fYWxsSXRlbXMgPSBbXTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgZm9yIChsZXQgaWQgaW4gZGF0YSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24oeyBpZDogaWQgfSwgZGF0YVtpZF0pO1xuICAgICAgICBpZiAoQmFja2VuZFNlcnZpY2UudG9rZW4gPT09IHJlc3VsdC5VSUQpIHtcbiAgICAgICAgICB0aGlzLl9hbGxJdGVtcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucHVibGlzaFVwZGF0ZXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2FsbEl0ZW1zO1xuICB9XG5cbiAgcHVibGlzaFVwZGF0ZXMoKSB7XG4gICAgLy8gaGVyZSwgd2Ugc29ydCBtdXN0IGVtaXQgYSAqbmV3KiB2YWx1ZSAoaW1tdXRhYmlsaXR5ISlcbiAgICB0aGlzLl9hbGxJdGVtcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIGlmIChhLmRhdGUgPCBiLmRhdGUpIHJldHVybiAtMTtcbiAgICAgIGlmIChhLmRhdGUgPiBiLmRhdGUpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gICAgdGhpcy5pdGVtcy5uZXh0KFsuLi50aGlzLl9hbGxJdGVtc10pO1xuICB9XG5cbiAgaGFuZGxlRXJyb3JzKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IubWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==