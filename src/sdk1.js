// 'use strict'
import axios from 'axios'

axios.interceptors.request.use(config => {
const token = sessionStorage.getItem("token");
if (token) {
config.headers.common['Authorization'] = token;
}
return config;
});

Date.prototype.format = function(fmt) {
var o = {
"M+": this.getMonth() + 1, //月份
"d+": this.getDate(), //日
"h+": this.getHours(), //小时
"m+": this.getMinutes(), //分
"s+": this.getSeconds(), //秒
"q+": Math.floor((this.getMonth() + 3) / 3), //季度
"S": this.getMilliseconds() //毫秒
};
if (/(y+)/.test(fmt)) {
fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
}

for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
}
return fmt;
};
let huaweiSMCSDK={}
const sdk = {
huaweiSMCSDK:huaweiSMCSDK,
SMCSDK: function (config) {
huaweiSMCSDK.util = this.SMCSDK_Util
huaweiSMCSDK.config = config;
if (!config["sdkServerUrl"]) {
huaweiSMCSDK.util.log({ "logLevel": "error", "logMsg": "sdkServerUrl is invalid" });
}
huaweiSMCSDK.user = {};
huaweiSMCSDK.user.auth = this.SMCSDK_User_Auth
huaweiSMCSDK.user.account = this.SMCSDK_User_Account
//huaweiSMCSDK.user.event = new SMCSDK_User_Event();
//huaweiSMCSDK.user.conference = new SMCSDK_User_Conf();
//huaweiSMCSDK.user.wesocket = new SMCSDK_User_WebSocket();
//huaweiSMCSDK.user.config = new SMCSDK_User_Device();
//TO add more here
huaweiSMCSDK.userInfo = {
"session": "",
};
huaweiSMCSDK.getSdkServerUrl = function () {
    return huaweiSMCSDK.config["sdkServerUrl"];
}
},
SMCSDK_User_Account: {
addAccount: function (param) {
if (undefined == param) {
huaweiSMCSDK.util.log({ "logLevel": "error", "logMsg": "param is invalid" });
return;
}

        if (undefined == param["callback"] || typeof param["callback"] != "function") {
            huaweiSMCSDK.util.log({ "logLevel": "error", "logMsg": "callback is not a function" });
            return;
        }

        var url = huaweiSMCSDK.getSdkServerUrl() + "/accounts";

        var readyData = {
            "name": param["name"],
            "nickname": param["nickname"],
            "password": param["password"],
            "roles": [
                param["roles"]
            ],
            "email": param["email"],
            "mobile": param["mobile"],
            "organization": param["organization"]
        };

        axios({
            url: url,
            method: 'post',
            data: readyData
        })
            .then(function (res) {
                console.log(res);
            });
    },
    modifyAccount: function (param) {

    },
    removeAccount: function (param) {

    },
    resetPassword: function (param) {

    }
},
SMCSDK_User_Auth: {
    login: function (param) {
        if (undefined == param) {
            huaweiSMCSDK.util.log({ "logLevel": "error", "logMsg": "param is invalid" });
            return;
        }
        var result = {
            "rsp": "-2",
            "message": ""
        };

        if (!(param["password"] && param["password"].length >= 1 && param["password"].length <= 16)) {
            result["message"] = "password is invalid";
            //param["callback"](result); 
            return;
        }

        var url = huaweiSMCSDK.getSdkServerUrl() + "/tokens";

        var readyData = {
            username: param["username"],
            password: param["password"]
        };


        axios({
            method: 'get',
            url,
            auth: readyData
        })
            .then(function (response) {
                console.info(response);
                var token = response.config.headers.Authorization;
                sessionStorage.setItem("token", token);
                var strToken = sessionStorage.getItem("token");//调试使用
                console.log(strToken);//调试使用
                result={
                    rsp:0,
                    message:"",
                    data:response.data.data
                }
                param.callback(result)
            })
            .catch(function (error) {
                console.log(error);
                result={
                    rsp:error.code,
                    message:"请求错误"
                }
                param.callback(result)
            })
    }
},
SMCSDK_Util: {
    log: function (logParam) {
        var date = new Date().format("yyyy-MM-dd hh:mm:ss");
        if (logParam["logLevel"] == "debug") {
            console.debug("HuaweiSMCSDK's Log: " + date + " " + logParam["logMsg"]);
        }
        if (logParam["logLevel"] == "info") {
            console.info("HuaweiSMCSDK's Log: " + date + " " + logParam["logMsg"]);
        }
        if (logParam["logLevel"] == "warn") {
            console.warn("HuaweiSMCSDK's Log: " + date + " " + logParam["logMsg"]);
        }
        if (logParam["logLevel"] == "error") {
            console.error("HuaweiSMCSDK's Log: " + date + " " + logParam["logMsg"]);
        }
    },
    preProcessData: function (cfg) {
        var settings = {};
        settings.type = cfg.type;
        settings.timeout = cfg.timeout || 2400000;
        settings.async = cfg.async != false;
        if (cfg.data) {
            settings.data = JSON.stringify(cfg.data);
        }
        settings.contentType = cfg.contentType || "application/json";
        if (typeof cfg.callback === "function") {
            settings.success = function (data) {
                var jsonObject = JSON.parse(data);
                if (cfg["url"].indexOf("/login") != -1 && jsonObject["rsp"] == "4011") {
                    //login success
                    huaweiSMCSDK.userInfo["session"] = jsonObject["session"];
                }
                cfg.callback(jsonObject);
            }

            settings.error = function (data) {
                huaweiSMCSDK.util.log({ "logLevel": "error", "logMsg": "unkown exception when send request. See the brower's console." });
                var result = {
                    "rsp": "-1"
                };
                cfg.callback(data);
            }

        } else {
            settings.error = function (data) {
                huaweiSMCSDK.util.log({ "logLevel": "error", "logMsg": "unkown exception when send request. See the brower's console." });
            }
        }
        /*settings.beforeSend = function(XMLHttpRequest) {
            var session = huaweiSMCSDK.userInfo["session"];
            if (session) {
                XMLHttpRequest.setRequestHeader("session", session);
            }
        };
        $.axios(cfg["url"], settings);*/

    },
    isNumber: function (param) {
        if (undefined == param) {
            return false;
        }
        var regex = /^[1-9]+[0-9]*]*$/;
        if (regex.test(param)) {
            return true;
        }
        return false;
    },
    checkIsdn: function (isdn) {
        if (isdn && isdn.length <= 8 && this.isNumber(isdn)) {
            return true;
        }
        return false;
    },
    checkIp: function (ip) {
        if (undefined == ip) {
            return false;
        }
        var regex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (regex.test(ip)) {
            return true;
        }
        return false;
    }
}
};

export default sdk;