import { createContext, useState } from "react";

const BarcodeContext = createContext({
    barcode: "",
    setBarcode: (barcode) => {},
});

export function BarcodeContextProvider(props) {

    const [detectedBarcode, setDetectedBarcode] = useState("");

    function setBarcodeHandler(barcode) {
        setDetectedBarcode(barcode);
    }

    const context = {
        barcode: detectedBarcode,
        setBarcode: setBarcodeHandler,
    };


    return (
        <BarcodeContext.Provider value={context}>
            {props.children}
        </BarcodeContext.Provider>
    )
}

export default BarcodeContext;