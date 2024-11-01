const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUVIZHhEWUtuQXhnSDlNdDhKcDhMbEs0SCsyb3JhV0tFYm9uSVJacWgyOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVE5SOFpUTWd4UnZObFNmS01Cb1BQRU91TVB6Skl4NFArQjFDdDMrN3RWVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXQWE4SXhqYjM3cG9xOXpLbDA4SytCVHBkbXhVV1ZyQ1I3STlVZmtMY0ZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4U0pjN2Nxb3hEbXhJY0xTbllYekhTQUtBOGM0NkltM085clRTL05hWkVvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRKR2hRMjFmZGEyZmtEV2VNK2htLzlvT0tHZEp3U3pLVGtOY29IZnNFVUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllBWlNGUUFDQkZXczRHeW1qdWVNeXNjVWJPOFAyOGpSZUtacW5Ka2F6eDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0xsRTZGS3FJQithZXhvQzh1MG5OZFgrYndacXhseU5kRE51ekgzdEdsTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGt2ZUk5ZDR3U3lkVGFHV0JWcHNJQmJDRzJBZW4yVGJTSXJrcEZnaHFScz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVmN1diOU80dXIzMHBoc3lTTzZDYWpSd3E3dVpPSXdTNmsva0JMZ3pYODNwRzRjVzM4enNhVGZWb2QxL1ZnNzIveGYzVzJkN3R1Yy9nUFJ5bGQ2SmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE5LCJhZHZTZWNyZXRLZXkiOiJINXN3bnFPTWpHeEtNeXlTVXE3enMydG9ONHV2dksvVnptZ1hvZk9tR2dZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQwNzcwODExOTI5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjAwQUIzNjRDREQ2QUJFN0E5MDIxQjJEOTlBQkJGRUUxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzA0NDgwMTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzcwODExOTI5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjUxMDEwNTY4NDc1MjM0QUM0RTFGM0RFQjY4NzRGNUQ3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzA0NDgwMTZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImREVmFSZS1EU3FlNEpqNFlVaWtmTHciLCJwaG9uZUlkIjoiNTU0MGRjNDEtMmRiOS00YmZiLWE5NjYtYjE5MmFmOWM3OTZlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik03M25SVER5dWUrenppVTV1azdPN1lQaTdzWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQbG5Ubkk2d1EwNVFtc0RvdzlvUHJkTHAxbG89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTllZS1YzSDUiLCJtZSI6eyJpZCI6IjQwNzcwODExOTI5OjhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2VufCdlpTwnZWy8J2WhvCdlpLwnZaK8J2VufCdlpTwnZW38J2WjvCdlovwnZaKIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMWEcrYVFIRUlHVmtya0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJweWpac1NlZGl1Tll4SjVvd2M1b2dqV25sWGZWbWpJUnBsUWQzVXhoOHdJPSIsImFjY291bnRTaWduYXR1cmUiOiJBd3VXSWFFN0MvZUd0bW5Yb203eUdJbGVOdjVnM0d4cWI5ZmtGczEwYmVMVFk2OGxvTW1tYVZZTDNBSXdqQU1hTHlZQmMyakQ0UFBlbHBlSW45ZjBCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQ1BpaUhWYWs5QUtQKyt5VUVrcEdmODd4WGpBSzM1Y3k2N1dwUVg2dnhXWVpIRW1kc2ROVTBaUUhxaEExdVkyc2N2UXF0Ni94R1F6QThPVGwzbGdUaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0MDc3MDgxMTkyOTo4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFjbzJiRW5uWXJqV01TZWFNSE9hSUkxcDVWMzFab3lFYVpVSGQxTVlmTUMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzA0NDgwMTQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSnVrIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Beltahk/SCENE-MRM',
    OWNER_NAME : process.env.OWNER_NAME || "venom",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "0770811929",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ SCENE-MD-V2",
    BOT : process.env.BOT_NAME || 'SCENE_MRM',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
