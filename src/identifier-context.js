import { createContext, useState } from "react";

const IdentifierContext = createContext({
    identifier: "",
    setIdentifier: (identifier) => {},
});

export function IdentifierContextProvider(props) {

    const [detectedIdentifier, setDetectedIdentifier] = useState("");

    function setIdentifierhandler(identifier) {
        setDetectedIdentifier(identifier);
    }

    const context = {
        identifier: detectedIdentifier,
        setIdentifier: setIdentifierhandler,
    };


    return (
        <IdentifierContext.Provider value={context}>
            {props.children}
        </IdentifierContext.Provider>
    )
}

export default IdentifierContext;