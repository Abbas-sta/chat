import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    // username: {
    //     type: String
    // },
    email: {
        type: String
    },
    date_of_birth: {
        type: String
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"]
    },
    phone: {
        type: String,
        validate: {
            validator: function (value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: 'Phone number must be 10 digits long.'
        },
        required: false
    },
    location: {
        lat:{
            type: Number
        },
        long:{
            type: Number
        }
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    },
    state: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    login_type:{
        type:String,
        required: true,
        default: "phone"
    },
    
    profile_photo:{
        type:String,
        required: false
    },

    liked_users: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    images: [{
        type: String
    }],
    profile:{
        about:{
            type: String
        },
        interests: [],
        languages: [],
        height: {
            type: String
        },
        workout:{
            type: String
        },
        zodiac: {
            type: String
        },
        music_type: [],
        club_timing: [],
        body_type: {
            type: String
        },
        education :{
            type: String    
        },
        favourite_pet:[{
            type: String
        }],
        profession:{
            type: String
        },
        company_name: {
            type:String
        }
    },
    clubbing_bio:{
        introduction:{
            type: String
        },
        beer_preferances: [{
            type: String
        }],
        // favourite_drink:{
        //     type: String
        // },
        smoking_type: {
            type: String
        },
        drunk_activities: {
            type: String
        },
        clubbing_purpose :{
            type: String
        },
        clubbing_regularity:{
            type: String
        },
        // clubbing_personality:{
        //     type: String
        // },
        clubbing_music:[],
        relationship_goal: {
            type:String
        }
    },
    preferances:{
        min_age: {
            type: Number
        },
        max_age: {
            type: Number
        },
        distance:{
            type: Number //this is in kilometer in radius
        },
        sexual_preferance:{
            type: String // interested in men, women, non-binary
        }
    },
    credits: {
        type: Number
    },
    smoozeOffered:[
        {
            type: mongoose.Types.ObjectId,
            ref: "Smooze"
        }
    ],
    new_user: {
        type: Boolean,
        default: true
    },
    consentVerification:{
        type: Boolean,
        default: false
    },
    ageVerification:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number,
        default: Date.now()
    }
});
const User = mongoose.model('User', userSchema);

export default User;