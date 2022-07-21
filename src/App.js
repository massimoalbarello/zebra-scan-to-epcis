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
            console.log(tmpBarcode);
            let identifier;
            if (tmpBarcode.slice(0, 4) === "http") {
                identifier = "https://" + tmpBarcode.slice(13).replaceAll('-', '/');
            }
            else {
              identifier = "https://dlnkd.tn.gg/";
              let foundGS1_128 = false;
              const startIndex = tmpBarcode.indexOf("01");
              if (startIndex !== -1) {
                const remainingId = tmpBarcode.slice(startIndex+2);
                if (remainingId.length >= 14) {
                  foundGS1_128 = true;
                  identifier = identifier + ("01/" + remainingId.slice(0, 14) + "/");
                  tmpBarcode = remainingId.slice(14);
                  if (tmpBarcode.slice(0, 2) === "21") {
                    identifier = identifier + "21/" + tmpBarcode.slice(2);
                  }
                }
              }
              if (!foundGS1_128) {
                identifier += "01/" + tmpBarcode;
              }
            }
            barcodeContext.setBarcode(identifier);
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
