const videoService = require("../services/index").videoService
const httpsStatus = require("http-status");
const catchAsync = require("../utils/catchAsync")
const _videoService = new videoService();

const getAllVideos = catchAsync(async (req, res) =>{
        const response = await _videoService.getAllVideos(req);
        return res.status(httpsStatus.OK).send(response)
})

const getVideoById = catchAsync(async (req, res) =>{
        const response = await _videoService.getVideoById(req.params);
        console.log(response)
        return res.status(httpsStatus.OK).send(response)
})

const postVideo = catchAsync(async (req, res) =>{
    const response = await _videoService.postVideo(req);
    return res.status(httpsStatus.OK).send(response)
})

const updateViewsById = catchAsync(async (req, res) =>{
    const response = await _videoService.updateViewsById(req);
    return res.status(httpsStatus.NO_CONTENT).send(response)
})

const updateVotesById = catchAsync(async (req, res) =>{
    const response = await _videoService.updateVotesById(req);
    return res.status(httpsStatus.NO_CONTENT).send(response)
})


module.exports.videoController = {
getAllVideos,
getVideoById,
updateVotesById,
updateViewsById,
postVideo
}