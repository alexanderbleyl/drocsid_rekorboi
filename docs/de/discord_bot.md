![Logo](admin/discord_bot.png)
# ioBroker.discord_bot

<!--
[![NPM version](https://img.shields.io/npm/v/iobroker.template.svg)](https://www.npmjs.com/package/iobroker.template)
[![Downloads](https://img.shields.io/npm/dm/iobroker.template.svg)](https://www.npmjs.com/package/iobroker.template)
![Number of Installations (latest)](https://iobroker.live/badges/template-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/template-stable.svg)
[![Dependency Status](https://img.shields.io/david/Author/iobroker.template.svg)](https://david-dm.org/Author/iobroker.template)

[![NPM](https://nodei.co/npm/iobroker.template.png?downloads=true)](https://nodei.co/npm/iobroker.template/)

**Tests:** ![Test and Release](https://github.com/Author/ioBroker.template/workflows/Test%20and%20Release/badge.svg)
-->

## Discord Adapter für ioBroker

Dieser Adapter schickt Nachrichten an deinen Discord Channel mit Hilfe deines eigenen Bots.

Discord ist dabei einfacher zu nutzen als WhatsApp (braucht keine Handy Nummer o.ä.) und sicherer als Telegram.

Das nachfolgende Setup dauert weniger als 5 Minuten und ist komplett gratis.

### Setup:

Wenn du noch keinen hast, legst du dir als erstes einen Account bei [Discord](https://discord.com) an und loggst dich ein.

---

#### neuen Channel anlege, Channel-ID erhalten:

Wenn du dich also mit deinem Account angemeldet, erzeuge einen neuen Channel. Wir nennen ihn hier beispielhaft "house":
1. Drück auf den "plus"-Button:
![neuer Server](admin/img/01_new_channel.png)


2. lege deinen neuen "server" an:

![deinen eigenen](admin/img/02_new_channel.png)


3. ...für dich und deine Freunde:

![für dich](admin/img/03_new_channel.png)


4. ...und gib ihm einen Namen (z.B. house):

![benennen](admin/img/04_new_channel.png)

Wenn das funktioniert hat und du in deinem neuen Channel bist, enthält deine Browser-URL deine cache-ID, was als erstes gebraucht wird.
Das sollte also so aussehen: _https://discord.com/channels/xxxxxxxxxxxxxxxxxx/876543210987654321_

Du brauchst davon den letzten Teil der URL, hier im Beispiel also __876543210987654321__

Das ist deine __Channel-ID__ welche für diesen Adapter gebraucht wird.

---

#### neuen Bot erzeugen, Bot-Token holen:

Wenn du in Discord eingeloggt bist, öffne das [Developer Portal](https://discord.com/developers/applications).

Um einen neune Bot zu erhalten brauchen wir zunächst eine neue "Application":
1. Drücke also den "New Application"-Button:

![neue Application](admin/img/05_new_application.png)

2. gib deiner Apllication einen Namen (z.B. "HouseBot")

![benennen](admin/img/06_new_application.png)

3. gehe zum "Bot"-Tab und drücke "Add Bot"

![neuer Bot](admin/img/07_new_application.png)

4. ...bestätigen

![bestätigen](admin/img/08_new_application.png)

5. von dort bekommst du dein Bot-Token

![bot-token](admin/img/09_new_application.png)

Das ist das __Bot-Token__ was für diesen Adapter gebraucht wird.

#### Nachrichten von ioBroker schicken

Mit deiner channel-ID und deinem Bot-Token brauchst du jetz nur noch ein Objekt im ioBroker anlegen.

Texte welche dort hinein geschrieben werden, schicht dein neuer Bot dann an deinen Discord-Channel.

Wir legen zum Beispiel einen neuen Datenpunkt in deinem userdata-Ordner an:

1. im ioBroker, gehe zu den Objekten, wähle z.B. den Ordner "0_userdata" und den Unterordner "0" aus und drücke den "plus" Button:

![neuer Datenpunkt](admin/img/10_new_state.png)

2. Das neue Objekt ist vom Typ "Datenpunkt", der Zustandstyp ist ein "string". Gib dem ganzen noch einen Namen und speichere

![benennen](admin/img/11_new_state.png)

Dein neuer Datenpunkt hat die volle Adresse __0_userdata.0.discord_message__.

Das ist der __state__-Name was als letztes von diesem Adapter gebraucht wird.

Immer wenn sich der Inhalt dieses Datenpunktes ändert, schickt dir dein Bot das als Nachricht an deinen Discord-Channel.

#### zum schluss

Diese 3 Sachen, __Channel-ID__, __Bot-Token__ und __state__ trägst du also in die neue Instanz dieses Adapters ein und fertig.

Jeder der deinem Channel folgt bekommt deine Bot-Nachrichten.

Um diese Nachrichten zu erhalten, hol dir [Discord](https://discord.com/download) für [Windows](https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x86),
[Mac](https://discord.com/api/download?platform=osx),
[Android](https://discordapp.page.link/?link=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.discord%26attemptId%3De4dc7dbf-5555-4257-b8ac-71fd09945649&utm_source=download&apn=com.discord&isi=985746746&ibi=com.hammerandchisel.discord&sd=Your%20place%20to%20talk%20with%20communities%20and%20friends.&efr=1),
oder [iOS](https://discordapp.page.link/?link=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.discord%26attemptId%3De4dc7dbf-5555-4257-b8ac-71fd09945649&utm_source=download&apn=com.discord&isi=985746746&ibi=com.hammerandchisel.discord&sd=Your%20place%20to%20talk%20with%20communities%20and%20friends.&efr=1).

Bedenke: nur wenn sich der Inhalt deines Datenpunktes __ändert__, wird eine Nachricht geschickt.

Mehrere Instanzen dieses Adapters sollten fuktionieren, machen aber nicht wirklich Sinn.

### **WORK IN PROGRESS**
* initial release, automated testing still missing

## License
The MIT License (MIT)

Copyright (c) 2014-2019, AB

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
