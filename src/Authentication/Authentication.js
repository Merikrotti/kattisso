import React, { useState, useEffect } from "react"
import { loginPost, getUserData, getRefreshToken } from "./UserAuthentication";
import Cookies from "universal-cookie";

const config = require("../config.json");
const server = config.server;
const domainCookie = config.domainCookie

const cookies = new Cookies();

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const [userData, setUserdata] = useState();

  const toggleAuth = () => {
    setAuthenticated(!isAuthenticated);
  }

  function userLoginPromise(json) {
    return Promise.all([userLogin(json)]);
  }

  function reset() {
    setToken()
    setUserdata();
    setAuthenticated(false)
  }

  function userLogin(json) {
    return loginPost(server, json)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
            .then(json => {
              let j = json;
              let accesstoken = j.accessToken;
              let refreshtoken = j.refreshToken;
              setToken(accesstoken);
              cookies.set('accessToken', accesstoken, { path: '/', sameSite: "lax", secure: true, domain: domainCookie, expires: new Date("January 1, 2030 01:00:00") });
              cookies.set('refreshToken', refreshtoken, { path: '/', sameSite: "lax", secure: true, domain: domainCookie, expires: new Date("January 1, 2030 01:00:00") });
              setAuthenticated(true);
              return "ok"
            })
          } else {
            if (response.status === 401) {
              return "Username or password is wrong";
            }
            if (response.status === 400) {
              return "Illegal characters or illegal request";
            }
            return "Unknown error";
          }
        })
  }
  
  const resetTokens = () => {
    let refreshcookie = cookies.get("refreshToken");
    getRefreshToken(server, refreshcookie).then(response => {
      if(response.status === 200) {
        response.json()
          .then(json => {
            let j = json;
            let accesstoken = j.accessToken;
            let refreshtoken = j.refreshToken;
            cookies.set('accessToken', accesstoken, { path: '/', sameSite: "lax", secure: true, domain: domainCookie, expires: new Date("January 1, 2030 01:00:00")});
            cookies.set('refreshToken', refreshtoken, { path: '/', sameSite: "lax", secure: true, domain: domainCookie, expires: new Date("January 1, 2030 01:00:00") });
            setToken(accesstoken);
            setUserdata(undefined);
            setAuthenticated(true);
          })
      }
    })
  }

  const setUserDataf = () => {
    getUserData(server, token)
      .then(response => {
        if(response.status === 200) {
          response.json()
            .then(json => {
              setUserdata(json);
            })
        } else {
          console.log("Error setting user data, got:\n" + response.status)
        }
      })
  }

  // Check if accesstoken/refreshtoken exists -> login if so
  useEffect(() => {
    if (cookies.get("accessToken") !== undefined && !isAuthenticated) {
      let cookietoken = cookies.get("accessToken");
      getUserData(server, cookietoken).then(response => {
        if(response.status === 200) {
          response.json()
            .then(json => {
              setUserdata(json);
              setToken(cookietoken);
              setAuthenticated(true);
            })
        } else {
          cookies.remove("accessToken", { path: '/', sameSite: "lax", secure: true, domain: domainCookie, expires: new Date("January 1, 2030 01:00:00") });
        }
      });
    }

    if (cookies.get("refreshToken") !== undefined && !isAuthenticated && cookies.get("accessToken") === undefined) {
      let refreshcookie = cookies.get("refreshToken");
      getRefreshToken(server, refreshcookie).then(response => {
        if(response.status === 200) {
          response.json()
            .then(json => {
              let j = json;
              let accesstoken = j.accessToken;
              let refreshtoken = j.refreshToken;
              cookies.set('accessToken', accesstoken, { path: '/', sameSite: "lax", secure: true, domain: domainCookie, expires: new Date("January 1, 2030 01:00:00")});
              cookies.set('refreshToken', refreshtoken, { path: '/', sameSite: "lax", secure: true, domain: domainCookie, expires: new Date("January 1, 2030 01:00:00") });
              setToken(accesstoken);
              setAuthenticated(true);
            })
        } else {
          cookies.remove('refreshToken', { path: '/', sameSite: "lax", secure: true, domain: domainCookie, expires: new Date("January 1, 2030 01:00:00") });
        }
      })
    }
}, [isAuthenticated, setAuthenticated]);

  return <AuthContext.Provider value={{ isAuthenticated, token, reset, resetTokens, userData, toggleAuth, userLogin, userLoginPromise, setUserDataf }}>{props.children}</AuthContext.Provider>
}

export default AuthContextProvider;