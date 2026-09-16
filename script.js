const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


// SHARE PROFILE
async function shareProfile() {

  const url = window.location.href;

  if (navigator.share) {

    try {
      await navigator.share({
        title: "PADDY'S PROFILE 17",
        text: "Check out PADDY'S digital profile.",
        url: url
      });

    } catch (error) {
      // User cancelled share
    }

  } else {

    try {
      await navigator.clipboard.writeText(url);
      showToast("PROFILE LINK COPIED");
    } catch (error) {
      showToast("COPY THIS LINK: " + url);
    }

  }
}


// TOP SHARE
document.getElementById("shareBtn")
  .addEventListener("click", shareProfile);


// PROFILE SHARE
document.getElementById("shareProfile")
  .addEventListener("click", shareProfile);


// SAVE CONTACT
document.getElementById("saveContact")
  .addEventListener("click", () => {

    const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:Prathamesh Vijay Mundhe
N:Mundhe;Prathamesh Vijay;;;
NICKNAME:PADDY
TEL;TYPE=CELL:+919130957961
EMAIL:mundheprathameshimp@gmail.com
URL:${window.location.origin}${window.location.pathname}
NOTE:Computer Engineering Student | PADDY017 | P17
END:VCARD`;

    const blob = new Blob([vcard], {
      type: "text/vcard;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "PADDY-Contact.vcf";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showToast("CONTACT FILE CREATED");

  });


// SHARE QR
document.getElementById("shareQr")
  .addEventListener("click", async () => {

    const qrImage = document.querySelector(".qr-wrap img");

    try {

      if (navigator.share && navigator.canShare) {

        const response = await fetch(qrImage.src);
        const blob = await response.blob();

        const file = new File(
          [blob],
          "PADDY-PROFILE-QR.png",
          { type: blob.type }
        );

        if (navigator.canShare({ files: [file] })) {

          await navigator.share({
            title: "PADDY'S PROFILE 17",
            text: "Scan my profile QR code.",
            files: [file]
          });

          return;
        }
      }

      await navigator.clipboard.writeText(window.location.href);
      showToast("PROFILE LINK COPIED");

    } catch (error) {

      showToast("QR SHARE CANCELLED");

    }

  });


// ACTIVE NAVIGATION
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.style.color = "";

    if (link.getAttribute("href") === "#" + current) {
      link.style.color = "#b78cff";
    }

  });

});


// SMOOTH INTERNAL LINKS
document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const target = document.querySelector(
      link.getAttribute("href")
    );

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth"
    });

  });

});


// IMAGE ERROR CHECK
document.querySelectorAll("img").forEach(img => {

  img.addEventListener("error", () => {

    console.warn(
      "Image not found:",
      img.getAttribute("src")
    );

  });

});
