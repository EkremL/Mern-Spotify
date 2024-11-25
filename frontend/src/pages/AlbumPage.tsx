import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAlbumColor from "@/hooks/useAlbumColor";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play } from "lucide-react";
import { formatDuration } from "@/utils/formatDuration";
import { usePlayerStore } from "@/stores/usePlayerStore";

const AlbumPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  // Albüm verisi alındığında fetch işlemi
  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  // Albüm kapağından renk almak için custom hook'u kullanıyoruz
  const { bgColor, imgRef } = useAlbumColor(currentAlbum?.imageUrl);

  if (isLoading) return null;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) togglePlay();
    else {
      //start playing the album from beginning
      playAlbum(currentAlbum?.songs, 0);
    }
  };
  //handle play
  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.songs, index);
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
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
            {/* play button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all"
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className="h-7 w-7 text-black" />
                ) : (
                  <Play className="h-7 w-7 text-black" />
                )}
              </Button>
            </div>
            {/* table section */}
            <div className="bg-zinc-900 backdrop-blur-sm">
              {/* table header */}
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text text-zinc-300 border-b  border-white/5 bg-zinc-800">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              {/* songs list */}
              <div className="px-6">
                <div className="space-y-2 py-4">
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        key={song._id}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                              text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                              `}
                        onClick={() => {
                          const isCurrentSongPlaying =
                            currentSong?._id === song._id && isPlaying;
                          if (isCurrentSongPlaying) {
                            togglePlay(); // Şarkıyı durdur
                          } else {
                            handlePlaySong(index); // Yeni şarkıyı başlat
                          }
                        }}
                      >
                        {/* <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <div className="size-4 text-green-500">♫</div>
                          ) : (
                            <>
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                              <Play className="h-4 w-4 hidden group-hover:block" />
                            </>
                          )}
                        </div> */}
                        {/* <div className="flex items-center justify-center">
                          {isCurrentSong && !isPlaying ? (
                            // Duraklatılmış şarkı: ♫ yerine index numarasını yeşil yap
                            <div className="text-green-500 group-hover:hidden">
                              {index + 1}
                            </div>
                          ) : isCurrentSong ? (
                            <div className="text-green-500 group-hover:hidden">
                              ♫
                            </div>
                          ) : (
                            <span className="group-hover:hidden">
                              {index + 1}
                            </span>
                          )}
                          {!isCurrentSong &&
                          !isPlaying &&
                          currentSong?._id !== song._id ? (
                            <Play className="h-4 w-4 hidden group-hover:block text-white" />
                          ) : null}
                          {isCurrentSong &&
                          !isPlaying &&
                          currentSong?._id === song._id ? (
                            <Play className="h-4 w-4 hidden group-hover:block text-white" />
                          ) : (
                            <Pause className="h-4 w-4 hidden group-hover:block text-green-500" />
                          )}
                        </div> */}
                        <div className="flex items-center justify-center">
                          {/* Şarkı duraklatıldığında index numarasını yeşil yap */}
                          {isCurrentSong && !isPlaying ? (
                            <div className="text-green-500 group-hover:hidden">
                              {index + 1}
                            </div>
                          ) : isCurrentSong ? (
                            // Çalan şarkı: ♫ simgesi
                            <div className="text-green-500 group-hover:hidden">
                              ♫
                            </div>
                          ) : (
                            // Diğer şarkılar: sadece index numarası
                            <span className="group-hover:hidden">
                              {index + 1}
                            </span>
                          )}

                          {/* Şarkı seçilmemiş ve çalmıyorsa beyaz Play simgesi */}
                          {!isCurrentSong &&
                          !isPlaying &&
                          currentSong?._id !== song._id ? (
                            <Play className="h-4 w-4 hidden group-hover:block text-white" />
                          ) : null}

                          {/* Şarkı aktif ve duraklatılmışsa beyaz Play simgesi */}
                          {isCurrentSong &&
                          !isPlaying &&
                          currentSong?._id === song._id ? (
                            <Play className="h-4 w-4 hidden group-hover:block text-white" />
                          ) : null}

                          {/* Şarkı aktif ve çalıyorsa yeşil Pause simgesi */}
                          {isCurrentSong && isPlaying ? (
                            <Pause className="h-4 w-4 hidden group-hover:block text-green-500" />
                          ) : null}
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-10"
                          />

                          <div>
                            {isCurrentSong ? ( // Sadece aktif şarkı kontrolü
                              <div className="font-medium text-green-500">
                                {song.title}
                              </div>
                            ) : (
                              <div className="font-medium text-white">
                                {song.title}
                              </div>
                            )}
                            <div>{song.artist}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {song.createdAt.split("T")[0]}
                        </div>
                        <div className="flex items-center">
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    );
                  })}
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
