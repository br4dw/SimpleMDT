// Misc Configuration
const production = false; // Whether or not your app is in production
const url = production ? 'https://example.com/api/callback' : 'http://localhost:3000/api/callback'; // Callback url - must match the OAuth2 redirects in the discord developer portal
export const apiUrl = 'http://localhost:5000'; // Localhost IP URL
export const PORT = 3000; // Port that the web server will run on
export const admins = [""]; // Array of Discord user ID's that will be admins

// Discord OAuth Configuration
export const DISCORD_API_URL = 'http://discordapp.com/api'; // Don't change
export const DISCORD_CLIENT_ID = ''; // Bot Client ID
export const DISCORD_CLIENT_SECRET = '' // Bot Client Secret;
export const DISCORD_REDIRECT_URI = url; // Don't change
export const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify%20guilds`; // Don't change