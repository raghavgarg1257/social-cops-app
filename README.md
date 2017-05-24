# Social Cops Node JS Task

The [problem statement](https://github.com/raghavgarg1257/social-cops-app/blob/master/NodejsTask.pdf) has been uploaded in the repo.

Using ES6 syntax, with [Babel](http://babeljs.io/).


## Task Assessment
The [task progress](https://github.com/raghavgarg1257/social-cops-app/blob/master/TaskAssessment.md) according to the [NodejsTask.pdf](https://github.com/raghavgarg1257/social-cops-app/blob/master/NodejsTask.pdf).


## Pre-requisite
1. [NodeJS](https://nodejs.org/en/)
2. Globally installed [nodemon](https://nodemon.io/) (to use `npm run dev`)
3. Globally installed [istanbul](https://istanbul.js.org/) (to use `npm run cover`)


## Setup
```
git clone git@github.com:raghavgarg1257/social-cops-app.git
cd social-cops-app
cp .env.example .env
nano .env # optional, you can set port and jwt secret and sentry dns for logging errors
npm install
npm start # the server will be started and link will be printed in the terminal
```


## Usage (available routes)
The routes can be tested using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) or you can use [Swagger Docs](https://github.com/raghavgarg1257/social-cops-app/tree/master/swagger-docs-server).

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


## Test Suite
To run normal test

    npm test

To run test with code coverage report in terminal

    npm run nyc

To get code coverage report in html

    npm run cover # then open index.html in /coverage/Icov-report/index/html    


## Dockerfile
**Note:** exposed port is `8000`

To build docker image

    docker build -t node-task .

To run the docker image

    docker run -p 3000:8000 -d node-task


## Swagger Docs ([more details](https://github.com/raghavgarg1257/social-cops-app/tree/master/swagger-docs-server))
**Note:** keep a open daemon of actual server.

**Note:** To use protected route, run `/login`, then copy `token` value from it's response and paste in the top right corner of the screen, then click `explore`.

**Note:** `/img-thumb` would not be tested with it properly as an image is the response of the route and swagger is not able to show it.
```
cd swagger-docs-server
npm start # link will be printed in the terminal
```
