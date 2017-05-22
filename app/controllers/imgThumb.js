"use strict";

import im from 'imagemagick';
import uuidV4 from 'uuid/v4';
import http from 'http';
import https from 'https';
import fs from 'fs';
import fileType from 'file-type';
import validUrl from 'valid-url';

import Middlewares from "../helpers/middlewares";
import HTTP from "../helpers/httpcodes";
import { isExist } from "../helpers/methods";

export default class ImgThumb {

    constructor(router) {
        router.route('/img-thumb')

        .all(Middlewares.authenticate)

        .post(this.post);
    }

    post(req, res, next) {

        try {

            const mimeType = {
                gif: 'image/gif',
                jpg: 'image/jpeg',
                png: 'image/png',
                svg: 'image/svg+xml'
            };

            const url = req.body.url;

            if (!isExist(url)) {
                return res.status(HTTP.BAD_REQUEST).json({
                    error: 'The url is required field'
                });
            }
            else if (!validUrl.isUri(url)) {
                return res.status(HTTP.BAD_REQUEST).json({
                    error: 'The url is not valid'
                });
            }

            // https.get(url, imgRes => {
            http.get(url, imgRes => {

                let ext = null, imagedata = [], urlHasError = false;

                imgRes.once('data', chunk => {
                    const imageFileType = fileType(chunk);

                    if (!isExist(imageFileType)) {
                        urlHasError = true;
                        return res.status(HTTP.BAD_REQUEST).json({
                            error: "The url is not a valid image"
                        });
                    }
                    else {
                        ext = imageFileType.ext;
                        if (Object.keys(mimeType).indexOf(ext) == -1) {
                            urlHasError = true;
                            return res.status(HTTP.BAD_REQUEST).json({
                                error: "The url is not a valid image extension"
                            });
                        }
                    }

                });

                imgRes.on('data', chunk => {
                    imagedata = [...imagedata, chunk];
                })

                imgRes.on('end', () => {

                    if (!urlHasError) {

                        const imgName = `public/images/${uuidV4()}.${ext}`;

                        const buffer = Buffer.concat(imagedata);
                        fs.writeFile(imgName, buffer, err => {
                            if (err) throw err;

                            im.resize({
                                srcPath: imgName,
                                dstPath: imgName,
                                width: 50,
                                height: 50
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

                            }); // imagemagik resize end

                        }); // end write file

                    } // end if extension exist


                }); // end of res-end

            })
            .on('error', error => {
                return res.status(HTTP.INTERNAL_SERVER_ERROR).end('Error occured!');
            });

        } catch (e) {
            console.log('we have got an error', e);
        }


    } // post end


} // class end
