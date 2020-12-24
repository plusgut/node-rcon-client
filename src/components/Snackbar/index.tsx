import plusnew, { component, PortalEntrance, Props } from "@plusnew/core";
import Skeleton from "components/Skeleton";
import { LOADING } from "util/constants";

type props = {
  label: string | typeof LOADING;
  onclose: () => void;
};

const TIMEOUT = 5000;

export default component(
  __dirname,
  (Props: Props<props>, componentInstance) => {
    const timeoutId = window.setTimeout(
      () => Props.getState().onclose(),
      TIMEOUT
    );

    componentInstance.registerLifecycleHook("componentWillUnmount", () =>
      window.clearTimeout(timeoutId)
    );
    return (
      <PortalEntrance name="snackbar">
        <Props>
          {(props) => (
            <div onclick={props.onclose}>
              {props.label === LOADING ? (
                <Skeleton size="mediumText" />
              ) : (
                props.label
              )}
            </div>
          )}
        </Props>
      </PortalEntrance>
    );
  }
);
