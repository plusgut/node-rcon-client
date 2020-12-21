import plusnew, { component, PortalExit, store } from "@plusnew/core";
import style from "./app.scss";
import Dashboard from "./Dashboard";
import Login from "./Login";

export default component(__dirname, () => {
  const connection = store<null | string>(null); // When null, then we don't have an active connection, when filled it is the connected UUID

  return (
    <div class={style.container}>
      <connection.Observer>
        {(connectionState) =>
          connectionState === null ? (
            <Login onlogin={connection.dispatch} />
          ) : (
            <Dashboard uuid={connectionState} />
          )
        }
      </connection.Observer>
      <PortalExit name="snackbar" />
    </div>
  );
});
