import { useContextController } from "./ContextController"

export function useColorController() {
  const MIN_DISTANCE = 100
  const BRIGHTNESS_THRESHOLD = 40;

  const contextController = useContextController()

  type Color = { r: number; g: number; b: number;};
  type HSL = {h: number, s: number, l: number}

  const hslToRgb = (hsl: HSL): Color => {
    // h,s,l: [0,1]
    let h = hsl.h
    let s = hsl.s
    let l = hsl.l

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  const rgbToHsl = (color: Color): HSL => {
    // Convert r, g, b from [0,255] to [0,1]
    let r = color.r
    let g = color.g
    let b = color.b
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    let h = 0, s = 0;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return { h, s, l }; // h, s, l ∈ [0,1]
  };

  const colorToHex = (color: Color) : string => {
    const toHex = (n: number): string => {
      const clamped = Math.max(0, Math.min(255, Math.round(n)));
      return clamped.toString(16).padStart(2, '0');
    };
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
  }

  const getRandomDarkColor = (r: number, g: number, b: number) : string => {
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    if (brightness <= BRIGHTNESS_THRESHOLD) {
      return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}` // already dark enough
    }
    // Calculate scale factor to reduce brightness to threshold
    const scale = BRIGHTNESS_THRESHOLD / brightness;
    
      r = Math.floor(r * scale)
      g = Math.floor(g * scale)
      b  = Math.floor(b * scale)
      return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`
  }

   const getRandomColor = () : Color => {
    return(
      {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      }
    )
  }

  const getColorDistance = (c1 : string, c2 : string) => {
    const [r1, g1, b1] = c1.match(/\w\w/g)!.map(x => parseInt(x, 16))
    const [r2, g2, b2] = c2.match(/\w\w/g)!.map(x => parseInt(x, 16))
    return Math.sqrt(
      (r1 - r2) ** 2 +
      (g1 - g2) ** 2 +
      (b1 - b2) ** 2
    )
  }

  const getDistinctColor = () => {
    let newColorHex : string
    let attempts = 0
    const usedColors : string[] = getUsedColors()
    do {
      let newRGBA : Color = getRandomColor()
      let newHSL : HSL = rgbToHsl(newRGBA)
      if(newHSL.s > 60) {
        newHSL.s = (newHSL.s / 100) * 60
        newRGBA = hslToRgb(newHSL)
      }
      newColorHex = colorToHex(newRGBA)
      attempts++
    } while (
      usedColors.some(c => getColorDistance(c, newColorHex) < MIN_DISTANCE) &&
      attempts < 100
    )
    usedColors.push(newColorHex)
    return newColorHex
  }

  const getUsedColors = () : string[] =>
  {
    const usedColors : string[] = contextController.getContexts().map((context) => context.color)
    return usedColors
  }

  //to use in AppProvider, without context-based usedColors that causes a circular
  // const initColors = (amount : number) : string[] =>
  // {
  //   const usedColors : string[] = []

  //   let newColorHex : string
  //   let attempts = 0
  //   for(let i = 0; i < amount; i++)
  //   {
  //     do {
  //       let newRGBA : Color = getRandomColor()
  //       let newHSL : HSL = rgbToHsl(newRGBA)
  //       if(newHSL.s > 50) {
  //         newHSL.s = (newHSL.s / 100) * 50
  //         newRGBA = hslToRgb(newHSL)
  //       }
  //       newColorHex = colorToHex(newRGBA)
  //       attempts++
  //     } while (
  //       usedColors.some(c => getColorDistance(c, newColorHex) < MIN_DISTANCE) &&
  //       attempts < 100
  //     )
  //     usedColors.push(newColorHex)
  //   }
  //   return usedColors
  // }

  return{
      getDistinctColor,
      getRandomDarkColor,
      //initColors
    }
  
}