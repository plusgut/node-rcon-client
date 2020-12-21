import plusnew, { component, Props } from "@plusnew/core";

type props = { uuid: string };

export default component(__dirname, (Props: Props<props>) => (
  <Props>{(props) => <div>{props.uuid}</div>}</Props>
));
