# Social Cops Node JS Task

The problem statement has been uploaded in the repo.

Using ES6, with [Babel](http://babeljs.io/)

## Pre-requisite
1. NodeJS (https://nodejs.org/en/)
2. Globally installed nodemon (https://nodemon.io/)

## Setup
```
git clone git@github.com:raghavgarg1257/social-cops-app.git
cd social-cops-app
cp .env.example .env
nano .env # optional, you can set port and jwt secret
npm install
npm start # the server will be started and link will be printed in the terminal
```

## Usage (available routes)
The routes can be tested using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).

**Note** - to use protected routes an extra header needs to be added in request of format like:
```
HEADER {
    "Authorization" : "Bearer JWT_TOKEN" # note the space between keyword Bearer and JWT_TOKEN
}
```

```
type: public
req: GET /
res: text
```
```
type: public
req: POST /
res: text
```
<!-- desc: login route, user can send username and password, and recieve JWT_TOKEN for making request to protected routes. Currently no authentication process is in  -->
```
type: public
place, every username and password will be processed.
req: POST /login {
    "username" : String,
    "password" : String
}
res:{
    "message": String,
    "data": {
        "username": String,
        "token": JWT_TOKEN
    }
}
```
```
type: protected
req: POST /json-patch {
    json : JSON Object,
    patch: JSON Patch Object
}
req: JSON Object (after applying the patch)
```
```
type: protected
req: POST /img-thumb {
    url : String (valid image url)
}
res: Image
```
