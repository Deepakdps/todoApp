"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var backend_service_1 = require("./backend.service");
var firebase = require("nativescript-plugin-firebase");
var FirebaseService = /** @class */ (function () {
    function FirebaseService() {
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
    FirebaseService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error));
        return Promise.reject(error.message);
    };
    FirebaseService = __decorate([
        core_1.Injectable()
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBbUQ7QUFDbkQscURBQW1EO0FBQ25ELHVEQUEwRDtBQUkxRDtJQUFBO0lBc0RBLENBQUM7SUFyREMsa0NBQVEsR0FBUixVQUFTLElBQVU7UUFDakIsTUFBTSxDQUFDLFFBQVE7YUFDWixVQUFVLENBQUM7WUFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3hCLENBQUM7YUFDRCxJQUFJLENBQ0gsVUFBUyxNQUFXO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFDRCxVQUFTLFlBQWlCO1lBQ3hCLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQ0YsQ0FBQztJQUNOLENBQUM7SUFFRCwrQkFBSyxHQUFMLFVBQU0sSUFBVTtRQUNkLE1BQU0sQ0FBQyxRQUFRO2FBQ1osS0FBSyxDQUFDO1lBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUTtZQUNqQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3hCLENBQUM7YUFDRCxJQUFJLENBQ0gsVUFBQyxNQUFXO1lBQ1YsZ0NBQWMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQ0QsVUFBQyxZQUFpQjtZQUNoQixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBQ0QsdUNBQWEsR0FBYixVQUFjLEtBQUs7UUFDakIsTUFBTSxDQUFDLFFBQVE7YUFDWixhQUFhLENBQUM7WUFDYixLQUFLLEVBQUUsS0FBSztTQUNiLENBQUM7YUFDRCxJQUFJLENBQ0gsVUFBQyxNQUFXO1lBQ1YsaUNBQWlDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFDRCxVQUFTLFlBQWlCO1lBQ3hCLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQ0Y7YUFDQSxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxzQ0FBWSxHQUFaLFVBQWEsS0FBSztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQXJEVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7T0FDQSxlQUFlLENBc0QzQjtJQUFELHNCQUFDO0NBQUEsQUF0REQsSUFzREM7QUF0RFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhY2tlbmRTZXJ2aWNlIH0gZnJvbSAnLi9iYWNrZW5kLnNlcnZpY2UnO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ34vY29tcG9uZW50cy9tb2RlbHMvdXNlci5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZVNlcnZpY2Uge1xuICByZWdpc3Rlcih1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIGZpcmViYXNlXG4gICAgICAuY3JlYXRlVXNlcih7XG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxuICAgICAgfSlcbiAgICAgIC50aGVuKFxuICAgICAgICBmdW5jdGlvbihyZXN1bHQ6IGFueSkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlcnJvck1lc3NhZ2U6IGFueSkge1xuICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBsb2dpbih1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIGZpcmViYXNlXG4gICAgICAubG9naW4oe1xuICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxuICAgICAgfSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBCYWNrZW5kU2VydmljZS50b2tlbiA9IHJlc3VsdC51aWQ7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xuICAgICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cbiAgcmVzZXRQYXNzd29yZChlbWFpbCkge1xuICAgIHJldHVybiBmaXJlYmFzZVxuICAgICAgLnJlc2V0UGFzc3dvcmQoe1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVycm9yTWVzc2FnZTogYW55KSB7XG4gICAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuICBoYW5kbGVFcnJvcnMoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvci5tZXNzYWdlKTtcbiAgfVxufVxuIl19