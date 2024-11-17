// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useMusicStore } from "@/stores/useMusicStore";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";

// const AlbumPage = () => {
//   const { albumId } = useParams();
//   const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();

//   useEffect(() => {
//     if (albumId) fetchAlbumById(albumId);
//   }, [fetchAlbumById, albumId]);

//   if (isLoading) return null;
//   return (
//     <div className="h-full">
//       <ScrollArea className="h-full">
//         {/* main content */}
//         <div className="relative min-h-full">
//           {/* bg gradient */}
//           <div
//             className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
// 					 to-zinc-900 pointer-events-none"
//             aria-hidden="true"
//           />
//           {/* content */}
//           <div className="relative z-10">
//             <div className="flex p-6 gap-6 pb-8">
//               <img
//                 src={currentAlbum?.imageUrl}
//                 alt={currentAlbum?.title}
//                 className="w-[240px] h-[240px] shadow-xl rounded"
//               />
//               <div className="flex flex-col justify-end">
//                 <p className="text-sm font-medium">Album</p>
//                 <h1 className="text-7xl font-bold my-4">
//                   {currentAlbum?.title}
//                 </h1>
//                 <div className="flex items-center gap-2 text-sm text-zinc-100">
//                   <span className="font-medium text-white">
//                     {currentAlbum?.artist}
//                   </span>
//                   <span>• {currentAlbum?.songs.length} songs</span>
//                   <span>• {currentAlbum?.releaseYear}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </ScrollArea>
//     </div>
//   );
// };

// export default AlbumPage;

//!çalışan
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useMusicStore } from "@/stores/useMusicStore";
// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";

// const AlbumPage = () => {
//   const { albumId } = useParams<{ albumId: string }>();
//   const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
//   const [bgColor, setBgColor] = useState<string>("#5038a0"); // Varsayılan arka plan rengi
//   const imgRef = useRef<HTMLImageElement | null>(null); // Albüm kapağına referans

//   useEffect(() => {
//     if (albumId) fetchAlbumById(albumId);
//   }, [fetchAlbumById, albumId]);

//   // Albüm kapağından renk çekme işlemi
//   useEffect(() => {
//     const getColorFromImage = () => {
//       if (imgRef.current && imgRef.current.complete) {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         if (ctx) {
//           // Resmin genişlik ve yüksekliğini kontrol et
//           const width = imgRef.current.naturalWidth;
//           const height = imgRef.current.naturalHeight;

//           // Eğer resmin boyutları geçerli değilse, fonksiyonu sonlandır
//           if (width === 0 || height === 0) return;

//           canvas.width = width;
//           canvas.height = height;
//           ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

//           const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//           const pixels = imageData.data;
//           let r = 0,
//             g = 0,
//             b = 0,
//             count = 0;

//           for (let i = 0; i < pixels.length; i += 4) {
//             r += pixels[i]; // Red
//             g += pixels[i + 1]; // Green
//             b += pixels[i + 2]; // Blue
//             count++;
//           }

//           // Ortalama rengi hesapla
//           r = Math.floor(r / count);
//           g = Math.floor(g / count);
//           b = Math.floor(b / count);

//           const rgbColor = `rgb(${r},${g},${b})`;
//           setBgColor(rgbColor);
//         }
//       }
//     };

//     if (imgRef.current) {
//       if (imgRef.current.complete) {
//         getColorFromImage();
//       } else {
//         imgRef.current.addEventListener("load", getColorFromImage);
//       }

//       return () => {
//         const img = imgRef.current;
//         if (img) {
//           img.removeEventListener("load", getColorFromImage);
//         }
//       };
//     }
//   }, [currentAlbum?.imageUrl]);

//   if (isLoading) return null;

//   return (
//     <div className="h-full">
//       <ScrollArea className="h-full">
//         {/* main content */}
//         <div className="relative min-h-full">
//           {/* Dinamik bg gradient */}
//           <div
//             className="absolute inset-0 bg-gradient-to-t from-transparent via-zinc-900/80 to-black pointer-events-none"
//             style={{ backgroundColor: bgColor }} // Dinamik arka plan rengi
//             aria-hidden="true"
//           />
//           {/* content */}
//           <div className="relative z-10">
//             <div className="flex p-6 gap-6 pb-8">
//               <img
//                 src={currentAlbum?.imageUrl}
//                 alt={currentAlbum?.title}
//                 className="w-[240px] h-[240px] shadow-xl rounded"
//                 ref={imgRef} // Albüm kapağına referans
//               />
//               <div className="flex flex-col justify-end">
//                 <p className="text-sm font-medium">Album</p>
//                 <h1 className="text-7xl font-bold my-4">
//                   {currentAlbum?.title}
//                 </h1>
//                 <div className="flex items-center gap-2 text-sm text-zinc-100">
//                   <span className="font-medium text-white">
//                     {currentAlbum?.artist}
//                   </span>
//                   <span>• {currentAlbum?.songs.length} songs</span>
//                   <span>• {currentAlbum?.releaseYear}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </ScrollArea>
//     </div>
//   );
// };

