document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "./assets/slide1.png",
    "./assets/slide2.png",
    "./assets/slide3.png",
    "./assets/slide4.png",
  ];

  let currentIndex = 0;
  const imgElement = document.querySelector(".carousel-image");

  // Function to change image
  const showImage = (index) => {
    imgElement.src = images[index];
  };

  // Auto slide every 5s
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }, 5000);
});
