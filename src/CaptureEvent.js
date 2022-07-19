/* eslint-disable no-undef */
import { useContext, useState, useEffect } from "react";

import BarcodeContext from "./barcode-context.js";

function CaptureEvent() {
    const barcodeContext = useContext(BarcodeContext);
    const barcode = barcodeContext.barcode;
    console.log(barcode);
    barcodeContext.setBarcode("");

    const date = new Date();
    const dateISO = date.toISOString();

    // wrap Zebra scan into EPCIS document
    const object = {
        "type": "ObjectEvent",
        "action": "OBSERVE",
        "bizStep": "in_transit",
        "eventTime": dateISO,
        "eventTimeZoneOffset": "+02:00",
        "readPoint": {"id": "zebraID:" + "9C1214F7123F5642AA5705313F4FB874"},
        "epcList": [ barcode ],
    }
    const epcisEvent = epcis2.objectToEvent(object);
    epcisEvent.generateHashID({"example": "http://ns.example.com/epcis/"}, true);
    const documentObject = {
        "@context": ["https://gs1.github.io/EPCIS/epcis-context.jsonld",{"example": "http://ns.example.com/epcis/"}],
        "id": "https://id.example.org/document1",
        "type": "EPCISDocument",
        "schemaVersion": "2.0",
        "creationDate": dateISO,
        "epcisBody": {
            "eventList": [
                epcisEvent,
            ]
        }
    };
    const epcisDocument = new epcis2.EPCISDocument(documentObject);
    console.log(epcisDocument.toString());

    return (
        <></>
    )
}

export default CaptureEvent;