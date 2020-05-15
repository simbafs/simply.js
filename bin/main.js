//include discord.js and create a client
var chalk = require('chalk');
var {Client, RichEmbed} = require('discord.js');
var client = new Client();

var events = require('events');
var em = new events.EventEmitter();

//define chalk

const user = chalk.yellow.bold;
const info = chalk.blueBright;
const prom = chalk.yellow;
const mesg = chalk.cyan;
const err  = chalk.red;

var {bin, em} = require('./em.js');

//export module
var app = new Object;

//setup token for glitch
if(process.env.BOT_TOKEN){
	token = process.env.BOT_TOKEN;//for glitch
}

//new Member
client.on('guildMemberAdd', (user) => {
	em.emit('newMember', user);
});

//on ready
client.on('ready', () => {
	function repeat(n){
		let r = "";
		for(let i = 0; i < n; i++, r+="=");
		return r;
	}
	let tag = client.user.tag;
	debugger;
	let len = tag.length;
	let a = Math.floor((45 - len)/2);
	let b = 45 - len - a;
	console.log(prom(`${repeat(a)} `) + user(`Login as ${client.user.tag}`) + prom(` ${repeat(b)}`));
	console.log(info('more information on https://github.com/simba-fs/simply.js'));
	console.log(prom('========================================================='));
	for(var i in bin.setup){
		if(i == 'activity'){
			client.user.setActivity(bin.setup.activity);
		}	
	}
	//em.on
	em.emit('ready');
});

client.on('message', msg => {
	console.log(prom('> ') + user(msg.author.tag) + prom('@') + user(`${msg.channel.name?msg.channel.name:"DM"}`) + ' ' + mesg(msg.content));
	console.log(prom('> \tmessage id ') + mesg(msg.id));

	if(msg.content.startsWith(bin.setup.prefix)){
		var argv = msg.content.split(bin.setup.splitChar);
		argv[0] = argv[0].substring(bin.setup.prefix.length);
		
		
		//for app.message
		em.emit('on', msg, argv);

		//for app.echo
		em.emit('echo', msg, argv);
	}

});



//def app.ready() require a function
app.cmd = function(req, fun, config){
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

app.on = function(events, fn){
	if(!events || !fn){
		console.log(err('simple.on miss something'));
		return this;
	}
	switch(events){
		case 'ready':
			bin.ready.push(fn);
			break;
		default:
			console.log(err(`event: ${events} doesn't not exist`));
	}
	return this;
}

app.ready = function(fn){
	bin.ready.push(fn);
	return this;
}

app.client = client;

//login
module.exports = app;
