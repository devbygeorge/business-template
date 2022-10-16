import QRcode from "qrcode";

export default function generateQR(text) {
  const options = {
    errorCorrectionLevel: "H",
    type: "image/png",
    quality: 1,
    margin: 0,
    color: {
      dark: "#000",
      light: "#ffffff00",
    },
  };
  return QRcode.toDataURL(text, options);
}
