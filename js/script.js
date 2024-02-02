const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = 300;

  // Validate url
  if (url === "") {
    alert("Please enter a URL");
  } else {
      generateQRCode(url, size);
      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        const saveUrl = qr.querySelector("canvas").toDataURL();
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
  }
};

// Generate QR code
const generateQRCode = (url, size) => {
  clearUI();
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-button");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const saveBtnContainer = document.createElement("div");
  saveBtnContainer.id = "save-button";
  saveBtnContainer.classList = "save-button-container";

  const link = document.createElement("a");
  link.id = "save-link";
  link.classList = "save-button";
  link.innerHTML = "Save Image";

  link.href = saveUrl;
  link.download = "qrcode.png";

  saveBtnContainer.appendChild(link);

  document.getElementById("generated").appendChild(saveBtnContainer);
};

form.addEventListener("submit", onGenerateSubmit);



