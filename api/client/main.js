console.log('WORKING!');

const connectionStr = '152.53.21.200:25565';
let debounce = false;

const buttonDetails = document.getElementById('button-details');
buttonDetails.addEventListener('click', function () {
  if (debounce) return;
  debounce = true;
  navigator.clipboard.writeText(connectionStr);
  buttonDetails.textContent = 'Copied!';
  setTimeout(() => {
    buttonDetails.textContent = 'Copy IP';
    debounce = false;
  }, 1000);
});

document.getElementById('button-mods').addEventListener('click', function () {
  window.location.href = 'http://152.53.21.200/api/mods';
});
