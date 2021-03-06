// config/passport.js

// load all the things we need
var LdapStrategy = require('passport-ldapauth');

var OPTS = {
    usernameField: 'uid',
    passwordField: 'pass',
  server: {
    url: 'ldap://localhost:389',
    bindDn: 'cn=admin,o=aegee,c=eu', //TODO: use less privileged but admin user
    bindCredentials: 'aegee',
    searchBase: 'ou=people,o=aegee,c=eu',
    searchScope: 'one',
    searchFilter: '(uid={{username}})'
  }
};

// expose this function to our app using module.exports
module.exports = function(passport) {


    passport.use(new LdapStrategy(OPTS));

    //serialisation and deserialisation is necessary if you want a session
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    //TODO: Something? no, according to 
    //http://stackoverflow.com/questions/30707181/ldap-authentication-using-passport-ldapauth-npm
    //(the fact is that serialise and deserialise are kind of black magic
    // and in other examples was different....)
    passport.deserializeUser(function(user, done) { 
      done(null, user);
    });

};