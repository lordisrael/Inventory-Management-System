const passport = require('passport')
const User = require('./models/user')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser((user , done) => {
  //console.log(user)
  //console.log('Serializing user:', user.id);
    done(null , user.id);
  })
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// used to deserialize the user
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        //console.log('User not found');
        return done(null, false);
      }
      //console.log('Deserialized user:', user);
      done(null, user);
    })
    .catch((err) => {
      //console.error('Error deserializing user:', err);
      done(err, null);
    });
});
// passport.deserializeUser(function (id, done) {
//     User.findById(id).then((user) => {
//       console.log('Deserialized user:', user);
//       done(null, user);
//     })
//     // User.findById(id, (err, user) => {
//     //   console.log('Deserialized user:', user);
//     //   done(err, user);
//     // });
// });

// passport.use(new GoogleStrategy({
//     clientID:     process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     //callbackURL: "http://localhost:3000/auth/google/callback",
//     callbackURL: "http://localhost:3000/api/v1/auth/google/redirect",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOne({googleId: profile.id}).then((currentUser) => {
//       if(currentUser) {
//         console.log("Existing User Found"); // Debugging statement
//         done(null, currentUser)
//         console.log(currentUser)
//       } else {
//         const randomPassword = Math.random().toString(36).substring(7); // Generate a random password
//         new User({
//           name: profile.displayName,
//           email: profile.email,
//           googleId: profile.id,
//           password: randomPassword // Set a random password
//         }).save().then((newUser) => {
//           console.log(newUser)
//           done(null, newUser)
//         })
//       }
//     })
//   }
// ));

// passport.serializeUser((user , done) => {
//   done(null , user);
// })
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/google/redirect",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if(currentUser) {
        console.log('user is ' + currentUser)
        //console.log(profile)
        done(null, currentUser)

      } else {

        function generateRandomPassword(length) {
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let password = '';
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
          }
          return password;
        }
            const randomPassword = generateRandomPassword(8);
            // const randomPassword = Math.random().toString(36).substring(7); // Generate a random password
            new User({
              name: profile.displayName,
              email: profile.email,
              googleId: profile.id,
              password: randomPassword // Set a random password
            }).save().then((newUser) => {
              done(null, newUser)
            })
      }
    })
  }
));
