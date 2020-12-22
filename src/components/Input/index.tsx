import plusnew, { component, Props } from "@plusnew/core";

type props = {
  name?: string;
  autocomplete?: plusnew.JSX.IntrinsicElements["input"]["autocomplete"];
  type: "text" | "password";
  value: string;
  onchange: (value: string) => void;
};

export default component(__dirname, (Props: Props<props>) => (
  <Props>
    {(props) => (
      <input
        name={props.name}
        autocomplete={props.autocomplete}
        type={props.type}
        value={props.value}
        oninput={(evt) => props.onchange(evt.currentTarget.value)}
      />
    )}
  </Props>
));
