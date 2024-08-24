// @ts-nocheck
const Component = () => {
  const [a, setA] = useState(0); // how does it know it was called inside of Component?
  const [b, setB] = useState("b"); // how will it know to return "b" the next render and not 0?
};