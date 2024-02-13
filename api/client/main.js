console.log('WORKING!');

const connectionStr = 'play.istealbabiesfor.fun';
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
  window.location.href = 'https://mc.istealbabiesfor.fun/api/mods';
});
