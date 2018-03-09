/*
 * JavaScript ku implementation. Compatible with server-side environments like node.js, module loaders like RequireJS and all web browsers.
 * https://github.com/v3u3i87/js-ku
 *
 * Copyright @ zmq.cc
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define */

;(function ($) {
  'use strict'

  var ku = {

    is: function () {
      var _this = {};
      /**
       * 判断是否为对象
       * @param obj
       * @returns {boolean}
       */
      _this.object = function (obj) {
        return (typeof obj == 'object' || typeof obj == 'Object') && obj.constructor == Object;
      };

      /**
       * 判断是否支持 Storage
       */
      _this.storage = function () {
        if (typeof(Storage) !== "undefined") {

        } else {
          alert("请使用现代浏览器进行访问");
        }
      };

      /**
       * 判断是否为json
       * @param str
       * @returns {boolean}
       */
      _this.json = function (str) {
        if (typeof str == 'string') {
          try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
              return true;
            } else {
              return false;
            }
          } catch (e) {
            console.log('error：' + str + '!!!' + e);
            return false;
          }
        }
        console.log('It is not a string!');
        return false;
      };

      /**
       *
       * @param value
       * @returns {boolean}
       */
      _this.null = function (value) {
        if (value == null || value == undefined || value == '') {
          return false;
        }
        return true;
      };

      /**
       * 判断是否为微信端
       * @returns {boolean}
       */
      _this.wechat = function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          return false;
        }
      };

      return _this;
    },

    /**
     * sessionStorage
     */
    ss: function () {
      var _this = {};

      _this.set = function (k, v) {
        sessionStorage.setItem(k, v);
        return true;
      },

        _this.get = function (k) {
          k = sessionStorage.getItem(k);
          if (k) {
            return k;
          }
          return false;
        },

        _this.del = function (k) {
          if (sessionStorage.removeItem(k)) {
            return true;
          }
          return false;
        },

        _this.index = function (k) {
          k = sessionStorage.index(k);
          if (k) {
            return k;
          }
          return false;
        },
        _this.delAll = function () {
          if (sessionStorage.clear()) {
            return true;
          }
          return false;
        }

      return _this;
    },

    /**
     * localStorage
     */
    ls: function () {
      var _this = {};
      _this.set = function (k, v) {
        localStorage.setItem(k, v);
        return true;
      };

      _this.get = function (k) {
        k = localStorage.getItem(k);
        if (k) {
          return k;
        }
        return false;
      };

      _this.del = function (k) {
        if (localStorage.removeItem(k)) {
          return true;
        }
        return false;
      };

      _this.index = function (k) {
        k = localStorage.index(k);
        if (k) {
          return k;
        }
        return false;
      };

      _this.delAll = function () {
        if (localStorage.clear()) {
          return true;
        }
        return false;
      }
      return _this;
    },

    verify: function () {
      var _this = {};

      _this.vailPhone = function (name) {
        var t = document.getElementById(name);
        var json = {};
        var phone = t.val();
        json.bool = false;
        json.msg = 'ok';
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (phone == '') {
          json.msg = "手机号码不能为空！";
        } else if (phone.length != 11) {
          json.msg = "请输入11位的手机号码.";
        } else if (!myreg.test(phone)) {
          json.msg = "请输入有效的手机号码";
        } else {
          json.bool = true;
        }
        return json;
      };

      /**
       * 验证邮箱
       * @param t dom对象
       * @param v 值
       * @returns {boolean}
       */
      _this.emailCheck = function (t, v) {
        var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (t && v) {
          if (!pattern.test(v)) {
            return false;
          }
          return true;
        }
      };

    },

    /**
     *
     */
    jump: function () {
      var _this = {};

      /**
       *
       */
      _this.reload = function () {
        return window.location.reload();
      };

      _this.url = function (url) {
        if (is.null(url)) {
          return window.location.href = url;
        }
      };

      _this.back = function () {
        window.history.back(-1);
      };


    },

    /**
     * 请求类
     */
    request: function () {
      var _this = {};
      /**
       *
       * @param name
       * @returns {null}
       */
      _this.get = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        } else {
          return null;
        }
      };

      /**
       * 模拟提交
       * @param URL
       * @param PARAMS
       * @returns {Element}
       */
      _this.post = function (URL, PARAMS) {
        var temp = document.createElement("form");
        temp.action = URL;
        temp.method = "POST";
        temp.style.display = "none";
        for (var x in PARAMS) {
          var opt = document.createElement("textarea");
          opt.name = x;
          opt.value = PARAMS[x];
          console.log(opt.name);
          temp.appendChild(opt);
        }
        // console.log(temp);
        document.body.appendChild(temp);
        temp.submit();
        return temp;
      };


    },

    /**
     *
     */
    string: function () {
      var _this = {};

      /**
       * 中文转码Unicode编码
       * @param str
       * @returns {string}
       */
      _this.cntoUtf8 = function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
          c = str.charCodeAt(i);
          if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
          } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
          } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
          }
        }
        return out;
      };

      /**
       * 执行转义
       * @param v
       * @returns {boolean}
       */
      _this.json = function (v)
      {
        if (!is.null(v)) {
          return false;
        }

        switch (typeof(v)) {
          case 'string' || 'String':
            return JSON.parse(v);
            break;

          case 'object' || 'Object':
            return JSON.stringify(v);
            break;

          default:
            console.log('json转换失败,未知的类型.');
            break;
        }
      };

    }

    //end ku
  };

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return ku;
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = ku;
  } else {
    $.ku = ku;
  }
})(this)
