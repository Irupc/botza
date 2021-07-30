const axios = require('axios');

async function detail(url) {

    try {
        var repo = {
            user: url,
            file_name: url.split("/")[url.split("/").length-1]
        }
        if (repo.user == undefined || repo.repo == undefined) throw err
    } catch (err) {
        return {
            status: false,
            msg: "This is not a valid url."
        }
    }

    try {

        return {
            status: true,
            msg: `*Uploaded Files*`,
            data: await downloadzip(repo.user, "iruPC.net_"+repo.file_name)
        }
    } catch (err) {
        return {
            status: false,
            msg: "This repository is not available. Maybe this is not a public repository."
        }
    }
}

async function downloadzip(url, name) {
  var file_Ex = name.split(".")[name.split(".").length-1];
  if(file_Ex == "mkv" || file_Ex == "mp4" || file_Ex == "MKV" || file_Ex == "MP4"){
    var mimet = "video/"+file_Ex;
  } else{
    var mimet = "application/"+file_Ex;
  }
    try {
        return {
            status: true,
            data: Buffer.from((await axios.get(url, { responseType: 'arraybuffer' })).data).toString('base64'),
            filename: `${name}`, 
            mimetype: mimet
        }
    } catch (err) {
        return {
            status: false
        }
    }
}

module.exports = {
    detail,
}
