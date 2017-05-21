"use strict";

import im from 'imagemagick';
import uuidV4 from 'uuid/v4';
import http from 'http';
import fs from 'fs';
import fileType from 'file-type';

import HTTP from "../helpers/httpcodes";
import { isExist } from "../helpers/methods";

module.exports = (router, middlewares) => {

    router.route('/img-thumb')

        .all(middlewares.authenticate)

        .post( (req, res, next) => {

            const mimeType = {
                gif: 'image/gif',
                jpg: 'image/jpeg',
                png: 'image/png',
                svg: 'image/svg+xml'
            };

            const url = req.body.url;

            if (!isExist(url)) {
                return res.status(HTTP.BAD_REQUEST).json({
                    message: 'The url is required field'
                });
            }

            http.get(url, imgRes => {

                let ext = '', imagedata = [];

                imgRes.once('data', chunk => {
                    ext = fileType(chunk).ext;
                });

                imgRes.on('data', chunk => {
                    imagedata = [...imagedata, chunk];
                })

                imgRes.on('end', () => {

                    const imgName = `public/images/${uuidV4()}.${ext}`;

                    const buffer = Buffer.concat(imagedata);
                    fs.writeFile(imgName, buffer, err => {
                        if (err) throw err;

                        im.resize({
                            srcPath: imgName,
                            dstPath: imgName,
                            width: 50
                        }, (err, stdout, stderr) => {
                            if (err) throw err;

                            var output = fs.createReadStream(imgName);
                            output.on('open', () => {
                                res.set('Content-Type', mimeType[ext]);
                                output.pipe(res);
                            });
                            output.on('error', () => {
                                return res.status(HTTP.INTERNAL_SERVER_ERROR).end('Error occured!');
                            });


                        });

                    }); // end if write file

                }); // end of res-end

            })
            .on('error', error => {
                return res.status(HTTP.INTERNAL_SERVER_ERROR).end('Error occured!');
            });

        } );

};
