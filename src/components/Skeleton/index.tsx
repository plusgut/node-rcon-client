import plusnew, { component, Props } from "@plusnew/core";
import style from "./skeleton.scss";
type props = {
  size: "mediumText";
};

export default component(__dirname, (Props: Props<props>) => (
  <Props>
    {(props) => <div class={`${style.skeleton} ${style[props.size]}`} />}
  </Props>
));
