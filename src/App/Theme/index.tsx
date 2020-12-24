import plusnew, { component, Props } from "@plusnew/core";
import theme from "util/theme.json";

type props = { children: any };

export default component(__dirname, (Props: Props<props>) => (
  <div
    style={
      Object.fromEntries(
        Object.entries(theme).map(([key, value]) => [`--${key}`, [value]])
      ) as any
    }
  >
    <Props>{(props) => props.children}</Props>
  </div>
));
