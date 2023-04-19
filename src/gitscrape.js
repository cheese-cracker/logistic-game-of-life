import cheerio from 'cheerio';
import axios from 'axios';

var gitScrape = async (url, callback)=> {
  try {
    const res = await axios.get(url, { headers: { 'Access-Control-Allow-Origin': '*'}})
      // console.log(res.body)
      const $ = cheerio.load(res.body)
      var activeArr = []
      $('.day').each((i, el) => {
          // var day = $(el).find('.day')
          console.log('Gotcha', i)
          // var classy = day.attr('class').text()
          // console.log(classy)
          var count = $(el).attr('data-count')
          var xpos = -(parseInt($(el).attr('x')) - 16)
          var ypos = parseInt(Number($(el).attr('y'))/15)
          console.log(count, xpos, ypos)
          if(count > 0){
              // Inverted in matrix
              activeArr.push([ypos, xpos])
          }
      })
      console.log(activeArr)
      callback(activeArr)
  } catch(err) {
    console.log('Error')
    console.log(err)
    return []
  }
}

export default gitScrape
// let myArr = gitScrape('https://github.com/cheese-cracker')
// console.log(myArr)
