const scrapper = require('./scrapper');

scrapper.scrape("BA-06905-1921", {timeout: 10000}).then(function (res) {

    console.log(res);
})