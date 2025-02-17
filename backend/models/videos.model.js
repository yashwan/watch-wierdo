const mongoose = require("mongoose");
const {genre, ratings} = require('../data')


const videoSchema = mongoose.Schema({
    title: {
        type:String,
        trim: true,
    },
    videoLink: {
        type:String,
        trim: true,
        required: true
    },
    genre:{
        type:String,
        required: true,
        validate(value){
            if(!genre.includes(value)){
                throw new Error("Genre is invalid")
            }
        }
    },
    contentRating:{
        type:String,
        required: true,
        validate(value){
            if(!ratings.includes(value)){
                throw new Error("Ratings is invalid")
            }
        }
    },
    releaseDate:{
        type:String,
        required: true
    },
    previewImage:{
        type:String,
        default: 'https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940'
    },
    votes:{
        upVotes:{
            type:Number,
            default: 0,
            min: 0
        },
        downVotes:{
            type:Number,
            min: 0,
            default:0
        }
    },
    viewCount:{
        type: Number,
        default: 0
    }

})

// videoSchema.pre('save', function(next) {
//     if (this.isModified('releaseDate') && typeof this.releaseDate === 'string') {
//       this.releaseDate = new Date(this.releaseDate);
//     }
//     next();
//   });
const Video = mongoose.model("Videos", videoSchema);

module.exports.Video = Video