const request = require('request');
const cheerio = require('cheerio');


var gitScrape = (url, callback)=> {
    request.get(url,
        (err, res, body) => {
            if(err){
                console.log('Error');
                console.log(err);
                return [];
            }
            // console.log(body);
            const $ = cheerio.load(body);
            var activeArr = [];
            $('.day').each((i, el) => {
                // var day = $(el).find('.day');
                console.log('Gotcha', i);
                // var classy = day.attr('class').text();
                // console.log(classy);
                var count = $(el).attr('data-count');
                var xpos = -(parseInt($(el).attr('x')) - 16);
                var ypos = parseInt(Number($(el).attr('y'))/15);
                console.log(count, xpos, ypos);
                if(count > 0){
                    activeArr.push([xpos, ypos]);
                }
            });
            console.log(activeArr);
            callback(activeArr);
    });
};

export default gitScrape;
// let myArr = gitScrape('https://github.com/cheese-cracker');
// console.log(myArr);
