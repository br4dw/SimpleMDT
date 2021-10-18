import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

import cookieParser from 'cookie-parser';
import cookiesMiddleware from 'universal-cookie-express';
import { json } from 'body-parser';

import { DISCORD_API_URL, PORT } from './discord';

const fetch = require('node-fetch');
require('dotenv').config();
const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express()
    .use(cookieParser())
    .use(cookiesMiddleware())
    .use(json())
    .use(
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware({
            session: async(req, res) => {
                const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
                    headers: { 'Authorization': `Bearer ${req.cookies['discoToken']}` }
                });
                let results = await request.json();

                if (results.id) {
                    return {
                        userToken: req.cookies['discoToken'],
                        discordUser: results
                    };
                }
                return { userToken: false, discordUser: {} };
            }
        })
    )
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });