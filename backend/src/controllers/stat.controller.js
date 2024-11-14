import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getAllStats = async (req, res, next) => {
  try {
    // const totalSongs = await Song.countDocuments(); //giving all number of songs
    // const totalUsers = await User.countDocuments(); //giving all number of users
    // const totalAlbums = await Album.countDocuments(); //giving all number of albums

    //optimized
    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),
        //fetch all songs albums and combine them, group with them unique artists and count number of artists
        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      totalSongs,
      totalUsers,
      totalAlbums,
      totalArtists: uniqueArtists[0].count || 0,
    });
  } catch (error) {
    console.error("Error in getting all stats", error);
    next(error);
  }
};
