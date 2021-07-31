// Coded my iruPC.net
const axios = require('axios');

const config = require('../config');
const { MongoClient } = require('mongodb');

async function mainF(keyword) {
  //console.log("main Func Start");
  const uri = config.movie_db_url;
  const client = await new MongoClient(uri, {useUnifiedTopology: true});

  try {
    await client.connect();
   //console.log("Connected to Mongo");
    
    const mydb = client.db("Cluster0").collection("-1001425546590");
    
    var key_word = keyword.replace("(", "").replace(")", "");
    //console.log(key_word);
    const replyText = await search_Movie(mydb, key_word);
    //console.log("Replay Text Returned");
    
    return replyText;

  } finally {
    await client.close();
  }
}

async function getFileId(input){
  if (input.indexOf("t.me/IruPC/")>-1 || input.indexOf("irupc.net")>-1){
    return input;
  }
  else {
    var number = input.split("/").length;
    return input.split("/")[number-1];
  }
}

async function search_Movie(mydb,searchWord) {
    //console.log("Csearch_Movie Func Start");
  
  const projection = { _id: 0, file_name: 1, file_size: 1, link: 1};

  var searchWord = await searchWord.replace(":", " ").replace("-", " ").replace("  ", " ").replace("  ", " ");
  
  const searchArray = await searchWord.split(" ");
  
  const query = await findQuesy(searchWord.split(" "));

  const cursor = await mydb.find(query).project(projection).limit(30);
    //console.log("query Generated");
  
  const allValues = await cursor.toArray();
  
  var outPut = "";
   // console.log("For Repite Start");
  for (let i = 0; i < allValues.length; i++) {
    if (allValues[i].file_size == "👍 "){
      var fileSize = "";
    } else{
      var fileSize = Math.round(allValues[i].file_size/1048576)+"MB";
    }
    var fileid = await getFileId(allValues[i].link);
    
    var file_name_without = await file_name_gen(allValues[i].file_name);
    
    if (fileid.indexOf("IruPC")>-1 || fileid.indexOf("irupc.net/")>-1){
      var tempLink = fileid; 
    } else{
      var tempoLink = `https://www.irupc.net/p/bot.html?${fileid}?${file_name_without}?size?${fileSize}`; 
      var tempLink = await getShortURL(tempoLink);
      var tempLink = tempLink.short;
    }
    fileSize = "["+fileSize+"]";
    fileSize = fileSize.replace("[1MB]", "♨️Subtitle").replace("[0MB]", "♨️Subtitle").replace("[2MB]", "♨️Subtitle").replace("[3MB]", "♨️Subtitle");
    outPut = outPut +`
*${fileSize} ${file_name_without}*
📌 ${tempLink}
`;
    var fileid = "";
    var tempLink = "";
    var fileSize = "";
    var file_name_without = "";
    outPut = outPut.replace("[NaNMB] ", "");
  }
  return outPut;
}

async function findQuesy(searchArray){
  
  if (searchArray.length>=8){
    var query = "";
  } else if (searchArray.length==1){
    var query = { 
      $text: { 
        $search: `\"${searchArray[0]}\" -zip -rar -srt -7z` 
      }
    }
  } else if (searchArray.length==2){
    var query = { 
      $text: { 
        $search: `\"${searchArray[0]}\" \"${searchArray[1]}\" -zip -rar -srt -7z` 
      }
    }
  } else if (searchArray.length==3){
    var query = { 
      $text: { 
        $search: `\"${searchArray[0]}\" \"${searchArray[1]}\" \"${searchArray[2]}\" -zip -rar -srt -7z` 
      }
    }
  } else if (searchArray.length==4){
    var query = { 
      $text: { 
        $search: `\"${searchArray[0]}\" \"${searchArray[1]}\" \"${searchArray[2]}\" \"${searchArray[3]}\" -zip -rar -srt -7z` 
      }
    }
  } else if (searchArray.length==5){
    var query = { 
      $text: { 
        $search: `\"${searchArray[0]}\" \"${searchArray[1]}\" \"${searchArray[2]}\" \"${searchArray[3]}\" \"${searchArray[4]}\" -zip -rar -srt -7z` 
      }
    }
  } else if (searchArray.length==6){
    var query = { 
      $text: { 
        $search: `\"${searchArray[0]}\" \"${searchArray[1]}\" \"${searchArray[2]}\" \"${searchArray[3]}\" \"${searchArray[4]}\" \"${searchArray[5]}\" -zip -rar -srt -7z` 
      }
    }
  } else if (searchArray.length==7){
    var query = { 
      $text: { 
        $search: `\"${searchArray[0]}\" \"${searchArray[1]}\" \"${searchArray[2]}\" \"${searchArray[3]}\" \"${searchArray[4]}\" \"${searchArray[5]}\" \"${searchArray[6]}\" -zip -rar -srt -7z` 
      }
    }
  } else{var query ="";}
  return query;
}

async function getShortURL(input) {
    var mainconfig = {
        method: 'get',
        url: `https://da.gd/s?url=${input}` 
    }
    return axios(mainconfig)
        .then(async function (response) {
            var shortened = response.data
            var out = ({
                input: input,
                short: shortened.replace(/\n/g, '').replace("da.gd", "click.irupc.xyz")
            })
            return out
        })
        .catch(function (error) {
            return "error"
        })
}

async function file_name_gen(input){
  var input = input.split(" ").join(".").split("-").join(".");
  var fileName = "";

  for(var j=0; j<input.split(".").length; j++){
      if (input.split(".")[j].startsWith("@")){
          //
      } else {
          var fileName = fileName+"."+input.split(".")[j];
      }
  } fileName = fileName.replace("_", "").replace("..", ".").replace("@candyfilms","@iruPC").replace("@intermedia","@iruPC").replace("download.new.hd.movies.from.this.telegram.channel", "");
  return fileName;
}
module.exports = {
    mainF
}
