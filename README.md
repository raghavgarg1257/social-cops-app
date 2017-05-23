# Social Cops Node JS Task

The problem statement has been uploaded in the repo. [link](https://github.com/raghavgarg1257/social-cops-app/blob/master/NodejsTask.pdf)

Using ES6, with [Babel](http://babeljs.io/)

## Pre-requisite
1. [NodeJS](https://nodejs.org/en/)
2. Globally installed [nodemon](https://nodemon.io/) (to use `npm run dev`)

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
res: Text
```
```
type: public
req: POST /
res: Text
```
```
desc: login route, user can send username and password, and recieve JWT_TOKEN.
    : JWT_TOKEN can be used to making request to protected routes.
    : Currently no authentication process is in place, every username and password will be processed.
type: public
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
desc: json-patch route, user can send json and patch(http://jsonpatch.com/), and recieve new json.
type: protected
req: POST /json-patch {
    json : JSON Object,
    patch: JSON Patch Object
}
req: JSON Object (after applying the patch)
```
```
desc: image thumbnail route, user can send public image url, and recieve 50x50 pixel image as response.
    : the url with 'https' will not work.
type: protected
req: POST /img-thumb {
    url : String (valid image url)
}
res: Image
```

## Dockerfile
- node image used is `node:latest`
- exposed port is `8000`
- to build docker image `docker build -t node-task .`
- to run the docker image `docker run -p 3000:8000 -d node-task`


## Swagger Docs
**Note:** keep a open daemon of actual server.

**Note:** `/img-thumb` would not be tested with it properly as an image is the response of the route and swagger is not able to show it.
```
cd swagger-docs-server
npm start # link will be printed in the terminal
```
