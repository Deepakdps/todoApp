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
            return ' added :)';
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
            return 'edited :)';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBbUQ7QUFDbkQscURBQW1EO0FBQ25ELHVEQUEwRDtBQUUxRCw2QkFBbUQ7QUFJbkQ7SUFFRSx5QkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFEbEMsVUFBSyxHQUFpQyxJQUFJLHNCQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFHdEQsY0FBUyxHQUFnQixFQUFFLENBQUM7SUFGQyxDQUFDO0lBR3RDLGtDQUFRLEdBQVIsVUFBUyxJQUFVO1FBQ2pCLE1BQU0sQ0FBQyxRQUFRO2FBQ1osVUFBVSxDQUFDO1lBQ1YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO2FBQ0QsSUFBSSxDQUNILFVBQVMsTUFBVztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQ0QsVUFBUyxZQUFpQjtZQUN4QixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRUQsK0JBQUssR0FBTCxVQUFNLElBQVU7UUFDZCxNQUFNLENBQUMsUUFBUTthQUNaLEtBQUssQ0FBQztZQUNMLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7WUFDakMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO2FBQ0QsSUFBSSxDQUNILFVBQUMsTUFBVztZQUNWLGdDQUFjLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFD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SyxDQUFDLElBQUksQ0FBSyxJQUFJLENBQUMsU0FBUyxTQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELHNDQUFZLEdBQVosVUFBYSxLQUFLO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBN0lVLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FHaUIsYUFBTTtPQUZ2QixlQUFlLENBOEkzQjtJQUFELHNCQUFDO0NBQUEsQUE5SUQsSUE4SUM7QUE5SVksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhY2tlbmRTZXJ2aWNlIH0gZnJvbSAnLi9iYWNrZW5kLnNlcnZpY2UnO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ34vY29tcG9uZW50cy9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGEgfSBmcm9tICd+L2NvbXBvbmVudHMvbW9kZWxzL2RhdGEubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIHtcbiAgaXRlbXM6IEJlaGF2aW9yU3ViamVjdDxBcnJheTxEYXRhPj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge31cblxuICBwcml2YXRlIF9hbGxJdGVtczogQXJyYXk8RGF0YT4gPSBbXTtcbiAgcmVnaXN0ZXIodXNlcjogVXNlcikge1xuICAgIHJldHVybiBmaXJlYmFzZVxuICAgICAgLmNyZWF0ZVVzZXIoe1xuICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgZnVuY3Rpb24ocmVzdWx0OiBhbnkpIHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyb3JNZXNzYWdlOiBhbnkpIHtcbiAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgbG9naW4odXNlcjogVXNlcikge1xuICAgIHJldHVybiBmaXJlYmFzZVxuICAgICAgLmxvZ2luKHtcbiAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLlBBU1NXT1JELFxuICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgQmFja2VuZFNlcnZpY2UudG9rZW4gPSByZXN1bHQudWlkO1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3JNZXNzYWdlOiBhbnkpID0+IHtcbiAgICAgICAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG4gIHJlc2V0UGFzc3dvcmQoZW1haWwpIHtcbiAgICByZXR1cm4gZmlyZWJhc2VcbiAgICAgIC5yZXNldFBhc3N3b3JkKHtcbiAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICB9KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgIC8vIGFsZXJ0KEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlcnJvck1lc3NhZ2U6IGFueSkge1xuICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cblxuICBhZGQobXlUb2RvOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZmlyZWJhc2VcbiAgICAgIC5wdXNoKCcvVG9kb3MnLCB7XG4gICAgICAgIG5hbWU6IG15VG9kbyxcbiAgICAgICAgVUlEOiBCYWNrZW5kU2VydmljZS50b2tlbixcbiAgICAgICAgZGF0ZTogMCAtIERhdGUubm93KClcbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgZnVuY3Rpb24ocmVzdWx0OiBhbnkpIHtcbiAgICAgICAgICByZXR1cm4gJyBhZGRlZCA6KSc7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVycm9yTWVzc2FnZTogYW55KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG4gIGRlbGV0ZShkYXRhOiBEYXRhKSB7XG4gICAgcmV0dXJuIGZpcmViYXNlLnJlbW92ZSgnL1RvZG9zLycgKyBkYXRhLmlkICsgJycpLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuXG4gIGdldE15V2lzaExpc3QoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIGxldCBwYXRoID0gJ1RvZG9zJztcblxuICAgICAgbGV0IG9uVmFsdWVFdmVudCA9IChzbmFwc2hvdDogYW55KSA9PiB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NuYXBzaG90Jywgc25hcHNob3QudmFsdWUpO1xuICAgICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5oYW5kbGVTbmFwc2hvdChzbmFwc2hvdC52YWx1ZSk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0cykpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcihvblZhbHVlRXZlbnQsIGAvJHtwYXRofWApO1xuICAgIH0pO1xuICB9XG4gIGdldE15VG9kbyhpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQodGhpcy5fYWxsSXRlbXMuZmlsdGVyKHMgPT4gcy5pZCA9PT0gaWQpWzBdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXROYW1lKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMucHVibGlzaFVwZGF0ZXMoKTtcbiAgICByZXR1cm4gZmlyZWJhc2VcbiAgICAgIC51cGRhdGUoJy9Ub2Rvcy8nICsgaWQgKyAnJywge1xuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICB9KVxuICAgICAgLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKHJlc3VsdDogYW55KSB7XG4gICAgICAgICAgcmV0dXJuICdlZGl0ZWQgOiknO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlcnJvck1lc3NhZ2U6IGFueSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBoYW5kbGVTbmFwc2hvdChkYXRhOiBhbnkpIHtcbiAgICAvL2VtcHR5IGFycmF5LCB0aGVuIHJlZmlsbCBhbmQgZmlsdGVyXG4gICAgdGhpcy5fYWxsSXRlbXMgPSBbXTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgZm9yIChsZXQgaWQgaW4gZGF0YSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24oeyBpZDogaWQgfSwgZGF0YVtpZF0pO1xuICAgICAgICBpZiAoQmFja2VuZFNlcnZpY2UudG9rZW4gPT09IHJlc3VsdC5VSUQpIHtcbiAgICAgICAgICB0aGlzLl9hbGxJdGVtcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucHVibGlzaFVwZGF0ZXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2FsbEl0ZW1zO1xuICB9XG5cbiAgcHVibGlzaFVwZGF0ZXMoKSB7XG4gICAgLy8gaGVyZSwgd2Ugc29ydCBtdXN0IGVtaXQgYSAqbmV3KiB2YWx1ZSAoaW1tdXRhYmlsaXR5ISlcbiAgICB0aGlzLl9hbGxJdGVtcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIGlmIChhLmRhdGUgPCBiLmRhdGUpIHJldHVybiAtMTtcbiAgICAgIGlmIChhLmRhdGUgPiBiLmRhdGUpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gICAgdGhpcy5pdGVtcy5uZXh0KFsuLi50aGlzLl9hbGxJdGVtc10pO1xuICB9XG5cbiAgaGFuZGxlRXJyb3JzKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IubWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==