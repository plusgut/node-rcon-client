import plusnew, { component, Props, store } from "@plusnew/core";
import Button from "components/Button";
import Snackbar from "components/Snackbar";
import { request } from "util/request";

type props = {
  uid: string;
};

export default component(__dirname, (Props: Props<props>) => {
  const error = store(false);

  return (
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
                label={weather}
              />
            ))}
          </>
        )}
      </Props>
      <error.Observer>
        {(errorState) =>
          errorState && (
            <Snackbar
              label="weather was not able to be set"
              onclose={() => error.dispatch(false)}
            />
          )
        }
      </error.Observer>
    </>
  );
});
