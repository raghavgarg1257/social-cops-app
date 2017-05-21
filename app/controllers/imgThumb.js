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

            const url = req.body.url;

            http.get(url, imgRes => {

                let ext = '', imagedata = '';

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
                            console.log('image resized');
                        });

                    }); // end if write file

                }); // end of res-end

            })
            .on('error', error => {
                console.log('we have got problem: ', error);
            });



            // http.get(url, res => {
            //     res.once('data', chunk => {
            //
            //         res.destroy();
            //
            //         const { ext } = fileType(chunk);
            //
            //         im.resize({
            //             srcPath: url,
            //             dstPath: `public/images/${uuidV4()}.${ext}`,
            //             width: 50
            //         }, (err, stdout, stderr) => {
            //             if (err) throw err;
            //             console.log('image resized');
            //         });
            //
            //     });
            // });


            res.status(HTTP.OK).json({
                url
            });

        } );

};
