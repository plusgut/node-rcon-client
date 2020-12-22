import plusnew, { component, Props } from "@plusnew/core";

type props = {
  uid: string;
};

export default component(__dirname, (Props: Props<props>) => (
  <Props>{(props) => <div />}</Props>
));
