import { parseBarcode } from "gs1-barcode-parser-mod";
import { useEffect, useContext } from "react";

import CaptureEvent from "./CaptureEvent.js";
import IdentifierContext from "./identifier-context.js";

function App() {
  const identifierContext = useContext(IdentifierContext);
  const aiToConsider = ["01", "21"];

  useEffect(() => {
    let tmpIdentifier = "";
    document.addEventListener('keyup', (event) => {
        if (tmpIdentifier.length == 0) {
          setTimeout(() => {
            console.log(tmpIdentifier);
            let identifier;
            if (tmpIdentifier.slice(0, 4) === "http") {
                identifier = "https://" + tmpIdentifier.slice(13).replaceAll('-', '/');
            }
            else {
              identifier = "https://dlnkd.tn.gg";
              let parsedBarcode = parseBarcode(tmpIdentifier);
              for (const item of parsedBarcode.parsedCodeItems) {
                if (aiToConsider.includes(item.ai)) {
                  identifier = identifier + "/" + item.ai + "/" + item.data;
                }
              }
            }
            identifierContext.setIdentifier(identifier);
            console.log("Scan detected");
            tmpIdentifier = "";
          }, 500);
        }
        tmpIdentifier = tmpIdentifier + event.key;
    }, false);
  }, []);

  return (
    <div>{identifierContext.identifier !== "" && <CaptureEvent />}</div>
  );
}

export default App;
