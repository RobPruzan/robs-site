// @ts-nocheck
const [stdout, setStdout] = useState("");

const [stdErr, setStdErr] = useRemote(() => {
  "use remote";
  const [stdErr, setStdErr] = useState("");

  process.on("stdout", (data) => {
    setStdout((prev) => [...prev, data]);
  });

  process.on("stderr", (data) => {
    setStdErr((prev) => [...prev, data]);
  });

  return [stdErr, setStdErr];
});

return (
  <>
    <div>
      {stdout}
      {stdErr}
    </div>
    <button
      onClick={() => {
        setStdErr("");
        setStdout("");
      }}
    >
      Clear
    </button>
  </>
);