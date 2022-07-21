import { useEffect, useContext } from "react";

import CaptureEvent from "./CaptureEvent.js";
import IdentifierContext from "./identifier-context.js";

function App() {
  const identifierContext = useContext(IdentifierContext);
  
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
              identifier = "https://dlnkd.tn.gg/";
              let foundGS1_128 = false;
              const startIndex = tmpIdentifier.indexOf("01");
              if (startIndex !== -1) {
                const remainingId = tmpIdentifier.slice(startIndex+2);
                if (remainingId.length >= 14) {
                  foundGS1_128 = true;
                  identifier = identifier + ("01/" + remainingId.slice(0, 14) + "/");
                  tmpIdentifier = remainingId.slice(14);
                  if (tmpIdentifier.slice(0, 2) === "21") {
                    identifier = identifier + "21/" + tmpIdentifier.slice(2);
                  }
                }
              }
              if (!foundGS1_128) {
                identifier += "01/" + tmpIdentifier;
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
