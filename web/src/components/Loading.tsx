import { Spinner } from "@fluentui/react-components";

export const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Spinner label="Loading..." appearance="primary" />;
    </div>
  );
};
