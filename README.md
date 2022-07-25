# Intro
This web app reads codes scanned using a Zebra scanner and creates an EPCIS 2.0 document containing the associated Digital Link and other contextual information. It can parse QR codes encoding a Digital Link and barcodes or data matrices encoding a GS1-128 code.

## Scanner setup
To get start, you need to configure the scanner in HID mode. There is no need to install the Zebra SDK or any device driver. To configure the scanner in HID mode follow [Set scanner to HID mode](https://supportcommunity.zebra.com/s/article/How-to-setup-an-LS2208-for-USB-communication?language=en_US). Once the scanner is correctly configured, it should be working as if it were a keyboard.

## Start web app

In the project directory, run:

### `npm i`

To install the required dependencies. Then:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Finally, open the console to see the output of the scan. The app has no UI. Make sure that the focus is on the browser window where the webapp is running (and not on the console) otherwise the input from the scanner will not be detected.
Also, make sure not to press the keyboard once the focus is on the webapp otherwise it will be interpreted as a scanned code and it will fail as it can't be parsed as a GS1-128 code. 

## Code explanation
Once a keyboard input is detected, the app checks if:
- the scanned code starts with “http”, we interpret it as a Digital Link (we are supposing that the user doesn’t scan QR codes that are not digital links).
- the code doesn’t start with “http”, we treat it as a GS1-128 and from it we destructure the AIs “01” and “21” and create a Digital Link with domain `https://dlnkd.tn.gg`.

In both scenarios, the Digital Link is inserteded into the `epcList` field of the EPCIS event, together with pother contextual information.