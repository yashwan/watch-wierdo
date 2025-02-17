const Video = require("../models/index").Video;
const ApiError = require("../utils/ApiError")
const catchAsync = require("../utils/catchAsync")
const httpStatusCode = require("http-status")

class videoService{
    async getAllVideos(req){
        const {sortBy, title, genres, contentRating} = req.query;
        const query = {}
        if(title){
            query.title = new RegExp(title, 'i');
        }
        if(genres && genres.filter(a => a.toLowerCase() !== 'all').length){
            query.genre = {$in:genres};
        }
        if(contentRating){
            query.contentRating = contentRating;
        }
        try{
            var response;
            const videos = Video.find(query);
            switch(sortBy){
                case "releaseDate":
                    response = videos.sort({releaseDate: -1})
                    break
                case "title":
                    response = videos.sort({title: 1})
                    break
                case "viewCount":
                    response = videos.sort({viewCount: 1})
                    break
                default:
                    response = videos
            }
            const videoResp = await response
            return {videos:videoResp}
        }catch(error){
            throw new ApiError(httpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
    }
    async getVideoById({videoId}){
        try{
            const response = await Video.findOne({_id: videoId});
            if(!response){
                throw new ApiError(httpStatusCode.NOT_FOUND,"No video found with matching id")
            }
            return response
        }catch(error){
            if(error.statusCode !== "500"){
                throw new ApiError(error.statusCode, error.message)
            }
            throw new ApiError(httpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
        
    }
    async postVideo(req){
        const { videoLink, title, genre, contentRating, releaseDate, previewImage} = req.body;
        const isRecordExists = await Video.find({ videoLink, title, genre, contentRating, releaseDate});
        if(isRecordExists.length > 0){
            throw new ApiError(httpStatusCode.BAD_REQUEST,"Record Already Existed.")
        }
        var videoResp;
        try{
            videoResp = new Video({
                videoLink,
                title,
                genre,
                contentRating,
                releaseDate,
                previewImage
            })
            await videoResp.save();
        }catch(error){
            throw new ApiError(httpStatusCode.INTERNAL_SERVER_ERROR, error.message)
        }
        return videoResp
    }
    async updateViewsById(req){
        const {videoId} = req.params
        const videoResponse = await Video.findOne({_id:videoId})
        if(!videoResponse){
            throw new ApiError(httpStatusCode.NOT_FOUND, "No video found with matching id")
        }
        videoResponse.viewCount += 1
        await videoResponse.save()
        return videoResponse
    }
    async updateVotesById(req){
        const {videoId} = req.params
        const {vote, change} = req.body;
        const videoResponse = await Video.findOne({_id:videoId})
        if(!videoResponse){
            throw new ApiError(httpStatusCode.NOT_FOUND, "No video found with matching id")
        }
        if(vote === "upVote"){
            if(change === "increase"){
                videoResponse.votes.upVotes += 1
            }else{
                if(videoResponse.votes.upVotes > 0){
                    videoResponse.votes.upVotes -= 1
                }
                throw new ApiError(httpStatusCode.BAD_REQUEST, "Minimum upVotes must be 0")
            }
        }else{
            if(change === "increase"){
                videoResponse.votes.downVotes += 1
            }else{
                if(videoResponse.votes.downVotes > 0){
                    videoResponse.votes.downVotes -= 1
                }
                throw new ApiError(httpStatusCode.BAD_REQUEST, "Minimum downVotes must be 0")
            }
        }
        await videoResponse.save()
        return videoResponse
    }

}

module.exports.videoService = videoService;