//include discord.js and create a client
var Discord = require('discord.js');
var client = new Discord.Client();

//include config
//var config = "./config.json";

//store all user function
var bin = {
	"message": [],
	"echo": {},
	"setup":{
		"promptChar": "!",
		"splitChar": " "
	}
};

//export module
var app = new Object;

//setup token for glitch
if(process.env.BOT_TOKEN){
	token = process.env.BOT_TOKEN;//for glitch
}

//on ready
client.on('ready', () => {
	console.log(`=============Loged in as ${client.user.tag } ============`);
	console.log(`more information on https:\/\/github.com/simba-fs/simple`);
	console.log(`======================================================`)
});

client.on('message', msg => {
	console.log(`> ${msg.author.tag}@${msg.channel.name?msg.channel.name:"DM"} ${msg.content}`);
	console.log(`> \tmessage id ${msg.id}`);

	if(msg.content.startsWith(bin.setup.promptChar)){
		var argv = msg.content.split(bin.setup.splitChar);
		argv[0] = argv[0].substring(bin.setup.promptChar.length);
		
		//for app.message
		for(var i in bin.message){
			bin.message[i](msg, argv);
		}

		//for app.echo
		if( bin.echo[argv[0]] ){
			if(bin.echo[argv[0]].config){
				let flag = true;
				let conf = bin.echo[argv[0]].config;
				let channelId_now = msg.channel.name?msg.channel.id:"DM";
				//check channel
				if(conf.channelId && channelId_now !== conf.channelId) flag = false;
				console.log(`${conf.channelId} ${channelId_now} ${flag}`);
				//chack author
				if(conf.authorTag && msg.author.tag !== conf.authorTag) flag = false;
				console.log(`${conf.authorTag} ${msg.author.tag} ${flag}`);

				if(flag){
					msg.reply(bin.echo[argv[0]].res);
				}
			}else{
				msg.reply(bin.echo[argv[0]].res);
			}
		}
	}

});

//def app.ready() require a function
app.message = function(fun){
	bin.message.push(fun);
}

app.set = function(key, val){
	bin.setup[key] = val;
	return this;
}

app.echo = function(req, res, config){
	if(req && res){
		if(config){
			bin.echo[req] = {res: res, config: config};
		}else{
			bin.echo[req] = {res: res};
		}
	}else{
		console.log('> ERROR echo mush have two arguments at least');
	}
	return this;
}

app.login = function(token){
	client.login(token);
	return this;
}

app.command = function(){
	return this;
}

app.shortOptional = function(){

}

app.longOptional = function(){

}

app.action = function(){

}

//login
module.exports = app;
