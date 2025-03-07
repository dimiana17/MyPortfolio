const downloadBtn = document.querySelector('.btn-sci .btn');

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'public/Dimiana-Fayek-Shafik.pdf'; // Path to your CV
    link.download = 'Dimiana-Fayek-Shafik.pdf'; // Set the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
