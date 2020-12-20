import React, { useEffect } from "react";
import { AppStore, addToStore } from "./bin/AppStore";
import ServerConnect from "./Pages/ServerConnect";
import Dashboard from "./Pages/Dashboard";
import ServerSelect from "./Pages/ServerSelect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SnackBars from "./GlobalComponents/SnackBars";
import rcon from "./bin/RconApi";

export default function App() {
  //Create AppStore useHooks
  addToStore("connectionStatus", "updateConnectionStatus");
  addToStore("connectReady", "updateConnectReady", false);
  addToStore("connectionUID", "updateConnectionUID", null);
  addToStore("responseUID", "updateResponseUID", null);
  addToStore("response", "updateResponse", null);
  addToStore("commandSuccess", "updateCommandSuccess", false);
  addToStore("host", "updateHost", "");
  addToStore("port", "updatePort", 25575);
  addToStore("password", "updatePassword", "");
  addToStore("openSnacks", "setOpenSnacks", false, false);
  addToStore("onlineUsers", "setOnlineUsers", [], false);

  //Create Global Appstore Functions
  AppStore.sendCommand = (command, openSnackBar = true) => {
    return new Promise((resolve, reject) => {
      const uid = AppStore.connectionUID;
      rcon.send({ uid, command }).then((commandResponse) => {
        if (commandResponse.connection === "connected") {
          rcon.getResponse({ uid }).then((result) => {
            if (result.status === "success") {
              if (result.response.uid !== uid) {
                AppStore.updateResponseUID(result.response.uid);
                AppStore.updateResponse(result.response.body);
                AppStore.updateCommandSuccess(true);
              } else {
                AppStore.updateResponse(result.error);
                AppStore.updateCommandSuccess(false);
              }
            }
            AppStore.setOpenSnacks(openSnackBar);
            resolve(result);
          });
        } else {
          AppStore.updateResponse("Connection Lost");
          AppStore.updateCommandSuccess(false);
          AppStore.setOpenSnacks(openSnackBar);
          reject("couldn't connect");
        }
      });
    });
  };

  AppStore.rconConnect = async () => {
    return new Promise((resolve, reject) => {
      rcon
        .connect({
          host: AppStore.host,
          port: AppStore.port,
          password: AppStore.password
        })
        .then((results) => {
          AppStore.updateConnectionUID(results.uid);
          AppStore.updateConnectionStatus(results.status);
          if (results.status !== "connected") {
            AppStore.updateResponse("Couldn't Connect To Server");
            AppStore.updateCommandSuccess(false);
            AppStore.setOpenSnacks(true);
          }
          resolve(results);
        });
    });
  };

  useEffect(() => {
    checkConnectionReady();
  }, []);

  //update whenever port/host/password changes
  function checkConnectionReady() {
    const ready =
      AppStore.port != false &&
      AppStore.host != false &&
      AppStore.password != false;
    AppStore.updateConnectReady(ready);
  }

  //Handle Update Functions
  AppStore.handlePortUpdate = ({ target }) => {
    AppStore.updatePort(target.value);
    checkConnectionReady();
  };

  AppStore.handleHostUpdate = ({ target }) => {
    AppStore.updateHost(target.value);
    checkConnectionReady();
  };

  AppStore.handlePasswordUpdate = ({ target }) => {
    AppStore.updatePassword(target.value);
    checkConnectionReady();
  };

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <ServerConnect />
          </Route>
        </Switch>
      </Router>
      <SnackBars />
    </div>
  );
}
