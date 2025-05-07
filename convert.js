document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const convertButton = document.getElementById("convertButton");
  const outputFormatSelect = document.getElementById("outputFormat");

  convertButton.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!imageInput.files || imageInput.files.length === 0) {
      alert("Please select an image file.");
      return;
    }

    const file = imageInput.files[0];

    if (!file.type.startsWith("image/")) {
      alert("Only image files are supported.");
      return;
    }

    const selectedFormat = outputFormatSelect.value;
    const mimeType = `image/${selectedFormat}`;

    try {
      const webpBlob = await convertImageToWebP(file);
      if (webpBlob) {
        downloadWebP(webpBlob, file.name);
      }
    } catch (error) {
      console.error("Error during conversion:", error);
      alert("An error occurred during the conversion.");
    }
  });

  async function convertImageToWebP(imageFile, mimeType) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            mimeType,
            0.8 // Adjust quality (0 to 1) as needed
          );
        };
        img.onerror = () => {
          reject(new Error("Failed to load the image."));
        };
        img.src = event.target.result;
      };

      reader.onerror = () => {
        reject(new Error("Failed to read the image file."));
      };

      reader.readAsDataURL(imageFile);
    });
  }

  function downloadWebP(blob, originalName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const nameParts = originalName.split(".");
    const baseName = nameParts.slice(0, -1).join(".");
    a.download = `${baseName}.webp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});
