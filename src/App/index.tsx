import plusnew, { Async, component, PortalExit, store } from "@plusnew/core";
import localStoreFactory from "util/localStoreFactory";
import { request } from "util/request";
import style from "./app.scss";
import Dashboard from "./Dashboard";
import Login from "./Login";

export default component(__dirname, () => {
  const connection = localStoreFactory("uid", null as string | null, (value) =>
    store(value)
  ); // When null, then we don't have an active connection, when filled it is the connected uid

  return (
    <div class={style.container}>
      <connection.Observer>
        {(connectionState) =>
          connectionState === null ? (
            <Login onlogin={connection.dispatch} />
          ) : (
            <Async
              key={connectionState}
              pendingIndicator={"loading..."}
              constructor={() =>
                request("status", { uid: connectionState }).catch(() => ({
                  status: "not_connected" as const,
                }))
              }
            >
              {(result) =>
                result.status === "connected" ? (
                  <Dashboard uid={connectionState} />
                ) : (
                  <Login onlogin={connection.dispatch} />
                )
              }
            </Async>
          )
        }
      </connection.Observer>
      <PortalExit name="snackbar" />
    </div>
  );
});
