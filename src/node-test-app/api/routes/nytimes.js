const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();

const apiKey = "hPb2cyZHMSWJVB8YVRPho7sT7RWk7qmY";
// const apiKey="4MfAMTesv48XDl3msJSeo0I6v56f8m6n";
const testUrl = "https://www.nytimes.com/2020/04/06/sports/ncaabasketball/sister-jean-ncaa-tournament-canceled.html"

const map = {
    '':`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`,
    'sports':`https://content.guardianapis.com/sport?api-key=${apiKey}&show-blocks=all&page-size=20`,
    'business':`https://content.guardianapis.com/business?api-key=${apiKey}&show-blocks=all&page-size=20`,
    'technology':`https://content.guardianapis.com/technology?api-key=${apiKey}&show-blocks=all&page-size=20`,
    'politics':`https://content.guardianapis.com/politics?api-key=${apiKey}&show-blocks=all&page-size=20`,
    'world':`https://content.guardianapis.com/world?api-key=${apiKey}&show-blocks=all&page-size=20`
};

function handleJson(json) {
    console.log(json);
    let results = json.results;
    let returns = [];
    let count = 0;
    for (let i = 0; i < results.length;i++) {
        if (count >= 10) return {returns};
        if (results[i].title === undefined) {console.log("no webTitle");continue;}
        if (results[i].section === undefined) {console.log("no sectionId");continue;}
        if (results[i].published_date === undefined) {console.log("no Date");continue;}
        if (results[i].abstract === undefined) {console.log("no description");continue;}
        if (results[i].multimedia == undefined) {console.log("no multimedia"); continue;}
        const multimedia = results[i].multimedia;
        console.log(results[i],multimedia);
        let imgUrl = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        for (let j = 0; j < multimedia.length; j++) {
            if(multimedia[j].width >= 2000) {
                imgUrl=multimedia[j].url;
                break;
            }
        }
        returns[count] = {"webTitle":results[i].title,  "date":results[i].published_date,
            "description":results[i].abstract, imgUrl, "id":results[i].url, "url":results[i].url};
            returns[count].section = results[i].section;

            count++;
    }
    return {returns};
}


router.get('/article',(req,res,next)=> {
    console.log(req.query.id)
    const articleId = req.query.id;
    console.log('article');
    const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("${articleId}")&api-key=${apiKey}`
    // const apiUrl = `https://content.guardianapis.com/${articleId}?api-key=${apiKey}&show-blocks=all`
    try{
        fetch(apiUrl)
            .then(result => result.json())
            .then(json => {
                console.log(json);
                json = handleArticle(json.response.docs[0]);
                res.status(200).json(json);
            })
    }
    catch (e) {
        throw Error(e);
    }
})
router.get('/search',(req,res,next) => {
    const q = (req.query.q);
    const apiUrl=`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&api-key=${apiKey}`
    fetch(apiUrl)
        .then(result => result.json())
        .then(json => {
            // console.log(json);
            json = handleSearch(json);
            res.status(200).json(json)
        });
})
router.get('/', (req,res,next) => {
    // const section = req.params.section;
    // const apiUrl = map[''];
    const apiUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;
    fetch(apiUrl)
        .then(result => result.json())
        .then(json => {
            // console.log(json);
            json = handleJson(json);
            res.status(200).json(json)
        });

})
router.get('/:section', (req,res,next) => {
    const section = req.params.section;
    if (map[section] === undefined){
        console.log("no such url");
        throw new Error("Wrong section name!")
    }
    // const apiUrl = map[section];
    else {
        const apiUrl=`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`
        fetch(apiUrl)
            .then(result => result.json())
            .then(json => {
                json = handleJson(json);
                res.status(200).json(json)
            });
    }
})
function handleArticle(docs){
    // const docs = json.response.docs[0];
    let result = {};
    // console.log(docs)
    result.title = docs.headline.main;
    result.date = docs.pub_date.substring(0,10);
    result.description = docs.abstract;
    result.id = docs.web_url;
    result.source = "nytimes";
    result.url = docs.web_url;
    result.section = docs.section_name.toLowerCase();
    try{
        const {multimedia} = docs;

        let imgUrl = "";
        for (let j = 0; j < multimedia.length; j++) {
            if(multimedia[j].width >= 2000) {
                imgUrl=multimedia[j].url;
                break;
            }
        }
        result.image = `https://www.nytimes.com/${imgUrl}`;
        if(imgUrl === "") result.image = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    }
    catch (e) {
        result.image = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    }
    return result;
}

function handleSearch(json) {
    console.log(json);
    let results = json.response.docs;
    let returns = [];
    // let count = 0;
    for (let i = 0; i < results.length;i++) {
        // if (count >= 10) return {returns};
        returns[i] = handleArticle(results[i]);

    }
    return {returns};
}
module.exports = router;



