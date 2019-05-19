//include discord.js and create a client
var Discord = require('discord.js');
var client = new Discord.Client();

//include config
var { token } = require('./ignore/token.json');
var config = "./config.json";

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
		
		//for simple.message
		for(var i in bin.message){
			bin.message[i](msg, argv);
		}

		//for simple.echo
		if( bin.echo[argv[0]] ){
			msg.reply(bin.echo[argv[0]]);
		}
	}

});

//def app.ready() require a function
app.message = function(fun){
	bin.message.push(fun);
}

app.set = function(key, val){
	bin.setup[key] = val;
}

app.echo = function(req, res){	
	bin.echo[req] = res;
}

app.login = function(token){
	client.login(token);
}


//login
module.exports = app;
