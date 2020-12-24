import plusnew, { component, Props, store } from "@plusnew/core";
import Button from "components/Button";
import i18n from "components/i18n";
import Snackbar from "components/Snackbar";
import { LOADING } from "util/constants";
import { request } from "util/request";

type props = {
  uid: string;
};

export default component(__dirname, (Props: Props<props>) => {
  const error = store(false);

  return (
    <i18n.Consumer>
      {({ base }) => (
        <>
          <Props>
            {(props) => (
              <>
                {(["rain", "clear", "thunder"] as const).map((weather) => (
                  <Button
                    type="button"
                    disabled={false}
                    onclick={() =>
                      request("send", {
                        uid: props.uid,
                        command: `weather ${weather}`,
                      }).catch(() => error.dispatch(true))
                    }
                    label={base()?.dashboard.weather.type[weather] ?? LOADING}
                  />
                ))}
              </>
            )}
          </Props>
          <error.Observer>
            {(errorState) =>
              errorState && (
                <Snackbar
                  label={base()?.dashboard.weather.error ?? LOADING}
                  onclose={() => error.dispatch(false)}
                />
              )
            }
          </error.Observer>
        </>
      )}
    </i18n.Consumer>
  );
});
