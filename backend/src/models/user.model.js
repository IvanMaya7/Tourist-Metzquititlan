const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: "admin"
    }
},
{
    timestamps: true
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = function(candidate){
    return bcrypt.compare(candidate, this.password);
}

module.exports = model("User", userSchema, "Users")