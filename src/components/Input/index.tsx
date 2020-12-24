import plusnew, { component, Props } from "@plusnew/core";
import Skeleton from "components/Skeleton";
import { LOADING } from "util/constants";

type props = {
  label: string | typeof LOADING;
  name: string;
  autocomplete?: plusnew.JSX.IntrinsicElements["input"]["autocomplete"];
  type: "text" | "password";
  value: string;
  onchange: (value: string) => void;
};

export default component(__dirname, (Props: Props<props>) => (
  <Props>
    {(props) => (
      <>
        <label>
          {props.label === LOADING ? (
            <Skeleton size="mediumText" />
          ) : (
            props.label
          )}
          <input
            name={props.name}
            autocomplete={props.autocomplete}
            type={props.type}
            value={props.value}
            oninput={(evt) => props.onchange(evt.currentTarget.value)}
          />
        </label>
      </>
    )}
  </Props>
));
