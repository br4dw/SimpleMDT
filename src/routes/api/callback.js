const fetch = require('node-fetch');

import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } from '../../discord';

export async function get(req, res) {
    let accessCode = await req.query.code;

    const data = {
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: DISCORD_REDIRECT_URI,
        code: accessCode,
        scope: 'identify guilds'
    };

    const request = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    let response = await request.json();

    if (response.error) {
        return res.redirect('/');
    }

    const access_token = response.access_token;
    const refresh_token = response.refresh_token;
    const expiry = {
        access_token: new Date(Date.now() + response.expires_in), // 10 minutes
        refresh_token: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    }
    const cookie_options = { httpOnly: true, secure: false, sameSite: 'strict' };

    res.cookie('discoToken', access_token, { expires: expiry.access_token, ...cookie_options });
    res.cookie('discoRefresh', refresh_token, { expires: expiry.refresh_token, ...cookie_options });
    res.redirect('/');
}