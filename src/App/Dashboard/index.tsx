import plusnew, { component, Props } from "@plusnew/core";
import Time from "./Time";
import Weather from "./Weather";

type props = { uid: string };

export default component(__dirname, (Props: Props<props>) => (
  <Props>
    {(props) => (
      <div>
        <Time uid={props.uid} />
        <Weather uid={props.uid} />
      </div>
    )}
  </Props>
));
