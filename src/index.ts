import mostCommonColor from './mostCommonColor';
import './style.scss';

const uploadInput = document.querySelector('#upload-input');
uploadInput!.addEventListener('change', async (e) => {
  const url = await imageToDom(e);
  const colors = await mostCommonColor(url);
  colors.forEach((color) => addBackgroundSegment(color));
  await showTempBackground();
  transferColorSegments();
  // show();
});

function imageToDom(e: Event): Promise<string> {
  const image = document.querySelector('img');
  return new Promise((resolve, reject) => {
    const fileInput = e.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0 && image) {
      const file = fileInput.files[0];
      const objectURL = window.URL.createObjectURL(file);
      image.src = objectURL;
      image.onload = () => resolve(objectURL);
    } else {
      alert('Could not upload image, make sure you arent an idiot');
      reject('');
    }
  });
}

function transferColorSegments() {
  const background = document.querySelector('#colors-background');
  const backgroundTemp = document.querySelector('#colors-background-temp');
  const colorSegments = backgroundTemp!.childNodes;
  const numberOfSegments = colorSegments.length;

  background!.innerHTML = '';

  for (let i = 0; i < numberOfSegments; i++) {
    background!.append(colorSegments[0]);
  }

  backgroundTemp!.innerHTML = '';
  backgroundTemp?.classList.remove('translateY-0');

  setTimeout(() => {
    background!.classList.remove('pointer-events-none');
    backgroundTemp!.classList.remove('pointer-events-none');
  }, 100);
}

async function showTempBackground() {
  document.querySelector('#colors-background')?.classList.add('pointer-events-none');
  document.querySelector('#colors-background-temp')?.classList.add('pointer-events-none');

  return new Promise((resolve) => {
    const background = document.querySelector('#colors-background-temp');
    background?.classList.add('translateY-0');
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}

function addBackgroundSegment(color: string) {
  const background = document.querySelector('#colors-background-temp');

  const colorSegment = document.createElement('div');
  colorSegment.className = 'color-segment';
  colorSegment.style.backgroundColor = color;
  colorSegment.addEventListener('click', () => {
    console.log(color);
  });

  const colorText = document.createElement('h3');
  colorText.className = 'color-text';
  colorText.innerHTML = color.toUpperCase();

  colorSegment.appendChild(colorText);
  background!.appendChild(colorSegment);
}
