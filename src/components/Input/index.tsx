import plusnew, { component, Props } from "@plusnew/core";

type props = {
  type: "text" | "password";
  value: string;
  onchange: (value: string) => void;
};

export default component(__dirname, (Props: Props<props>) => (
  <Props>
    {(props) => (
      <input
        type={props.type}
        value={props.value}
        oninput={(evt) => props.onchange(evt.currentTarget.value)}
      />
    )}
  </Props>
));
