import { Song } from "../models/song.model.js";

export const getAllSongs = async (req,res,next) => {
    try {
        // -1 = Descending => newest -> oldest
        // 1 = Ascending => oldest -> newest
        const songs = await Song.find().sort({createdAt: -1});
        res.json(songs);
    } catch (error) {
        next(error);
    }
};

export const getFeaturedSongs = async (req,res,next) => {
    try {
        // Fetch 6 random songs using mongodb's aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample:{size: 6}
            },
            {
                $project:{
                    // 1 means include this field while 0 means exclude it
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ]);
        res.json(songs);
    } catch (error) {
        next(error);
    }
};

export const getMadeForYouSongs = async (req,res,next) => {
    try {
        // Fetch 4 random songs using mongodb's aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    // 1 means include this field while 0 means exclude it
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ]);
        res.json(songs);
    } catch (error) {
        next(error);
    }
};

export const getTrendingSongs = async (req,res,next) => {
    try {
        // Fetch 4 random songs using mongodb's aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    // 1 means include this field while 0 means exclude it
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ]);
        res.json(songs);
    } catch (error) {
        next(error);
    }
};