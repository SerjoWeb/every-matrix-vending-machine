import React from "react";
import VendingMachine from "./components/VendingMachine";
import ToasterProvider from "./providers/ToasterProvider";

const App = (): React.ReactElement => {
  return (
    <React.Fragment>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full max-w-[1024px] mx-auto px-5">
          <VendingMachine />
        </div>
      </div>

      <ToasterProvider />
    </React.Fragment>
  );
};

export default App;
