//include discord.js and create a client
var Discord = require('discord.js');
var client = new Discord.Client();

//include config
var { token } = require('./ignore/token.json');
var config = "./config.json";

//router
class Router{
	constructor(){
		this.bin = {};
	}
	add(name, fun){
		if(!this.bin[name]){
			this.bin[name] = new Array;
		}
		this.bin[name].push(fun);
	}
	run(name){
		if(this.bin[name].includes(name)){
			var argv = arguments.pop(0);
			delete argv[0];
			for(var i in this.bin[name]){
				this.bin[name][i]()
			}
		}
	}
}

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
	console.log(`> ${msg.author.tag}@${msg.channel.name?msg.channel.name:"DM"} ${msg.content}`);
	if(msg.content.startsWith(bin.setup.promptChar)){
		var argv = msg.content.split(bin.setup.splitChar);
		argv[0] = argv[0].substring(bin.setup.promptChar.length);
		for(var i in bin.message){
			bin.message[i](msg, argv);
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

app.response = (req, res){
	
}


//login
client.login(token);
module.exports = app;

console.table(bin.setup);

app.message(()=>{console.log('hi')});
app.message(()=>{console.log('hdddi')});
app.message(()=>{console.log('hnheri')});
app.message(()=>{console.log('hkiuveii')});
