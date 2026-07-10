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
      "https://cdn.glitch.global/19db581c-da41-4b7c-8ab0-5c2d3f96dddd/ada_car_2.jpg";
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
