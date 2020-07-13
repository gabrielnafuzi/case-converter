const textBox = document.querySelector('.textBox');
const capilatizeFirst = document.querySelector('.capilatizeFirst');
const capitalizeAll = document.querySelector('.capitalizeAll');
const allToLowerCase = document.querySelector('.allToLowerCase');
const alternative = document.querySelector('.alternative');
const copyToClipBoard = document.querySelector('.copyToClipBoard');
const downloadText = document.querySelector('.downloadText');
const clearText = document.querySelector('.clearText');

capilatizeFirst.addEventListener('click', () => {
  const textValue = textBox.value;

  const textModified = capilatizeFirstLetter(textValue);

  textBox.value = textModified;
});

capitalizeAll.addEventListener('click', () => {
  const textValue = textBox.value;

  textBox.value = textValue.toUpperCase();
});

allToLowerCase.addEventListener('click', () => {
  const textValue = textBox.value;

  textBox.value = textValue.toLowerCase();
});

alternative.addEventListener('click', () => {
  const textValue = textBox.value;
  let letters = textValue.split('');

  for (let index = 0; index < letters.length; index++) {
    if (!(index % 2 == 0)) {
      letters[index] = letters[index].toUpperCase();
    }
  };

  const lettersAfter = letters.join('');

  textBox.value = lettersAfter;
});

copyToClipBoard.addEventListener('click', () => {
  const toast = document.getElementById("toast");

  textBox.select();
  document.execCommand('copy');

  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2000);
});

downloadText.addEventListener('click', () => {
  const textValue = textBox.value;

  downloadString(textValue);
})

clearText.addEventListener('click', () =>  {
  textBox.value = '';
});

function downloadString(text) {
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');

  if (text === '') return;
  
  a.download = 'text.txt';
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/txt', a.download, a.href].join(':');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => {
    URL.revokeObjectURL(a.href);
  }, 1500);
}

function capilatizeFirstLetter(text) {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}