import { useEffect, useState, useRef } from "react";

const useAlbumColor = (imageUrl: string | undefined) => {
  const [bgColor, setBgColor] = useState<string>("#5038a0"); // Varsayılan arka plan rengi
  const imgRef = useRef<HTMLImageElement | null>(null); // Albüm kapağına referans

  useEffect(() => {
    const getColorFromImage = () => {
      if (imgRef.current && imgRef.current.complete) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          const width = imgRef.current.naturalWidth;
          const height = imgRef.current.naturalHeight;

          if (width === 0 || height === 0) return;

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;
          let r = 0,
            g = 0,
            b = 0,
            count = 0;

          for (let i = 0; i < pixels.length; i += 4) {
            r += pixels[i]; // Red
            g += pixels[i + 1]; // Green
            b += pixels[i + 2]; // Blue
            count++;
          }

          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);

          const rgbColor = `rgb(${r},${g},${b})`;
          setBgColor(rgbColor);
        }
      }
    };

    // Resim yüklendiğinde renk çekme işlemini başlat
    const img = imgRef.current;
    if (img) {
      img.crossOrigin = "anonymous";
      if (img.complete) {
        getColorFromImage();
      } else {
        img.addEventListener("load", getColorFromImage);
      }

      return () => {
        if (img) {
          img.removeEventListener("load", getColorFromImage);
        }
      };
    }
  }, [imageUrl]); // Resim URL'si değiştiğinde rengi yeniden al

  return { bgColor, imgRef };
};

export default useAlbumColor;
