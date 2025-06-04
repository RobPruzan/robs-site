// @ts-nocheck
const [stdout, setStdout] = useState("");
const remoteProcedure = () => {
  "use server";
  process.on("stdout", (data) => setStdout((prev) => [...prev, data]));
};