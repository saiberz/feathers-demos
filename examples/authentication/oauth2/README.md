# Feathers OAuth2 Authentication

An example of using Github's OAuth 2 authentication.

## To run

1. Setup a [Github App](https://github.com/settings/applications/new)
    - Set your callback URL to: `http://localhost:3030/auth/github/callback`
2. Set your `clientID` and `clientSecret` in your Feathers app.
3. `npm install`
4. `npm start`
5. Go to [localhost:3030](http://localhost:3030) in your browser.
