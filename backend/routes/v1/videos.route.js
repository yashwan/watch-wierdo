const route = require("express").Router();
const _videoController = require('../../controllers/index').videoController;

const {body, param, query, voteValidation} = require("../../validations/video.validation");
const validate = require("../../middleware/validate")



route.get('/',validate(query), _videoController.getAllVideos)
route.get('/:videoId',validate(param), _videoController.getVideoById)
route.post('/', validate(body), _videoController.postVideo)
route.patch('/:videoId/votes',validate(param), validate(voteValidation), _videoController.updateVotesById)
route.patch('/:videoId/views',validate(param), _videoController.updateViewsById)

module.exports = route;
