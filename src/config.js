const {} = require('querystring')

export const server = "https://unibackauth.herokuapp.com" //'http://localhost:8000';
const host = 'http://localhost:3000';
const GOOGLE_CLIENT_ID = "dmy"
const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
const options = `redirect_uri=${host}&client_id=${GOOGLE_CLIENT_ID}&access_type=offline&response_type=code&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.email`

export const google_link= `${rootUrl}?${options}`;
