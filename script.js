// script.js
async function mergePDFs() {
  const fileInput = document.getElementById('fileInput');
  const downloadLink = document.getElementById('downloadLink');
  const pdfNameInput = document.getElementById('pdfName');
  const files = fileInput.files;

  if (files.length === 0) {
      alert('Please select at least one PDF to merge.');
      return;
  }

  if (!pdfNameInput.value) {
      alert('Please enter a name for the merged PDF.');
      return;
  }

  const mergedPdf = await PDFLib.PDFDocument.create();

  for (const file of files) {
      const pdfBytes = await file.arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      copiedPages.forEach(page => mergedPdf.addPage(page));
  }


  const mergedPdfBytes = await mergedPdf.save();


  const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  downloadLink.href = url;
  downloadLink.download = `${pdfNameInput.value}.pdf`; 
  downloadLink.style.display = 'block';
  downloadLink.innerText = 'Download Merged PDF';

  downloadLink.onclick = () => {
      downloadLink.style.display = 'none';
  };
}

document.getElementById('mergeButton').addEventListener('click', mergePDFs);
