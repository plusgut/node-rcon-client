import plusnew, { component, PortalExit, store } from "@plusnew/core";
import i18n from "components/i18n";
import localStoreFactory from "util/localStoreFactory";
import { request } from "util/request";
import style from "./app.scss";
import Dashboard from "./Dashboard";
import Login from "./Login";

enum verifiedType {
  connected,
  notConnected,
  pending,
}
export default component(__dirname, () => {
  const connection = localStoreFactory("uid", null as string | null, (value) =>
    store(value)
  ); // When null, then we don't have an active connection, when filled it is the connected uid
  const verified = store(verifiedType.pending);

  {
    const currentConnection = connection.getState();
    if (currentConnection !== null) {
      let errored = false;
      request("status", { uid: currentConnection })
        .catch(() => {
          errored = true;
          verified.dispatch(verifiedType.notConnected);
        })
        .then(() => {
          if (errored === false) {
            verified.dispatch(verifiedType.connected);
          }
        });
    }
  }

  return (
    <i18n.Provider language={window.navigator.language.slice(0, 2)}>
      <div class={style.container}>
        <connection.Observer>
          {(connectionState) => (
            <verified.Observer>
              {(verifiedState) =>
                connectionState === null ||
                verifiedState === verifiedType.notConnected ? (
                  <Login
                    onlogin={(uid) => {
                      connection.dispatch(uid);
                      verified.dispatch(verifiedType.connected);
                    }}
                  />
                ) : verifiedState === verifiedType.pending ? (
                  "loading..."
                ) : (
                  <Dashboard uid={connectionState} />
                )
              }
            </verified.Observer>
          )}
        </connection.Observer>
        <PortalExit name="snackbar" />
      </div>
    </i18n.Provider>
  );
});
