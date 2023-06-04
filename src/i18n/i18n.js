import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    vi: {
        translation: {
            "share-cart": process.env.REACT_APP_SHARE_VI_CART,
            "share-close": process.env.REACT_APP_SHARE_VI_CLOSE,
            "share-total": process.env.REACT_APP_SHARE_VI_TOTAL,
            "share-order": process.env.REACT_APP_SHARE_VI_ORDER,
            "share-price": process.env.REACT_APP_SHARE_VI_PRICE,
            "share-quantity": process.env.REACT_APP_SHARE_VI_QUANTITY,
            "share-nodata": process.env.REACT_APP_SHARE_VI_NODATA,
            "share-change": process.env.REACT_APP_SHARE_VI_CHANGE,
            "share-cancel": process.env.REACT_APP_SHARE_VI_CANCEL,
            "share-save": process.env.REACT_APP_SHARE_VI_SAVE,
            "share-add": process.env.REACT_APP_SHARE_VI_ADD,
            "share-back": process.env.REACT_APP_SHARE_VI_BACK,
            "share-backhome": process.env.REACT_APP_SHARE_VI_BACKHOME,
            "share-address": process.env.REACT_APP_SHARE_VI_ADDRESS,
            "share-phone": process.env.REACT_APP_SHARE_VI_PHONE,
            "share-status": process.env.REACT_APP_SHARE_VI_STATUS,
            "share-name": process.env.REACT_APP_SHARE_VI_NAME,
            "share-purchasedate": process.env.REACT_APP_SHARE_VI_PURCHASEDATE,
            "share-lastupdate": process.env.REACT_APP_SHARE_VI_LASTUPDATE,
            "share-boughtby": process.env.REACT_APP_SHARE_VI_BOUGHTBY,
            "share-fuel": process.env.REACT_APP_SHARE_VI_FUEL,
            "share-detail": process.env.REACT_APP_SHARE_VI_DETAIL,
            "share-rebuy": process.env.REACT_APP_SHARE_VI_REBUY,
            "share-color": process.env.REACT_APP_SHARE_VI_COLOR,
            "share-power": process.env.REACT_APP_SHARE_VI_POWER,
            "share-bodysize": process.env.REACT_APP_SHARE_VI_BODYSIZE,
            "share-bodytype": process.env.REACT_APP_SHARE_VI_BODYTYPE,
            "share-brand": process.env.REACT_APP_SHARE_VI_BRAND,
            "share-category": process.env.REACT_APP_SHARE_VI_CATEGORY,
            "share-search": process.env.REACT_APP_SHARE_VI_SEARCH,
            "share-action": process.env.REACT_APP_SHARE_VI_ACTION,
            "share-logout": process.env.REACT_APP_SHARE_VI_LOGOUT,
            "share-username": process.env.REACT_APP_SHARE_VI_USERNAME,
            "share-role": process.env.REACT_APP_SHARE_VI_ROLE,
            "share-image": process.env.REACT_APP_SHARE_VI_IMAGE,
            "share-addproduct": process.env.REACT_APP_SHARE_VI_ADDPRODUCT,
            "share-edit": process.env.REACT_APP_SHARE_VI_EDIT,
            "share-delete": process.env.REACT_APP_SHARE_VI_DELETE,
            "navbar-new cars": process.env.REACT_APP_NAVBAR_VI_NEWCARS,
            "navbar-used cars": process.env.REACT_APP_NAVBAR_VI_USEDCARS,
            "navbar-reviews": process.env.REACT_APP_NAVBAR_VI_REVIEWS,
            "navbar-news": process.env.REACT_APP_NAVBAR_VI_NEWS,
            "navbar-search": process.env.REACT_APP_NAVBAR_VI_SEARCH,
            "nb-user-manage": process.env.REACT_APP_NAVBAR_USER_VI_MANAGE,
            "nb-user-myorder": process.env.REACT_APP_NAVBAR_USER_VI_MYORDER,
            "nb-user-setting": process.env.REACT_APP_NAVBAR_USER_VI_SETTING,
            "nb-user-logout": process.env.REACT_APP_NAVBAR_USER_VI_LOGOUT,
            "search-look": process.env.REACT_APP_SEARCH_VI_LOOK,
            "login-sign in": process.env.REACT_APP_LOGIN_VI_SIGNIN,
            "login-account": process.env.REACT_APP_LOGIN_VI_ACCOUNT,
            "login-username": process.env.REACT_APP_LOGIN_VI_USERNAME,
            "login-password": process.env.REACT_APP_LOGIN_VI_PASSWORD,
            "login-forgot": process.env.REACT_APP_LOGIN_VI_FORGOT,
            "login-login": process.env.REACT_APP_LOGIN_VI_LOGIN,
            "login-hello": process.env.REACT_APP_LOGIN_VI_HELLO,
            "login-instruct": process.env.REACT_APP_LOGIN_VI_INSTRUCT,
            "login-signup": process.env.REACT_APP_LOGIN_VI_SIGNUP,
            "register-create": process.env.REACT_APP_REGISTER_VI_CREATEACCOUNT,
            "register-account": process.env.REACT_APP_REGISTER_VI_ACCOUNT,
            "register-username": process.env.REACT_APP_REGISTER_VI_USERNAME,
            "register-password": process.env.REACT_APP_REGISTER_VI_PASSWORD,
            "register-confirm": process.env.REACT_APP_REGISTER_VI_CONFIRMPASSWORD,
            "register-signup": process.env.REACT_APP_REGISTER_VI_SIGNUP,
            "register-welcome": process.env.REACT_APP_REGISTER_VI_WELCOMEBACK,
            "register-instruct": process.env.REACT_APP_REGISTER_VI_INSTRUCT,
            "register-sign in": process.env.REACT_APP_REGISTER_VI_SIGNIN,
            "profile-profile": process.env.REACT_APP_PROFILE_VI_PROFILE,
            "profile-content profile": process.env.REACT_APP_PROFILE_VI_CONTENTPROFILE,
            "profile-photo": process.env.REACT_APP_PROFILE_VI_PHOTO,
            "profile-change": process.env.REACT_APP_PROFILE_VI_CHANGE,
            "profile-info": process.env.REACT_APP_PROFILE_VI_INFO,
            "profile-content info": process.env.REACT_APP_PROFILE_VI_CONTENTINFO,
            "profile-firstname": process.env.REACT_APP_PROFILE_VI_FIRSTNAME,
            "profile-lastname": process.env.REACT_APP_PROFILE_VI_LASTNAME,
            "profile-email": process.env.REACT_APP_PROFILE_VI_EMAIL,
            "profile-address": process.env.REACT_APP_PROFILE_VI_ADDRESS,
            "profile-phone": process.env.REACT_APP_PROFILE_VI_PHONE,
            "profile-birthday": process.env.REACT_APP_PROFILE_VI_BIRTHDAY,
            "profile-cancel": process.env.REACT_APP_PROFILE_VI_CANCEL,
            "profile-save": process.env.REACT_APP_PROFILE_VI_SAVE,
            "content-from": process.env.REACT_APP_CONTENT_VI_FROM,
            "content-power": process.env.REACT_APP_CONTENT_VI_POWER,
            "p-detail-cart": process.env.REACT_APP_CART_VI_CART,
            "p-detail-image": process.env.REACT_APP_CART_VI_IMAGE,
            "p-detail-name": process.env.REACT_APP_CART_VI_NAME,
            "p-detail-quantity": process.env.REACT_APP_CART_VI_QUANTITY,
            "p-detail-price": process.env.REACT_APP_CART_VI_PRICE,
            "p-detail-temporary": process.env.REACT_APP_CART_VI_TEMPORARY,
            "p-detail-action": process.env.REACT_APP_CART_VI_ACTION,
            "p-detail-inCart": process.env.REACT_APP_CART_VI_INCART,
            "p-detail-total": process.env.REACT_APP_CART_VI_TOTAL,
            "p-detail-order": process.env.REACT_APP_CART_VI_ORDER,
            "od-title": process.env.REACT_APP_ORDERDETAIL_VI_TITLE,
            "pd-details": process.env.REACT_APP_PRODUCTDETAIL_VI_DETAILS,
            "pd-price": process.env.REACT_APP_PRODUCTDETAIL_VI_PRICE,
            "pd-paynow": process.env.REACT_APP_PRODUCTDETAIL_VI_PAYNOW,
            "pd-addtobag": process.env.REACT_APP_PRODUCTDETAIL_VI_ADDTOBAG,
            "pd-keyinfo": process.env.REACT_APP_PRODUCTDETAIL_VI_KEYINFO,
            "about": process.env.REACT_APP_FOOTER_VI_ABOUT,
            "policy": process.env.REACT_APP_FOOTER_VI_POLICY,
            "licensing": process.env.REACT_APP_FOOTER_VI_LICENSING,
            "contact": process.env.REACT_APP_FOOTER_VI_CONTACT,
            "db-homeucar": process.env.REACT_APP_DASHBOARD_VI_HOMEUCAR,
            "db-home": process.env.REACT_APP_DASHBOARD_VI_HOME,
            "db-build": process.env.REACT_APP_DASHBOARD_VI_BUILD,
            "db-orders": process.env.REACT_APP_DASHBOARD_VI_ORDERS,
            "db-users": process.env.REACT_APP_DASHBOARD_VI_USERS,
            "db-products": process.env.REACT_APP_DASHBOARD_VI_PRODUCTS,
            "db-manageorder": process.env.REACT_APP_DASHBOARD_VI_MANAGEORDER,
            "db-manageuser": process.env.REACT_APP_DASHBOARD_VI_MANAGEUSER,
            "db-manageproduct": process.env.REACT_APP_DASHBOARD_VI_MANAGEPRODUCT,
            "db-productinfor": process.env.REACT_APP_DASHBOARD_VI_PRODUCTINFOR,
            "db-size": process.env.REACT_APP_DASHBOARD_VI_SIZE,
            "db-power": process.env.REACT_APP_DASHBOARD_VI_POWER,
            "db-description": process.env.REACT_APP_DASHBOARD_VI_DESCRIPTION,
            "db-details": process.env.REACT_APP_DASHBOARD_VI_DETAILS,
            "db-pricing": process.env.REACT_APP_DASHBOARD_VI_PRICING,
            "db-price": process.env.REACT_APP_DASHBOARD_VI_PRICE,
            "db-media": process.env.REACT_APP_DASHBOARD_VI_MEDIA,
            "db-moreinfor": process.env.REACT_APP_DASHBOARD_VI_MOREINFOR,
            "db-type": process.env.REACT_APP_DASHBOARD_VI_TYPE,
            "db-drag": process.env.REACT_APP_DASHBOARD_VI_DRAG,
            "nf-title": process.env.REACT_APP_NOTFOUNT_VI_TITLE,
            "nf-content": process.env.REACT_APP_NOTFOUNT_VI_CONTENT,
            "cf-title": process.env.REACT_APP_CONFIRM_VI_TITLE,
            "cf-content": process.env.REACT_APP_CONFIRM_VI_CONTENT,
            "addsuccess": process.env.REACT_APP_NOTIFY_VI_ADDSUCCESS,
            "addfail": process.env.REACT_APP_NOTIFY_VI_ADDFAIL,
            "updatesuccess": process.env.REACT_APP_NOTIFY_VI_UPDATESUCCESS,
            "updatefail": process.env.REACT_APP_NOTIFY_VI_UPDATEFAIL,
            "deletesuccess": process.env.REACT_APP_NOTIFY_VI_DELETESUCCESS,
            "deletefail": process.env.REACT_APP_NOTIFY_VI_DELETEFAIL,
            "loadfail": process.env.REACT_APP_NOTIFY_VI_LOADFAIL,
            "logged": process.env.REACT_APP_NOTIFY_VI_LOGGED,
            "registersuccess": process.env.REACT_APP_NOTIFY_VI_REGISTERSUCCESS,
            "noproduct": process.env.REACT_APP_NOTIFY_VI_NOPRODUCT,
            "ordersuccess": process.env.REACT_APP_NOTIFY_VI_ORDERSUCCESS,
            "orderfail": process.env.REACT_APP_NOTIFY_VI_ORDERFAIL,
            "cancelordersuccess": process.env.REACT_APP_NOTIFY_VI_CANCELORDERSUCCESS,
            "cancelorderfail": process.env.REACT_APP_NOTIFY_VI_CANCELORDERFAIL,
            "rebuyfail": process.env.REACT_APP_NOTIFY_VI_REBUYFAIL,
        }
    },
    en: {
        translation: {
            "share-cart": process.env.REACT_APP_SHARE_EN_CART,
            "share-close": process.env.REACT_APP_SHARE_EN_CLOSE,
            "share-total": process.env.REACT_APP_SHARE_EN_TOTAL,
            "share-order": process.env.REACT_APP_SHARE_EN_ORDER,
            "share-price": process.env.REACT_APP_SHARE_EN_PRICE,
            "share-quantity": process.env.REACT_APP_SHARE_EN_QUANTITY,
            "share-nodata": process.env.REACT_APP_SHARE_EN_NODATA,
            "share-change": process.env.REACT_APP_SHARE_EN_CHANGE,
            "share-cancel": process.env.REACT_APP_SHARE_EN_CANCEL,
            "share-save": process.env.REACT_APP_SHARE_EN_SAVE,
            "share-add": process.env.REACT_APP_SHARE_EN_ADD,
            "share-back": process.env.REACT_APP_SHARE_EN_BACK,
            "share-backhome": process.env.REACT_APP_SHARE_EN_BACKHOME,
            "share-address": process.env.REACT_APP_SHARE_EN_ADDRESS,
            "share-phone": process.env.REACT_APP_SHARE_EN_PHONE,
            "share-status": process.env.REACT_APP_SHARE_EN_STATUS,
            "share-name": process.env.REACT_APP_SHARE_EN_NAME,
            "share-purchasedate": process.env.REACT_APP_SHARE_EN_PURCHASEDATE,
            "share-lastupdate": process.env.REACT_APP_SHARE_EN_LASTUPDATE,
            "share-boughtby": process.env.REACT_APP_SHARE_EN_BOUGHTBY,
            "share-fuel": process.env.REACT_APP_SHARE_EN_FUEL,
            "share-detail": process.env.REACT_APP_SHARE_EN_DETAIL,
            "share-rebuy": process.env.REACT_APP_SHARE_EN_REBUY,
            "share-color": process.env.REACT_APP_SHARE_EN_COLOR,
            "share-power": process.env.REACT_APP_SHARE_EN_POWER,
            "share-bodysize": process.env.REACT_APP_SHARE_EN_BODYSIZE,
            "share-bodytype": process.env.REACT_APP_SHARE_EN_BODYTYPE,
            "share-brand": process.env.REACT_APP_SHARE_EN_BRAND,
            "share-category": process.env.REACT_APP_SHARE_EN_CATEGORY,
            "share-search": process.env.REACT_APP_SHARE_EN_SEARCH,
            "share-action": process.env.REACT_APP_SHARE_EN_ACTION,
            "share-logout": process.env.REACT_APP_SHARE_EN_LOGOUT,
            "share-username": process.env.REACT_APP_SHARE_EN_USERNAME,
            "share-role": process.env.REACT_APP_SHARE_EN_ROLE,
            "share-image": process.env.REACT_APP_SHARE_EN_IMAGE,
            "share-addproduct": process.env.REACT_APP_SHARE_EN_ADDPRODUCT,
            "share-edit": process.env.REACT_APP_SHARE_EN_EDIT,
            "share-delete": process.env.REACT_APP_SHARE_EN_DELETE,
            "navbar-new cars": process.env.REACT_APP_NAVBAR_EN_NEWCARS,
            "navbar-used cars": process.env.REACT_APP_NAVBAR_EN_USEDCARS,
            "navbar-reviews": process.env.REACT_APP_NAVBAR_EN_REVIEWS,
            "navbar-news": process.env.REACT_APP_NAVBAR_EN_NEWS,
            "navbar-search": process.env.REACT_APP_NAVBAR_EN_SEARCH,
            "nb-user-manage": process.env.REACT_APP_NAVBAR_USER_EN_MANAGE,
            "nb-user-myorder": process.env.REACT_APP_NAVBAR_USER_EN_MYORDER,
            "nb-user-setting": process.env.REACT_APP_NAVBAR_USER_EN_SETTING,
            "nb-user-logout": process.env.REACT_APP_NAVBAR_USER_EN_LOGOUT,
            "search-look": process.env.REACT_APP_SEARCH_EN_LOOK,
            "login-sign in": process.env.REACT_APP_LOGIN_EN_SIGNIN,
            "login-account": process.env.REACT_APP_LOGIN_EN_ACCOUNT,
            "login-username": process.env.REACT_APP_LOGIN_EN_USERNAME,
            "login-password": process.env.REACT_APP_LOGIN_EN_PASSWORD,
            "login-forgot": process.env.REACT_APP_LOGIN_EN_FORGOT,
            "login-login": process.env.REACT_APP_LOGIN_EN_LOGIN,
            "login-hello": process.env.REACT_APP_LOGIN_EN_HELLO,
            "login-instruct": process.env.REACT_APP_LOGIN_EN_INSTRUCT,
            "login-signup": process.env.REACT_APP_LOGIN_EN_SIGNUP,
            "register-create": process.env.REACT_APP_REGISTER_EN_CREATEACCOUNT,
            "register-account": process.env.REACT_APP_REGISTER_EN_ACCOUNT,
            "register-username": process.env.REACT_APP_REGISTER_EN_USERNAME,
            "register-password": process.env.REACT_APP_REGISTER_EN_PASSWORD,
            "register-confirm": process.env.REACT_APP_REGISTER_EN_CONFIRMPASSWORD,
            "register-signup": process.env.REACT_APP_REGISTER_EN_SIGNUP,
            "register-welcome": process.env.REACT_APP_REGISTER_EN_WELCOMEBACK,
            "register-instruct": process.env.REACT_APP_REGISTER_EN_INSTRUCT,
            "register-sign in": process.env.REACT_APP_REGISTER_EN_SIGNIN,
            "profile-profile": process.env.REACT_APP_PROFILE_EN_PROFILE,
            "profile-content profile": process.env.REACT_APP_PROFILE_EN_CONTENTPROFILE,
            "profile-photo": process.env.REACT_APP_PROFILE_EN_PHOTO,
            "profile-change": process.env.REACT_APP_PROFILE_EN_CHANGE,
            "profile-info": process.env.REACT_APP_PROFILE_EN_INFO,
            "profile-content info": process.env.REACT_APP_PROFILE_EN_CONTENTINFO,
            "profile-firstname": process.env.REACT_APP_PROFILE_EN_FIRSTNAME,
            "profile-lastname": process.env.REACT_APP_PROFILE_EN_LASTNAME,
            "profile-email": process.env.REACT_APP_PROFILE_EN_EMAIL,
            "profile-address": process.env.REACT_APP_PROFILE_EN_ADDRESS,
            "profile-phone": process.env.REACT_APP_PROFILE_EN_PHONE,
            "profile-birthday": process.env.REACT_APP_PROFILE_EN_BIRTHDAY,
            "profile-cancel": process.env.REACT_APP_PROFILE_EN_CANCEL,
            "profile-save": process.env.REACT_APP_PROFILE_EN_SAVE,
            "content-from": process.env.REACT_APP_CONTENT_EN_FROM,
            "content-power": process.env.REACT_APP_CONTENT_EN_POWER,
            "p-detail-cart": process.env.REACT_APP_CART_EN_CART,
            "p-detail-image": process.env.REACT_APP_CART_EN_IMAGE,
            "p-detail-name": process.env.REACT_APP_CART_EN_NAME,
            "p-detail-quantity": process.env.REACT_APP_CART_EN_QUANTITY,
            "p-detail-price": process.env.REACT_APP_CART_EN_PRICE,
            "p-detail-temporary": process.env.REACT_APP_CART_EN_TEMPORARY,
            "p-detail-action": process.env.REACT_APP_CART_EN_ACTION,
            "p-detail-inCart": process.env.REACT_APP_CART_EN_INCART,
            "p-detail-total": process.env.REACT_APP_CART_EN_TOTAL,
            "p-detail-order": process.env.REACT_APP_CART_EN_ORDER,
            "od-title": process.env.REACT_APP_ORDERDETAIL_EN_TITLE,
            "pd-details": process.env.REACT_APP_PRODUCTDETAIL_EN_DETAILS,
            "pd-price": process.env.REACT_APP_PRODUCTDETAIL_EN_PRICE,
            "pd-paynow": process.env.REACT_APP_PRODUCTDETAIL_EN_PAYNOW,
            "pd-addtobag": process.env.REACT_APP_PRODUCTDETAIL_EN_ADDTOBAG,
            "pd-keyinfo": process.env.REACT_APP_PRODUCTDETAIL_EN_KEYINFO,
            "about": process.env.REACT_APP_FOOTER_EN_ABOUT,
            "policy": process.env.REACT_APP_FOOTER_EN_POLICY,
            "licensing": process.env.REACT_APP_FOOTER_EN_LICENSING,
            "contact": process.env.REACT_APP_FOOTER_EN_CONTACT,
            "db-homeucar": process.env.REACT_APP_DASHBOARD_EN_HOMEUCAR,
            "db-home": process.env.REACT_APP_DASHBOARD_EN_HOME,
            "db-build": process.env.REACT_APP_DASHBOARD_EN_BUILD,
            "db-orders": process.env.REACT_APP_DASHBOARD_EN_ORDERS,
            "db-users": process.env.REACT_APP_DASHBOARD_EN_USERS,
            "db-products": process.env.REACT_APP_DASHBOARD_EN_PRODUCTS,
            "db-manageorder": process.env.REACT_APP_DASHBOARD_EN_MANAGEORDER,
            "db-manageuser": process.env.REACT_APP_DASHBOARD_EN_MANAGEUSER,
            "db-manageproduct": process.env.REACT_APP_DASHBOARD_EN_MANAGEPRODUCT,
            "db-productinfor": process.env.REACT_APP_DASHBOARD_EN_PRODUCTINFOR,
            "db-size": process.env.REACT_APP_DASHBOARD_EN_SIZE,
            "db-power": process.env.REACT_APP_DASHBOARD_EN_POWER,
            "db-description": process.env.REACT_APP_DASHBOARD_EN_DESCRIPTION,
            "db-details": process.env.REACT_APP_DASHBOARD_EN_DETAILS,
            "db-pricing": process.env.REACT_APP_DASHBOARD_EN_PRICING,
            "db-price": process.env.REACT_APP_DASHBOARD_EN_PRICE,
            "db-media": process.env.REACT_APP_DASHBOARD_EN_MEDIA,
            "db-moreinfor": process.env.REACT_APP_DASHBOARD_EN_MOREINFOR,
            "db-type": process.env.REACT_APP_DASHBOARD_EN_TYPE,
            "db-drag": process.env.REACT_APP_DASHBOARD_EN_DRAG,
            "nf-title": process.env.REACT_APP_NOTFOUNT_EN_TITLE,
            "nf-content": process.env.REACT_APP_NOTFOUNT_EN_CONTENT,
            "cf-title": process.env.REACT_APP_CONFIRM_EN_TITLE,
            "cf-content": process.env.REACT_APP_CONFIRM_EN_CONTENT,
            "addsuccess": process.env.REACT_APP_NOTIFY_EN_ADDSUCCESS,
            "addfail": process.env.REACT_APP_NOTIFY_EN_ADDFAIL,
            "updatesuccess": process.env.REACT_APP_NOTIFY_EN_UPDATESUCCESS,
            "updatefail": process.env.REACT_APP_NOTIFY_EN_UPDATEFAIL,
            "deletesuccess": process.env.REACT_APP_NOTIFY_EN_DELETESUCCESS,
            "deletefail": process.env.REACT_APP_NOTIFY_EN_DELETEFAIL,
            "loadfail": process.env.REACT_APP_NOTIFY_EN_LOADFAIL,
            "logged": process.env.REACT_APP_NOTIFY_EN_LOGGED,
            "registersuccess": process.env.REACT_APP_NOTIFY_EN_REGISTERSUCCESS,
            "noproduct": process.env.REACT_APP_NOTIFY_EN_NOPRODUCT,
            "ordersuccess": process.env.REACT_APP_NOTIFY_EN_ORDERSUCCESS,
            "orderfail": process.env.REACT_APP_NOTIFY_EN_ORDERFAIL,
            "cancelordersuccess": process.env.REACT_APP_NOTIFY_EN_CANCELORDERSUCCESS,
            "cancelorderfail": process.env.REACT_APP_NOTIFY_EN_CANCELORDERFAIL,
            "rebuyfail": process.env.REACT_APP_NOTIFY_EN_REBUYFAIL,
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })