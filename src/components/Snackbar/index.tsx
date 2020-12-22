import plusnew, { component, PortalEntrance, Props } from "@plusnew/core";

type props = {
  label: string;
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
          {(props) => <div onclick={props.onclose}>{props.label}</div>}
        </Props>
      </PortalEntrance>
    );
  }
);
