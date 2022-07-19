import { useEffect, useContext } from "react";

import CaptureEvent from "./CaptureEvent.js";
import BarcodeContext from "./barcode-context.js";

function App() {
  const barcodeContext = useContext(BarcodeContext);
  
  useEffect(() => {
    let tmpBarcode = "";
    document.addEventListener('keyup', (event) => {
        console.log(`${event.key}`);
        if (tmpBarcode.length < 11) {
          tmpBarcode = tmpBarcode + event.key;
        }
        else {
          barcodeContext.setBarcode(tmpBarcode + event.key);
          console.log("Barcode detected");
          tmpBarcode = "";
        }
    }, false);
  }, []);

  return (
    <div>{barcodeContext.barcode !== "" && <CaptureEvent />}</div>
  );
}

export default App;
