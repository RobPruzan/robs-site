// @ts-nocheck
const testContext = createContext(0)
export const ContentNavbar = () => {

  if (Math.random() > .5) {
    console.log("Being called conditionally!", useContext(testContext));
  }

  return <div>this works!</div>
}