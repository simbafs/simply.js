//include discord.js and create a client
var chalk = require('chalk');
var {Client, RichEmbed} = require('discord.js');
var client = new Client();

//include config
//var config = "./config.json";

//define chalk

const user = chalk.yellow.bold;
const info = chalk.blueBright;
const prom = chalk.yellow;
const mesg  = chalk.cyan;

//store all user function
var bin = {
	"message": {},
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
	console.log(prom('============= ') + user(`Login as ${client.user.tag}`) + prom(' =============='));
	console.log(info('more information on https://github.com/simba-fs/simple'));
	console.log(prom('======================================================'));
});

client.on('message', msg => {
	console.log(prom('> ') + user(msg.author.tag) + prom('@') + user(`${msg.channel.name?msg.channel.name:"DM"}`) + ' ' + mesg(msg.content));
	console.log(prom('> \tmessage id ') + mesg(msg.id));

	if(msg.content.startsWith(bin.setup.promptChar)){
		var argv = msg.content.split(bin.setup.splitChar);
		argv[0] = argv[0].substring(bin.setup.promptChar.length);
		
		
		//for app.message
		if(bin.message[argv[0]]){
			if(bin.message[argv[0]].config){
				let flag = true;
				let conf = bin.message[argv[0]].config;
				let channelId_now = msg.channel.name?msg.channel.id:"DM";
		
				//check channel
				if(conf.channelId && channelId_now !== conf.channelId) flag = false;
				//console.log(`${conf.channelId} ${channelId_now} ${flag}`);
		
				//chack author
				if(conf.authorTag && msg.author.tag !== conf.authorTag) flag = false;
				//console.log(`${conf.authorTag} ${msg.author.tag} ${flag}`);
			
				if(flag){
					bin.message[argv[0]].fun(msg,argv);
				}
			}else{
				bin.message[argv[0]].fun(msg,argv);
			}
		}

		//for app.echo
		if(bin.echo[argv[0]]){
			if(bin.echo[argv[0]].config){
				let flag = true;
				let conf = bin.echo[argv[0]].config;
				let channelId_now = msg.channel.name?msg.channel.id:"DM";
		
				//check channel
				if(conf.channelId && channelId_now !== conf.channelId) flag = false;
				//console.log(`${conf.channelId} ${channelId_now} ${flag}`);
		
				//chack author
				if(conf.authorTag && msg.author.tag !== conf.authorTag) flag = false;
				//console.log(`${conf.authorTag} ${msg.author.tag} ${flag}`);
			
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
app.on = function(req, fun, config){
	if(config){
		bin.message[req] = {fun: fun, config: config};
	}else{
		bin.message[req] = {fun: fun};
	}
	return this;
}

app.set = function(key, val){
	bin.setup[key] = val;
	return this;
}

app.echo = function(req, res, config){
	if(config){
		bin.echo[req] = {res: res, config: config};
	}else{
		bin.echo[req] = {res: res};
	}
	return this;
}

app.login = function(token){
	client.login(token);
	return this;
}

app.client = client;

//login
module.exports = app;
