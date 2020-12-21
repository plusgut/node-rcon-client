import plusnew, { component, store } from "@plusnew/core";
import Button from "components/Button";
import Input from "components/Input";
import { request } from "util/request";

export default component(__dirname, () => {
  const settings = store(
    { host: "", port: 25575, password: "" },
    (
      previousState,
      action:
        | { type: "host" | "password"; value: string }
        | { type: "port"; value: number }
    ) => ({ ...previousState, [action.type]: action.value })
  );

  return (
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
            onchange={(value) => settings.dispatch({ type: "password", value })}
          />
          <Button
            disabled={
              settingsState.host === "" || settingsState.password === ""
            }
            onclick={() => request("connect", settingsState)}
            label="connect"
          />
        </>
      )}
    </settings.Observer>
  );
});
