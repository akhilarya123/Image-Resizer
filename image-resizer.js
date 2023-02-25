// Get DOM elements
const fileUpload = document.getElementById('file-upload');
const selectSize = document.getElementById('select-size');
const selectFormat = document.getElementById('select-format');
const resizeButton = document.getElementById('resize-button');
const outputImage = document.getElementById('output-image');
const downloadLink = document.getElementById('download-link');

// Add event listener to resize button
resizeButton.addEventListener('click', () => {
  const selectedSize = selectSize.value * 1000; // Convert KB to bytes
  const selectedFormat = selectFormat.value;
  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Calculate new image dimensions based on selected size
      const scaleFactor = Math.sqrt(selectedSize / (fileUpload.files[0].size)); // Calculate the scale factor based on file size and selected size
      const newWidth = Math.round(img.width * scaleFactor);
      const newHeight = Math.round(img.height * scaleFactor);

      // Set canvas dimensions and draw compressed image
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Set output image source and make it visible
      outputImage.src = canvas.toDataURL();
      outputImage.style.display = 'block';

      // Set download link href and make it visible
      downloadLink.href = canvas.toDataURL(`image/${selectedFormat}`, 0.8);
      downloadLink.download = `compressed.${selectedFormat}`;
      downloadLink.style.display = 'inline-block';
    };

  };

  reader.readAsDataURL(fileUpload.files[0]);
});
