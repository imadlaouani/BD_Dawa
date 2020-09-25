const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true,"Veuillez entrer une adresse mail."],
    unique: true,
    lowercase : true,
    validate: [isEmail,"Veuillez entrer une adresse mail valide."]
  },
  password: { type: String, 
    required: [true,"Veuillez entrer un mot de passe."],
    minlength: [6, 'Veuillez choisir un mot de passe avec au moins 6 caractères']
}
});

// we hash the password before to save the password
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

module.exports = mongoose.model("User", userSchema);
