import plusnew, { component, Props, store } from "@plusnew/core";
import { LOADING } from "util/constants";
import style from "./button.scss";

type props = {
  type: "submit" | "button";
  disabled: boolean;
  onclick: () => unknown;
  label: string | typeof LOADING;
};

export default component(__dirname, (Props: Props<props>) => {
  const loading = store(false);

  return (
    <Props>
      {(props) => (
        <loading.Observer>
          {(loadingState) => (
            <button
              class={style.button}
              type={props.type}
              disabled={loadingState || props.disabled}
              onclick={() => {
                const result = props.onclick();
                if (result instanceof Promise) {
                  loading.dispatch(true);
                  result.finally(() => loading.dispatch(false));
                }
              }}
            >
              {loadingState || props.label === LOADING
                ? "loading..."
                : props.label}
            </button>
          )}
        </loading.Observer>
      )}
    </Props>
  );
});
