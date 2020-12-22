import plusnew, { component, Props, store } from "@plusnew/core";

type props = {
  type: "submit";
  disabled: boolean;
  onclick: () => unknown;
  label: string;
};

export default component(__dirname, (Props: Props<props>) => {
  const loading = store(false);

  return (
    <Props>
      {(props) => (
        <loading.Observer>
          {(loadingState) => (
            <button
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
              {loadingState ? "loading..." : props.label}
            </button>
          )}
        </loading.Observer>
      )}
    </Props>
  );
});
