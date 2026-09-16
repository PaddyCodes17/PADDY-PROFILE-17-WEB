/* ================= PADDY'S PROFILE 17 ================= */

const PROFILE_URL =
  "https://paddycodes17.github.io/PADDY-PROFILE-17-WEB/";


/* ================= TOAST ================= */

function showToast(message) {

  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* ================= SHARE ================= */

async function shareProfile() {

  const shareData = {
    title: "PADDY'S PROFILE 17",
    text: "Check out PADDY'S PROFILE 17",
    url: PROFILE_URL
  };

  try {

    if (navigator.share) {

      await navigator.share(shareData);

      return;
    }

    await navigator.clipboard.writeText(PROFILE_URL);

    showToast("Profile link copied!");

  } catch (error) {

    if (error.name !== "AbortError") {

      try {

        await navigator.clipboard.writeText(PROFILE_URL);

        showToast("Profile link copied!");

      } catch {

        showToast(PROFILE_URL);
      }

    }

  }
}


/* ================= SHARE QR ================= */

async function shareQR() {

  const qrImage = document.querySelector(".qr-frame img");

  if (!qrImage) return;

  try {

    const response = await fetch(qrImage.src);

    const blob = await response.blob();

    const file = new File(
      [blob],
      "PADDY-PROFILE-17-QR.png",
      {
        type: blob.type || "image/png"
      }
    );

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {

      await navigator.share({
        title: "PADDY'S PROFILE 17",
        text: "PADDY'S PROFILE 17",
        files: [file]
      });

      return;
    }

    await navigator.clipboard.writeText(PROFILE_URL);

    showToast("Profile link copied!");

  } catch {

    try {

      await navigator.clipboard.writeText(PROFILE_URL);

      showToast("Profile link copied!");

    } catch {

      showToast("Open the QR code section to scan.");
    }

  }
}


/* ================= EVENT LISTENERS ================= */

document.addEventListener("DOMContentLoaded", () => {

  const shareBtn =
    document.getElementById("shareBtn");

  const shareProfileBtn =
    document.getElementById("shareProfile");

  const shareQrBtn =
    document.getElementById("shareQr");


  if (shareBtn) {

    shareBtn.addEventListener(
      "click",
      shareProfile
    );

  }


  if (shareProfileBtn) {

    shareProfileBtn.addEventListener(
      "click",
      shareProfile
    );

  }


  if (shareQrBtn) {

    shareQrBtn.addEventListener(
      "click",
      shareQR
    );

  }


  /* ================= SMOOTH NAVIGATION ================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (!targetId || targetId === "#") {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* ================= IMAGE ERROR CHECK ================= */

  document
    .querySelectorAll("img")
    .forEach(img => {

      img.addEventListener("error", () => {

        img.classList.add("image-error");

        if (
          img.classList.contains("profile-image")
        ) {

          img.alt =
            "Profile image unavailable";

        }

      });

    });

});
