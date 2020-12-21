import plusnew, { component, Props, store } from "@plusnew/core";
import Button from "components/Button";
import Input from "components/Input";
import Snackbar from "components/Snackbar";
import { request } from "util/request";

type props = {
  onlogin: (uid: string) => void;
};
export default component(__dirname, (Props: Props<props>) => {
  const settings = store(
    { host: "", port: 25575, password: "" },
    (
      previousState,
      action:
        | { type: "host" | "password"; value: string }
        | { type: "port"; value: number }
    ) => ({ ...previousState, [action.type]: action.value })
  );
  const error = store(false);

  return (
    <>
      <settings.Observer>
        {(settingsState) => (
          <>
            <Input
              type="text"
              value={settingsState.host}
              onchange={(value) =>
                settings.dispatch({ type: "host", value: value })
              }
            />

            <Input
              type="text"
              value={`${settingsState.port}`}
              onchange={(value) => {
                const parsedValue = Number(value);
                if (Number.isNaN(parsedValue) === false) {
                  settings.dispatch({ type: "port", value: parsedValue });
                }
              }}
            />
            <Input
              type="password"
              value={settingsState.password}
              onchange={(value) =>
                settings.dispatch({ type: "password", value })
              }
            />
            <Props>
              {(props) => (
                <Button
                  disabled={
                    settingsState.host === "" || settingsState.password === ""
                  }
                  onclick={() => {
                    request("connect", settingsState)
                      .then((result) => props.onlogin(result.uid))
                      .catch(() => error.dispatch(true));
                  }}
                  label="connect"
                />
              )}
            </Props>
          </>
        )}
      </settings.Observer>

      <error.Observer>
        {(errorState) =>
          errorState && (
            <Snackbar
              onclose={() => error.dispatch(false)}
              label="Error happened"
            />
          )
        }
      </error.Observer>
    </>
  );
});
