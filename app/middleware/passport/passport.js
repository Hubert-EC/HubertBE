const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const { ExtractJwt } = require("passport-jwt");
const {
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = require("../../common/config")
const Account = require("../../models/Account.Model");
const Customer = require('../../models/Customer.Model')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await Account.findById(payload.id);
        if (!user) return done(null, false);
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const account = await Account.findOne({ accountName: email });
        if (!account) return done(null, false);

        const isCorrectPassword = await account.verifyPassword(password);
        if (!isCorrectPassword) return done(null, false);

        done(null, account);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

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
          //username: profile.displayName,
        });
        await newAccount.save();

        const newCustomer = new Customer({
          username: profile.displayName,
          firstName: profile.name.familyName,
          lastName: profile.name.givenName,
          email: profile.emails[0].value,
        })
        await newCustomer.save()
        
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
          username: profile.displayName
        })
        await newCustomer.save();
        done(null, newAccount);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
