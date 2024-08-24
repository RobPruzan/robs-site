// @ts-nocheck
const CountContext = createContext({ count: 0 });

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count }}> the special component, made by createContext
      <Child />
    </CountContext.Provider>
  );
};

const Child = () => {
  const { count } = useContext(CountContext);
  return <div> {count} </div>;
};