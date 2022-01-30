// @ts-ignore
import Vibrant from '../node_modules/node-vibrant/dist/vibrant';

async function mostCommonColor(url: string): Promise<string[]> {
  const imagePalette = await Vibrant.from(url).quality(1).getPalette();

  return [
    imagePalette.DarkMuted,
    imagePalette.DarkVibrant,
    imagePalette.LightMuted,
    imagePalette.LightVibrant,
    imagePalette.Muted,
    imagePalette.Vibrant,
  ]
    .sort((a, b) => b.getPopulation() - a.getPopulation())
    .map((c) => c.getHex());
}

export default mostCommonColor;
