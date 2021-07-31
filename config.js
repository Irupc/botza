// Add values if you are not using env vars
const fs = require('fs');

module.exports = {
    session: JSON.parse(process.env.SESSION || fs.readFileSync(__dirname + '/session.json', { encoding: 'utf8' })), //if not using env vars create a file named session.json
    pmpermit_enabled: process.env.PMPERMIT_ENABLED || "true",
    mongodb_url: process.env.MONGODB_URL || process.env.MONGO_URL || "mongodb+srv://Gamy_Gamin:Gamy_Gamin@cluster0.wujnj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    pmpermit_mutetime: process.env.PMPERMIT_MUTETIME || "1800",
    yt_data_api_key: process.env.YT_DATA_API_KEY || "AIzaSyDg_rQe5NwCAbCeXx-I9h2Ch5uRlr5QEXQ",
    default_tr_lang: process.env.DEFAULT_TR_LANG || "si",
    enable_delete_alert: process.env.ENABLE_DELETE_ALERT || "true",
    ocr_space_api_key: process.env.OCR_SPACE_API_KEY || "7e4bfe810488957",
    infospace_api_key: process.env.INFOSPACE_API_KEY || "6zzl92aoe16bz0cgu3soyf73zu5zeu7x5p9wqn0wdq8k6v4fxuf3o",
    movie_db_url: process.env.MOVIES_IRUPC || "mongodb+srv://Gamy_Gamin:Gamy_Gamin@cluster0.ygf7l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    admin_bottom: process.env.MOVIES_BOTTOM || "©️ _Whats App Movie Bot_ by *iruPC.net*",
    admin_top: process.env.MOVIES_TOP || "💓 Visit *WhatsApp Movie Bot* for More Links 👇\n*wa.me/+94712882557*",
    limit_iru: process.env.MOVIES_LIMIT || "30"
}
