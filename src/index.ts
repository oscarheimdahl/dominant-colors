import { resolve } from '../webpack.config';
import mostCommonColor from './mostCommonColor';
import './style.scss';

const uploadInput = document.querySelector('#upload-input');
uploadInput!.addEventListener('change', async (e) => {
  await resetColors();

  const url = await imageToDom(e);
  const colors = await mostCommonColor(url);

  console.log(colors);

  colors.forEach((color) => addBackgroundSegment(color));
  show();
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

async function resetColors() {
  return new Promise((resolve) => {
    const background = document.querySelector('#colors-background');
    background?.classList.add('transparent');
    setTimeout(() => {
      background!.innerHTML = '';
      resolve(true);
    }, 500);
  });
}

async function show() {
  const background = document.querySelector('#colors-background');
  background?.classList.remove('transparent');
}

function addBackgroundSegment(color: string) {
  const background = document.querySelector('#colors-background');
  const colorSegment = document.createElement('div');
  colorSegment.className = 'color-segment';
  colorSegment.style.backgroundColor = color;
  background!.appendChild(colorSegment);
}
