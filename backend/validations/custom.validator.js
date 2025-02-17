const {genre, ratings, fields} = require('../data')

const objectId = (value, helper) => {
    if(!value.match(/^[0-9a-fA-f]{24}$/)){
        return helper.message(`"{{#label}}" must be a valid mongo id`)
    }
    return value;
}

const genreValidator = (value, helper) => {
    const genreArray = value.split(",")
    const validGenre = genreArray.filter(gen => genre.includes(gen));
    if(genreArray.length !== validGenre.length){
        return helper.message(`"{{#label}}" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]`)
    }
    return genreArray
}

const genreValidator2 = (value, helper) => {
    const genreArray = value.split(",")
    const validGenre = genreArray.filter(gen => genre.includes(gen));
    if(genreArray.length !== validGenre.length){
        return helper.message(`"{{#label}}" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]`)
    }
    return value
}

const contentRatingValidator = (value, helper) => {
    const decodedStr = decodeURIComponent(value);
    const ratingsArray = decodedStr.split(",")
    const validRatings = ratingsArray.filter(gen => ratings.includes(gen));
    if(ratingsArray.length !== validRatings.length){
        return helper.message(`"{{#label}}" must be one of [${ratings}]`)
    }
    return value
}

const fieldValidator = (value, helper) => {
    const decodedStr = decodeURIComponent(value);
    if(!fields.includes(decodedStr)){
        return helper.message(`"{{#label}}" must be one of [${fields}]`)
    }
    return value
}

const dateValidator = (value, helper) => {
    if(!value.match(/^(\d{1,2})\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/)){
        return helper.message("Invalid releaseDate Field")
    }
    return value;
}

module.exports = {
    objectId,
    genreValidator,
    contentRatingValidator,
    fieldValidator,
    dateValidator,
    genreValidator2
}