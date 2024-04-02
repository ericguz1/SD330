    const clockElement = document.getElementById('clock');
    const powerBtn = document.getElementById('powerBtn');
    const fridgeBtn = document.getElementById('fridgeBtn');
    const tvBtn = document.getElementById('tvBtn');
    const browserBtn = document.getElementById('browserBtn');
    const fridgeImage = document.getElementById('fridgeImage');
    const tvImage = document.getElementById('tvImage');
    const browserImage = document.getElementById('browserImage');
    const infoSection = document.getElementById('infoSection');

    let powerOn = false;
    let fridgeClicked = false;
    let tvClicked = false;
    let browserClicked = false;

    window.onload = function () {
      updateTime();
      clockInterval = setInterval(updateTime, 1000);
    };

    function updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function hideImages() {
      fridgeImage.style.display = 'none';
      tvImage.style.display = 'none';
      browserImage.style.display = 'none';
    }

    function toggleFridge() {
      if (!fridgeClicked) {
        hideImages();
        fridgeImage.style.display = 'block';
        fridgeBtn.style.backgroundColor = 'green';
        tvBtn.style.backgroundColor = 'red';
        browserBtn.style.backgroundColor = 'red';
      } else {
        fridgeImage.style.display = 'none';
        fridgeBtn.style.backgroundColor = 'red';
      }
      fridgeClicked = !fridgeClicked;
    }

    function toggleTV() {
      if (!tvClicked) {
        hideImages();
        tvImage.style.display = 'block';
        tvBtn.style.backgroundColor = 'green';
        fridgeBtn.style.backgroundColor = 'red';
        browserBtn.style.backgroundColor = 'red';
      } else {
        tvImage.style.display = 'none';
        tvBtn.style.backgroundColor = 'red';
      }
      tvClicked = !tvClicked;
    }

    function toggleBrowser() {
      if (!browserClicked) {
        hideImages();
        browserImage.style.display = 'block';
        browserBtn.style.backgroundColor = 'green';
        tvBtn.style.backgroundColor = 'red';
        fridgeBtn.style.backgroundColor = 'red';
      } else {
        browserImage.style.display = 'none';
        browserBtn.style.backgroundColor = 'red';
      }
      browserClicked = !browserClicked;
    }

    function toggleImage(imageElement) {
      hideImages();
      if (imageElement.style.display === 'none') {
        imageElement.style.display = 'block';
      } else {
        imageElement.style.display = 'none';
      }
    }

    function togglePower() {
      powerOn = !powerOn;
      if (powerOn) {
        powerBtn.style.backgroundColor = 'green';
        updateTime();
        clockInterval = setInterval(updateTime, 1000);
        infoSection.style.display = 'flex';
        temperature.style.display = 'block';
        browserBtn.style.backgroundColor = 'red';
        tvBtn.style.backgroundColor = 'red';
        fridgeBtn.style.backgroundColor = 'red';
      } else {
        powerBtn.style.backgroundColor = 'red';
        clearInterval(clockInterval);
        clockElement.textContent = '';
        hideImages();
        infoSection.style.display = 'none';
        temperature.style.display = 'none';
      }
    }