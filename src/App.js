import { useEffect, useContext } from "react";

import CaptureEvent from "./CaptureEvent.js";
import BarcodeContext from "./barcode-context.js";

function App() {
  const barcodeContext = useContext(BarcodeContext);
  
  useEffect(() => {
    let tmpBarcode = "";
    document.addEventListener('keyup', (event) => {
        if (tmpBarcode.length == 0) {
          setTimeout(() => {
            if (tmpBarcode[0] === 'h') {
              tmpBarcode = "https://" + tmpBarcode.slice(13).replaceAll('-', '/');
            }
            else {
              tmpBarcode = "https://dlnkd.tn.gg/01/" + tmpBarcode;
            }
            barcodeContext.setBarcode(tmpBarcode);
            console.log("Scan detected");
            tmpBarcode = "";
          }, 500);
        }
        tmpBarcode = tmpBarcode + event.key;
    }, false);
  }, []);

  return (
    <div>{barcodeContext.barcode !== "" && <CaptureEvent />}</div>
  );
}

export default App;
