**Methed -- echo()**
=====================
```
simple.echo(req, res, [config])
	req => what user type begun with promptChar
	res => response when target
	config => optional. type: object
		{
			channelID => whitelist of channel id, DM channel is 'DM'
			authorTag => whitelist of author tag (e.g.simba#2030)
		}
return => simple
```

```js
	simple.echo('hi', 'welcome');
	//echo when you say '!hi'
	simple.echo('how_are_you?', 'I_am_fine', {channelId: 'DM'});
	//echo when you say '!how_are_you?' in DM
	simple.echo('good_morning', 'good_morning_Simba', {channel: '533571855005646850', authorTag: 'simba#2030'});
	//echo when you say '!good_morning' in channel '533571855005646850' and you are 'simba#2030'
```
