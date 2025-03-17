{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script> */}

  document.getElementById('downloadBtn').addEventListener('click', () => {
    // Get the content to convert
    const content = document.getElementById('content');

    // Use html2pdf to generate the PDF
    html2pdf(content, {
      margin: 1,
      filename: 'myDocument.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  });
