//include discord.js and create a client
var Discord = require('discord.js');
var client = new Discord.Client();

//include config
var { token } = require('./ignore/token.json');
var config = "./config.json";

//store all user function
var bin = {
	"message": [],
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
	if(msg.content.startsWith(bin.setup.promptChar)){
		var argv = msg.content.split(bin.setup.splitChar);
		
	}
});

//def app.ready() require a function
app.message = function(fun){
	bin.message.push(fun);
}

app.set = function(key, val){
	bin.setup[key] = val;
}


//login
//client.login(token);
module.exports = app;

app.set('key','val');
app.set('name','simba');

console.log(bin.setup);
