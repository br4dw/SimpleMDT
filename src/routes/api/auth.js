import { DISCORD_ENDPOINT } from '../../discord';

export async function get(req, res) {
    // redirect to our discord endpoint URL
    res.redirect(DISCORD_ENDPOINT)
}