'use strict';

// --- SendTo discord_bot --------------------------------------------------
Blockly.Words['discord_bot']               = {'en': 'Discord Instance',                    'de': 'Discord Instance'};
Blockly.Words['discord_bot_message']       = {'en': 'message',                             'de': 'Meldung'};
Blockly.Words['discord_bot_anyInstance']   = {'en': 'all instances',                       'de': 'Alle Instanzen'};
Blockly.Words['discord_bot_tooltip']       = {'en': 'Send message to Discord-Channel',     'de': 'Sende eine Nachricht an einen Discord-Channel'};
Blockly.Words['discord_bot_help']          = {'en': 'https://github.com/alexanderbleyl/ioBroker.discord_bot/blob/master/README.md', 'de': 'https://github.com/alexanderbleyl/ioBroker.discord_bot/blob/master/README.md'};

Blockly.Sendto.blocks['discord_bot'] =
	'<block type="discord_bot">'
	+ '     <value name="INSTANCE">'
	+ '     </value>'
	+ '     <value name="MESSAGE">'
	+ '         <shadow type="text">'
	+ '             <field name="TEXT">text</field>'
	+ '         </shadow>'
	+ '     </value>'
	+ '</block>';

Blockly.Blocks['discord_bot'] = {
	init: function() {
		var options = [[Blockly.Words['discord_bot_anyInstance'][systemLang], '']];
		if (typeof main !== 'undefined' && main.instances) {
			for (var i = 0; i < main.instances.length; i++) {
				var m = main.instances[i].match(/^system.adapter.discord_bot.(\d+)$/);
				if (m) {
					var k = parseInt(m[1], 10);
					options.push(['discord_bot.' + k, '.' + k]);
				}
			}
			if (options.length === 0) {
				for (var u = 0; u <= 4; u++) {
					options.push(['discord_bot.' + u, '.' + u]);
				}
			}
		} else {
			for (var n = 0; n <= 4; n++) {
				options.push(['discord_bot.' + n, '.' + n]);
			}
		}
		
		this.appendDummyInput('INSTANCE')
			.appendField(Blockly.Words['discord_bot'][systemLang])
			.appendField(new Blockly.FieldDropdown(options), 'INSTANCE');
		
		this.appendValueInput('MESSAGE')
			.appendField(Blockly.Words['discord_bot_message'][systemLang]);
		
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		
		this.setColour(Blockly.Sendto.HUE);
		this.setTooltip(Blockly.Words['discord_bot_tooltip'][systemLang]);
		this.setHelpUrl(Blockly.Words['discord_bot_help'][systemLang]);
	}
};

Blockly.JavaScript['discord_bot'] = function(block) {
	var dropdown_instance = block.getFieldValue('INSTANCE');
	var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
	
	return 'sendTo("discord_bot' + dropdown_instance + '", "send", {\n    text: ' + value_message + '\n});';
};
