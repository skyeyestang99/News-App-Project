const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();

const apiKey = "705004a3-c586-45b5-99da-72b373e6f62d";
const map = {
    '': `https://content.guardianapis.com/search?api-key=${apiKey}&section=(sport|business|technology|politics)&show-blocks=all&page-size=20`,
    'sports': `https://content.guardianapis.com/sport?api-key=${apiKey}&show-blocks=all&page-size=20`,
    'business': `https://content.guardianapis.com/business?api-key=${apiKey}&show-blocks=all&page-size=20`,
    'technology': `https://content.guardianapis.com/technology?api-key=${apiKey}&show-blocks=all&page-size=20`,
    'politics': `https://content.guardianapis.com/politics?api-key=${apiKey}&show-blocks=all&page-size=20`,
    'world': `https://content.guardianapis.com/world?api-key=${apiKey}&show-blocks=all&page-size=20`,
    'science': `https://content.guardianapis.com/science?api-key=${apiKey}&show-blocks=all&page-size=20`
};

function handleJson(json) {
    // console.log(json);
    let results = json.response.results;
    let returns = [];
    let count = 0;
    for (let i = 0; i < results.length; i++) {
        if (count >= 10) return { returns };
        if (results[i].webTitle === undefined) { console.log("no webTitle"); continue; }
        if (results[i].sectionId === undefined) { console.log("no sectionId"); continue; }
        if (results[i].webPublicationDate === undefined) { console.log("no Date"); continue; }
        if (results[i].blocks.body[0].bodyTextSummary === undefined) { console.log("no description"); continue; }
        let imgUrl;
        try {
            imgUrl = results[i].blocks.main.elements[0].assets.slice(-1)[0];
        } catch (e) {
            // continue;
        }
        if (imgUrl === undefined) imgUrl = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        else imgUrl = imgUrl.file;

        returns[count] = {
            "webTitle": results[i].webTitle,
            "date": results[i].webPublicationDate,
            "description": results[i].blocks.body[0].bodyTextSummary,
            imgUrl,
            "id": results[i].id,
            url: results[i].webUrl
        };

        if (results[i].sectionId === "sport") {
            returns[count].section = "sports";
        } else returns[count].section = results[i].sectionId;
        count++;
    }
    return { "result": returns };
}

function handleSearch(json) {
    const { results } = json.response;
    let returns = [];
    for (let i = 0; i < results.length; i++) {

        if (results[i].webTitle === undefined) { console.log("no webTitle"); continue; }
        if (results[i].sectionId === undefined) { console.log("no sectionId"); continue; }
        if (results[i].webPublicationDate === undefined) { console.log("no Date"); continue; }
        if (results[i].blocks.body[0].bodyTextSummary === undefined) { console.log("no description"); continue; }
        let imgUrl;
        try {
            imgUrl = results[i].blocks.main.elements[0].assets.slice(-1)[0].file;
        } catch (e) {
            // continue;
        }
        if (imgUrl === undefined) imgUrl = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";

        returns[i] = {
            "title": results[i].webTitle,
            "date": results[i].webPublicationDate.substring(0, 10),
            "description": results[i].blocks.body[0].bodyTextSummary,
            "image": imgUrl,
            "id": results[i].id,
            "url": results[i].webUrl,
            "section": results[i].sectionId,
            "source": "guardian"
        };

    }
    return { returns };
}

function handleArticle(json) {
    const { content } = json.response;
    let result = {};
    result.title = content.webTitle;
    result.date = content.webPublicationDate.substring(0, 10);
    result.description = content.blocks.body[0].bodyTextSummary;
    result.id = content.id;
    result.source = "guardian";
    result.url = content.webUrl;
    result.section = content.sectionId;
    try {
        result.image = content.blocks.main.elements[0].assets.slice(-1)[0].file;
    } catch (e) {
        result.image = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    }
    return result;
}

router.get('/', (req, res, next) => {
    // const section = req.params.section;
    const apiUrl = map[''];
    fetch(apiUrl)
        .then(result => result.json())
        .then(json => {
            json = handleJson(json);
            res.status(200).json(json)
        });

})
router.get('/article', (req, res, next) => {
    console.log(req.query.id)
    const articleId = req.query.id;
    console.log('article');
    const apiUrl = `https://content.guardianapis.com/${articleId}?api-key=${apiKey}&show-blocks=all`
    try {
        fetch(apiUrl)
            .then(result => result.json())
            .then(json => {
                console.log(json);
                json = handleArticle(json);
                res.status(200).json(json);
            })
    } catch (e) {
        throw Error(e);
    }
})
router.get('/search', (req, res, next) => {
    // console.log(req.query.q);
    const q = req.query.q;
    const apiUrl = `https://content.guardianapis.com/search?q=${q}&api-key=${apiKey}&show-blocks=all`;
    try {
        fetch(apiUrl)
            .then(result => result.json())
            .then(json => {
                // console.log(json);
                json = handleSearch(json);
                res.status(200).json(json);
            })
    } catch (e) {
        throw Error(e);
    }

})

function handleLatest(json) {
    let results = json.response.results;
    let returns = [];
    let count = 0;
    for (let i = 0; i < results.length; i++) {
        if (count >= 10) return { returns };
        if (results[i].webTitle === undefined) { console.log("no webTitle"); continue; }
        if (results[i].sectionId === undefined) { console.log("no sectionId"); continue; }
        if (results[i].webPublicationDate === undefined) { console.log("no Date"); continue; }
        let imgUrl;
        try {
            imgUrl = results[i].fields.thumbnail;
        } catch (e) {
            // continue;
        }
        if (imgUrl === undefined) imgUrl = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        returns[count] = {
            "webTitle": results[i].webTitle,
            "date": results[i].webPublicationDate,
            imgUrl,
            "id": results[i].id,
            url: results[i].webUrl,
            "section": results[i].sectionId
        }
        count++;

    }
    return { "returns": returns };
}
router.get('/latest', (req, res, next) => {
    const apiUrl = `https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=${apiKey}`
    try {
        fetch(apiUrl)
            .then(result => result.json())
            .then(json => {
                // console.log(json);
                json = handleLatest(json);
                res.status(200).json(json);
            })
    } catch (e) {
        throw Error(e);
    }
})

const id = "sport/2020/apr/06/a-return-to-suburban-grounds-would-offer-a-chance-to-reawaken-the-afls-soul";
router.get('/:section', (req, res, next) => {
    const section = req.params.section;
    const apiUrl = map[section];
    // console.log(apiUrl)
    if (apiUrl === undefined) {
        console.log("no such url");
        throw new Error("Wrong section name!")
    } else fetch(apiUrl)
        .then(result => result.json())
        .then(json => {
            json = handleJson(json);
            res.status(200).json(json)
        });

})

module.exports = router;