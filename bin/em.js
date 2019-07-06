var events = require('events');
var em = new events.EventEmitter();

//store all user function
var bin = {
	message: {},
	echo: {},
	setup:{
		"promptChar": "!",
		"splitChar": " "
	},
	ready: [],
	newMember: []
};

em.on('on',(msg,argv) => {
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
});

em.on('echo', (msg, argv) => {
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
});

em.on('ready', () => {
	for(var i in bin.ready){
		bin.ready[i]();
	}
});

em.on('newMember', (user) => {
	for(var i in bin.newMember){
		bin.newMember[i](user);
	}
});

module.exports = {
	em: em,
	bin: bin
};
