async function onStartClicked() {
  try {
    const controller = new CaptureController();
    controller.setFocusBehavior("no-focus-change");
    const stream = await navigator.mediaDevices.getDisplayMedia({ controller });
    requestWindow(stream);
  } catch (e) {
    handleError(e);
  }
}

async function requestWindow(stream) {
  try {
    const pip = await documentPictureInPicture.requestWindow({
      width: 600,
      height: 600,
    });
    const img = document.createElement("img");
    img.src =
      "https://github.com/user-attachments/assets/2ffd9b63-96cc-449b-a1d2-afbdaed8a743";
    img.style.height = "100%";
    pip.document.body.appendChild(img);

    pip.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Enter") {
        documentPictureInPicture.window.close();
      }
    });
  } catch (e) {
    handleError(e);
  }
}

function handleError(e) {
  const p = document.getElementById("errorP");
  p.innerText = e;
}

function pollTransientActivation() {
  const p = document.getElementById("transientActivationStatusP");
  const active = navigator.userActivation.isActive;
  const color = active ? "green" : "red";
  p.innerHTML = `Transient activation: <span style="color: ${color};"><strong>${active}</strong></span>`;
}

window.addEventListener("load", () => {
  pollTransientActivation();
  setInterval(pollTransientActivation, 50);
});