// export default AlbumPage;

// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useMusicStore } from "@/stores/useMusicStore";
// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";

// const AlbumPage = () => {
//   const { albumId } = useParams<{ albumId: string }>();
//   const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
//   const [bgColor, setBgColor] = useState<string>("#5038a0"); // Varsayılan arka plan rengi
//   const imgRef = useRef<HTMLImageElement | null>(null); // Albüm kapağına referans

//   useEffect(() => {
//     if (albumId) fetchAlbumById(albumId);
//   }, [fetchAlbumById, albumId]);

//   // Albüm kapağından renk çekme işlemi
//   useEffect(() => {
//     const getColorFromImage = () => {
//       if (imgRef.current && imgRef.current.complete) {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         if (ctx) {
//           // Resmin genişlik ve yüksekliğini kontrol et
//           const width = imgRef.current.naturalWidth;
//           const height = imgRef.current.naturalHeight;

//           // Eğer resmin boyutları geçerli değilse, fonksiyonu sonlandır
//           if (width === 0 || height === 0) return;

//           canvas.width = width;
//           canvas.height = height;
//           ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

//           const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//           const pixels = imageData.data;
//           let r = 0,
//             g = 0,
//             b = 0,
//             count = 0;

//           for (let i = 0; i < pixels.length; i += 4) {
//             r += pixels[i]; // Red
//             g += pixels[i + 1]; // Green
//             b += pixels[i + 2]; // Blue
//             count++;
//           }

//           // Ortalama rengi hesapla
//           r = Math.floor(r / count);
//           g = Math.floor(g / count);
//           b = Math.floor(b / count);

//           const rgbColor = `rgb(${r},${g},${b})`;
//           setBgColor(rgbColor);
//         }
//       }
//     };

//     // Resim yüklendiğinde renk çekme işlemini başlat
//     const img = imgRef.current; // Ref'i geçici bir değişkene atıyoruz
//     if (img) {
//       if (img.complete) {
//         getColorFromImage();
//       } else {
//         img.addEventListener("load", getColorFromImage);
//       }

//       // Cleanup: Resim yüklendiğinde event listener'ı kaldır
//       return () => {
//         if (img) {
//           img.removeEventListener("load", getColorFromImage);
//         }
//       };
//     }
//   }, [currentAlbum?.imageUrl]); // Resim URL'si değiştiğinde rengi yeniden al

//   if (isLoading) return null;

//   return (
//     <div className="h-full">
//       <ScrollArea className="h-full">
//         {/* main content */}
//         <div className="relative min-h-full">
//           {/* Dinamik bg gradient */}
//           <div
//             className="absolute inset-0 bg-gradient-to-t from-transparent via-zinc-900/80 to-black pointer-events-none"
//             style={{ backgroundColor: bgColor }} // Dinamik arka plan rengi
//             aria-hidden="true"
//           />
//           {/* content */}
//           <div className="relative z-10">
//             <div className="flex p-6 gap-6 pb-8">
//               <img
//                 src={currentAlbum?.imageUrl}
//                 alt={currentAlbum?.title}
//                 className="w-[240px] h-[240px] shadow-xl rounded"
//                 ref={imgRef} // Albüm kapağına referans
//               />
//               <div className="flex flex-col justify-end">
//                 <p className="text-sm font-medium">Album</p>
//                 <h1 className="text-7xl font-bold my-4">
//                   {currentAlbum?.title}
//                 </h1>
//                 <div className="flex items-center gap-2 text-sm text-zinc-100">
//                   <span className="font-medium text-white">
//                     {currentAlbum?.artist}
//                   </span>
//                   <span>• {currentAlbum?.songs.length} songs</span>
//                   <span>• {currentAlbum?.releaseYear}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </ScrollArea>
//     </div>
//   );
// };

// export default AlbumPage;

// AlbumPage.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAlbumColor from "@/hooks/useAlbumColor"; // Custom hook'u içeri aktar

const AlbumPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();

  // Albüm verisi alındığında fetch işlemi
  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  // Albüm kapağından renk almak için custom hook'u kullanıyoruz
  const { bgColor, imgRef } = useAlbumColor(currentAlbum?.imageUrl);

  if (isLoading) return null;

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-zinc-900/80 to-black pointer-events-none"
            style={{ backgroundColor: bgColor }} // Dinamik arka plan rengi
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl rounded"
                ref={imgRef} // Albüm kapağına referans
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
