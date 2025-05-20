// @ts-nocheck
import { useEffect } from "react";

const [stdout, setStdout] = useState("");

useRemote(() => {
  "use remote";
  useEffect(() => {
    const handleStdout = (data) => {
      setStdout((prev) => [...prev, data]);
    };
    process.on("stdout", handleStdout);
    return () => {
      process.off("stdout", handleStdout);
    };
  }, []);
});

return (
  <>
    <div>{stdout}</div>
    <button
      onClick={() => {
        setStdout("");
      }}
    >
      Clear
    </button>
  </>
);
