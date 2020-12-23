const express = require('express');
const Koa = require('koa');
const Router = require('koa-router')
const cheerio = require('cheerio');
const superagent = require('superagent');
require('superagent-proxy')(superagent)

const app = new Koa()
const router = new Router()
const proxy = ''// proxy-ip
const main = async(ctx,next)=> {
  let  items = []
  await superagent.get('https://movie.douban.com/')
  .disableTLSCerts() // 使用代理的情况下证书验证会不通过
  .proxy(proxy)
  .then((res)=> {
    const $ = cheerio.load(res.text)
    $('.screening-bd .ui-slide-item').each((idx, ele) => {
      let $ele = $(ele)
      console.log('object', $ele.data('title'))
      
      $ele.data('title') && items.push({
          title: $ele.data('title'),
          region: $ele.data('region'),
          actors: $ele.data('actors'),
          rate: $ele.data('rate'),
        })
      })
    })
    ctx.body = items
    next()
}
router.get('/', main)
app.use(router.routes())
// const app = new express()
// router.get('/',  async (ctx, next) => {
   
// })

// app.get('/', function (req, res, next) {
  //     superagent.get('https://cnodejs.org/').disableTLSCerts()
  //       .proxy(proxy)
  //       .end(function (err, sres) {
    //         if (err) {
      //           return next(err);
      //         }
      //         var $ = cheerio.load(sres.text);
      //         var items = [];
      //         $('#topic_list .topic_title').each(function (idx, element) {
        //           var $element = $(element);
        //           items.push({
          //             title: $element.attr('title'),
          //             href: $element.attr('href')
          //           });
//         });

//         res.send(items);
//       });
//   });
// app.use(router.routes())

app.listen(3000, function(){
    console.log('app is listening at port 3000');
})
