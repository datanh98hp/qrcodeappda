
var html5QrcodeScanner = new Html5QrcodeScanner(
	"reader", { fps: 10, qrbox: 250 });


const html5QrCode = new Html5Qrcode(
  "reader", { formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ] });

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    /* handle success */
    console.log(`Scan result OK: ${decodedText}`, decodedResult);
    document.getElementById('result-text').value = decodedText;
    html5QrcodeScanner.render(onScanSuccess);
    html5QrCode.pause()
    alert('OK')
};
const config = { fps: 20, qrbox: { width: 250  , height: 300 } };


// If you want to prefer front camera
html5QrCode.start({ facingMode: "user" }, config, qrCodeSuccessCallback);

function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.

    document.getElementById('result-text').value = decodedText;
    console.log(`Scan result: ${decodedText}`, decodedResult);
   
    // ^ this will stop the scanner (video feed) and clear the scan area.
}
const html5QrCodeFile = new Html5Qrcode(/* element id */ "reader-file");
// File based scanning
const fileinput = document.getElementById('qr-input-file');
fileinput.addEventListener('change', e => {
  if (e.target.files.length == 0) {
    // No file selected, ignore 
    return;
  }

  const imageFile = e.target.files[0];
  // Scan QR Code
  html5QrCodeFile.scanFile(imageFile, true)
  .then(decodedText => {
    // success, use decodedText
    console.log(decodedText);
  })
  .catch(err => {
    // failure, handle it.
    console.log(`Error scanning file. Reason: ${err}`)
  });
});
function onScanError(errorMessage) {
    console.log(errorMessage)
}
  
function copyText() {
    /* Get the text field */
    var copyText = document.getElementById("result-text");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }


