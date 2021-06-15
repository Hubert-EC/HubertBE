const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const { ExtractJwt } = require("passport-jwt");
const {
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = require("../../common/config");
const { Account, Customer } = require("../../models/Index.Model");


passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await Account.countDocuments(
          { authGoogleID: profile.id, authType: "google" },
          (err, count) => count
        );
        if (user) return done(null, user);

        const newAccount = new Account({
          authType: "google",
          authGoogleID: profile.id,
          accountName: profile.emails[0].value,
        });
        await newAccount.save();

        const newCustomer = new Customer({
          username: profile.displayName,
          firstName: profile.name.familyName,
          lastName: profile.name.givenName,
          email: profile.emails[0].value,
        });
        await newCustomer.save();

        done(null, newAccount);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await Account.countDocuments(
          { authFacebookID: profile.id, authType: "facebook" },
          (err, count) => count
        );
        if (user) return done(null, user);

        const newAccount = new Account({
          authType: "facebook",
          authFacebookID: profile.id,
          accountName: profile.emails[0].value,
        });
        await newAccount.save();

        const newCustomer = new Customer({
          email: profile.emails[0].value,
          firstName: profile.name.familyName,
          lastName: profile.name.givenName,
          username: profile.displayName,
        });
        await newCustomer.save();
        done(null, newAccount);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
