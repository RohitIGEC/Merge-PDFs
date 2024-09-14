async function mergePDFs() {
    const fileInput = document.getElementById('fileInput');
    const downloadLink = document.getElementById('downloadLink');
    const files = fileInput.files;
  
    if (files.length === 0) {
      alert('Please select at least one PDF to merge.');
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
  
    // Create a blob and link to download the merged PDF
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = 'merged.pdf';
    downloadLink.style.display = 'block';
    downloadLink.innerText = 'Download Merged PDF';
  }
  