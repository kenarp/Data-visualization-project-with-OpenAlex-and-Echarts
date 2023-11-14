import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const WindowContext = createContext({
  clientHeight: null,
  clientWidth: null,
});

function WindowContextProvider({ children }) {
  // console.log(document.documentElement.clientWidth);
  // console.log(window.innerWidth);
  const getVh = useCallback(() => {
    // return document.documentElement.clientHeight || 0;
    return window.innerHeight || 0;
  }, []);
  const getVw = useCallback(() => {
    // return document.documentElement.clientWidth || 0;
    return window.innerWidth || 0;
  }, []);

  const [clientHeight, setVh] = useState(getVh());
  const [clientWidth, setVw] = useState(getVw());

  useEffect(() => {
    const handleResize = () => {
      setVh(getVh());
      setVw(getVw());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getVh, getVw]);

  return (
    <WindowContext.Provider value={{ clientHeight, clientWidth }}>
      {children}
    </WindowContext.Provider>
  );
}

function useWindowContext() {
  const context = useContext(WindowContext);

  // console.log(clientHeight, clientWidth);
  return context;
}

export { WindowContextProvider, useWindowContext };
