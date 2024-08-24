const ComponentA = ({ children }) => {
  const [count, setCount] = useState(0);
  return <div>{children}</div>;
};
const ComponentB = () => {
  return <div>I'm component B</div>;
};
const App = () => {
  return (
    <ComponentA>
      <ComponentB />
    </ComponentA>
  );
};