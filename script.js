document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "./assets/slide1.png",
    "./assets/slide2.png",
    "./assets/slide3.png",
    "./assets/slide4.png",
  ];

  let index = 0;

  const track = document.querySelector(".carousel");
  if (!track) return;

  const imgNodes = track.querySelectorAll(".carousel-image");
  if (imgNodes.length < 2) return;

  const imgA = imgNodes[0]; // first frame (visible)
  const imgB = imgNodes[1]; // second frame (slides in)

  // Seed initial sources (ensure they exist even if HTML already set them)
  imgA.src = images[0];
  imgB.src = images[1];

  const advance = () => {
    const nextIndex = (index + 1) % images.length;
    imgB.src = images[nextIndex]; // stage the incoming frame (right side)

    // Slide the track left to reveal imgB
    track.style.transform = "translateX(-100%)";

    const onEnd = () => {
      track.removeEventListener("transitionend", onEnd);

      // Instantly reset track position without flicker
      track.style.transition = "none";
      track.style.transform = "translateX(0)";

      // The newly shown image becomes the base frame
      index = nextIndex;
      imgA.src = imgB.src;

      // Prepare the next-next image in imgB for the upcoming cycle
      const nextNext = (index + 1) % images.length;
      imgB.src = images[nextNext];

      // Re-enable transition for the next slide
      // (force reflow so the browser acknowledges the transition reset)
      void track.offsetWidth;
      track.style.transition = "";
    };

    track.addEventListener("transitionend", onEnd);
  };

  // Auto slide every 5s
  setInterval(advance, 5000);
});
