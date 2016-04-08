# Feathers Auth0 Authentcation

An example of using Auth0 to authenticate.

## To run

1. Sign up for Auth0
2. Setup your app
    - Set your "Allowed callback URLs" to: `http://localhost:3030/auth/auth0/callback`
    - Set your "Allowed Logout URLs" to: `http://localhost:3030/`
3. Add a test user
4. Set your `clientID` and `clientSecret` in the Feathers app
5. `npm install`
6. `npm start`
7. Go to [localhost:3030](http://localhost:3030) in your browser.