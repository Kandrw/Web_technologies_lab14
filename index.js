document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".editable").forEach(el => {
    const savedText = localStorage.getItem(el.className);
    if (savedText) el.innerText = savedText;

    el.addEventListener("input", () => {
      localStorage.setItem(el.className, el.innerText);
    });
  });

  // Ripple эффект
  document.querySelectorAll(".ripple").forEach(button => {
    button.addEventListener("click", function(e) {
      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;

      let ripple = document.createElement("span");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Кнопка "Скачать PDF"
  document.getElementById("downloadBtn").addEventListener("click", () => {
    const resume = document.querySelector(".resume");


    html2canvas(resume).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf; 

      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 260); // Ширина и высота изображения в PDF
      pdf.save("resume.pdf");
    }).catch((error) => {
      console.error("Ошибка при создании PDF: ", error);
    });
  });
});
