// steemit: @dissgo

var TelegramBot = require('./node_modules/node-telegram-bot-api');

var token = 'REPLACE_TOKEN';
var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/socialstats/, function(msg, match) {
	function konversi(UNIX_timestamp){
		  var a = new Date(UNIX_timestamp * 1000);
		  var bln = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
		  var thn = a.getFullYear();
		  var bln2 = bln[a.getMonth()];
		  var tgl = a.getDate();
		  var jam = a.getHours();
		  var menit = a.getMinutes();
		  var detik = a.getSeconds();
		  var wkt = tgl + ' ' + bln2 + ' ' + thn + ' ' + jam + ':' + menit + ':' + detik ;
		  return wkt;
	}
	
	require('request').get('https://www.cryptocompare.com/api/data/socialstats/?id=20333', (error, response, body) => {
				if (!error && response.statusCode === 200) {
					var resp = JSON.parse(body);
					var fromId = msg.chat.id;
					bot.sendMessage(fromId, "Twitter:\n"+resp.Data.Twitter.link+"\n\nFollowers:\n"+resp.Data.Twitter.followers+"\n\nReddit:\n"+resp.Data.Reddit.link+"\n\nSubscribers:\n"+resp.Data.Reddit.subscribers+"\n\nGithub:\n"+resp.Data.CodeRepository.List[0].url+"\n\nWatches:\n"+resp.Data.CodeRepository.List[0].subscribers+"\n\nStars:\n"+resp.Data.CodeRepository.List[0].stars+"\n\nForks:\n"+resp.Data.CodeRepository.List[0].forks+"\n\nLast Push:\n"+konversi(resp.Data.CodeRepository.List[0].last_push)+"");
				}
	})
});