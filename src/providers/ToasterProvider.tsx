import React from "react";

import { Toaster } from "react-hot-toast";

const ToasterProvider = (): React.ReactElement => {
  return ( 
    <Toaster 
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff"
        }
      }}
    /> 
  );
}
 
export default ToasterProvider;
