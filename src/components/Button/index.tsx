import plusnew, { component, Props } from "@plusnew/core";

type props = {
  disabled: boolean;
  onclick: () => void;
  label: string;
};

export default component(__dirname, (Props: Props<props>) => (
  <Props>
    {(props) => (
      <button disabled={props.disabled} onclick={props.onclick}>
        {props.label}
      </button>
    )}
  </Props>
));
