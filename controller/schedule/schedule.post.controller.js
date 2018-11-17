let moment = require('moment-timezone');
const TIMEZONE        = "America/Sao_Paulo";
let dateTimeNowMidnight = moment().tz(TIMEZONE).format("YYYY-MM-DDT00:00:00.000Z");
let PostsProcess = require('../process/post.process.js');
let cronJob = require('cron').CronJob;
class SchedulePost {
    constructor(){
    }
    /* Find Posts from Reddit at 08 am every day */
    static jobFindPostsReddit(){
           var jma = new cronJob({
            cronTime: '00 00 08 * * *',
             onTick: function() {
                let monitor = new PostsProcess("https://api.reddit.com/r/artificial/hot", "GET");
                    monitor.getPosts();
           },
            start: true,
            timeZone: TIMEZONE
          });          
     }
     
}

module.exports = SchedulePost;