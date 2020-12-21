import plusnew, { component, PortalEntrance, Props } from "@plusnew/core";

type props = {
  label: string;
  onclose: () => void;
};

export default component(__dirname, (Props: Props<props>) => (
  <PortalEntrance name="snackbar">
    <Props>{(props) => <div onclick={props.onclose}>{props.label}</div>}</Props>
  </PortalEntrance>
));
