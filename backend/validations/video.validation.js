const joi = require("joi");
const {objectId, contentRatingValidator, genreValidator, fieldValidator, dateValidator, genreValidator2} = require("./custom.validator")

const param = {
    params: joi.object().keys({
        videoId: joi.string().custom(objectId).required()
    })
}


const query = {
    query: joi.object().keys({
        title: joi.string().optional(),
        genres:joi.string().custom(genreValidator).optional(),
        contentRating:joi.string().custom(contentRatingValidator).optional(),
        sortBy:joi.string().custom(fieldValidator).optional(),
    })
}

const body = {
    body : joi.object().keys({
        videoLink: joi.string().regex(/((https|http):\/\/www\.)?youtube\.(?:com|in)\/embed\/[0-9a-zA-Z_-]{11,20}$/).required(),
        title: joi.string().required(),
        genre:joi.string().custom(genreValidator2).required(),
        contentRating:joi.string().custom(contentRatingValidator).required(),
        releaseDate:joi.string().custom(dateValidator).required(),
        previewImage: joi.string().regex(/^(http|https)/).optional()
    })
}

const voteValidation = {
    params: joi.object().keys({
        videoId: joi.string().custom(objectId).required()
    }),
    body : joi.object().keys({
        vote: joi.string().regex(/^(upVote|downVote)$/).required(),
        change:joi.string().regex(/^(increase|decrease)$/).required()
    })
}

module.exports = {
    body,
    query,
    param,
    voteValidation
}