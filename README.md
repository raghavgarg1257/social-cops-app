# Social Cops Node JS Task

The problem statement has been uploaded in the repo.

Using ES6, with [Babel](http://babeljs.io/)

## Pre-requisite
- NodeJS [link](https://nodejs.org/en/)

## Setup
```
git clone git@github.com:raghavgarg1257/social-cops-app.git
cd social-cops-app
cp .env.example .env
nano .env # optional, you can set port and jwt secret
npm install
npm start # after the server will be started and link will be printed in the terminal
```

## Usage(available routes)
- Public Routes
```
req: GET /
res: text

req: POST /
res: text

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

- Protected Routes
```
Note - for below routes, you need to have an extra header set
HEADER {
    "Authorization" : "Bearer JWT_TOKEN" # note the space between keyword Bearer and JWT_TOKEN
}

req: POST /json-patch {
    json : JSON Object,
    patch: JSON Patch Object
}
req: JSON Object (after applying the patch)

req: POST /img-thumb {
    url : String (valid image url)
}
res: Image
```
