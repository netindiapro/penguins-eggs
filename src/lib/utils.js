/*
  utils.js V. 0.3.0
*/
"use strict";

import shell from "shelljs";
import ip from "ip";
import fs from "fs";
import os from "os";
import dns from "dns";
import network from "network";
const path = require("path");

//import network from "network";

let utils = function() {};

utils.prototype.path = function() {
  let path = "/usr/lib/node_modules/penguins-eggs";
  if (getCurrentDirectoryName() == "lib") {
    path = ".";
  } else {
    // "build"
    path = "..";
  }
  return path;
};

utils.prototype.netNetmask = function() {
  var netMask = "";
  var ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(function(ifname) {
    //var alias = 0;

    ifaces[ifname].forEach(function(iface) {
      if ("IPv4" !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      netMask = iface.netmask;
    });
  });
  return netMask;
};

utils.prototype.netDomainName = function() {
  return "lan";
};

utils.prototype.netDns = function() {
  return dns.getServers()[0];
};

utils.prototype.netGateway = function() {
  let ip;
  let err;
  network.get_gateway_ip(function(err, ip) {
    //console.log(err || ip); // err may be 'No active network interface found.'
  })
  return ip;
};

utils.prototype.netDomainName = function() {
  return "lan";
};

utils.prototype.netBootServer = function() {
  //  let ip = require("ip");
  return ip.address();
};

utils.prototype.netDeviceName = function() {
  let interfaces = Object.keys(os.networkInterfaces());
  let netDeviceName = "";
  for (let k in interfaces) {
    if (interfaces[k] != "lo") {
      netDeviceName = interfaces[k];
    }
  }
  return netDeviceName;
};

utils.prototype.kernerlVersion = function() {
  return os.release();
};

utils.prototype.isRoot = function() {
  return process.getuid && process.getuid() === 0;
};

utils.prototype.bashwrite = function(file, text) {
  const head = `########################################################START##
# Generated by Egg ${path.basename(file.trim())}
###############################################################\n`;
  const footer = `######################################################## END ##
`;

  console.log(`[utils]\n>>> Creazione ${file}`);
  text = head + text.trim() + "\n" + footer;
  text = text.trim() + "\n";
  file = file.trim();
  fs.writeFileSync(file, text);
  console.log(text);
  console.log(`>>> Fine creazione ${file}  ===`);
};

utils.prototype.exec = function(cmd) {
  console.log(`[utils] >>> exec ${cmd}`);
  shell.exec(cmd, false);
};

utils.prototype.rsync = async function(commands) {
  console.log(`[utils] >>> ${commands}`);
  commands.forEach(function(cmd) {
    // Questa riga, mandava rsync in async...
    //const { stdout, stderr, code } =  shell.exec(cmd, { silent: true });
    //console.log(`[utils] >>> exec ${cmd}`);
    shell.exec(cmd, { async: false });
  });
};

utils.prototype.sr = function(file, search, replace) {
  let original = fs.readFileSync(file).toString();
  let changed = original.replace(search, replace);
  fs.writeFileSync(file, changed);
};

utils.prototype.hostname = function(target, hostname) {
  let file = `${target}/etc/hostname`;
  let text = hostname;
  fs.writeFileSync(file, text);
};

utils.prototype.date4label = function() {
  let d = new Date();
  let tz = "";
  let ver =
    pad(d.getFullYear()) +
    "/" +
    pad(d.getMonth() + 1) +
    "/" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes());

  let sign = "+";
  if (d.getTimezoneOffset() < 0) {
    sign = "-";
  }

  tz = Math.abs(d.getTimezoneOffset() / 60);
  ver += sign + pad(tz);
  return ver;
};

utils.prototype.date4file = function() {
  let d = new Date();
  let tz = "";
  let ver =
    "_" +
    pad(d.getFullYear()) +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    "_" +
    pad(d.getHours()) +
    pad(d.getMinutes());

  let sign = "+";
  if (d.getTimezoneOffset() < 0) {
    sign = "-";
  }

  tz = Math.abs(d.getTimezoneOffset() / 60);
  ver += sign + pad(tz);
  return ver;
};

/**
 *
 * Funzioni interne: calcolo rete; copiate da ipcalc
 *
 */

var MAX_BIT_BIN = 255;
/**
 * ANDs 32 bit representations of IP and submask to get network address
 *
 * @param {number} 32 bit representation of IP address
 * @param {number} 32 bit representation of submask
 * @return {number} 32 bit representation of IP address (network address)
 */
utils.prototype.net = function(ip, sm) {
  let _ip = qdotToInt(ip.split("."));
  let _sm = qdotToInt(sm.split("."));
  return intToQdot(_ip & _sm);
};

/**
 * Reverses function qdotToInt(ip)
 *
 * @param {number} a 32-bit integer representation of an IPv4 address
 * @return {string} a quad-dotted IPv4 address
 */
function intToQdot(integer) {
  return [
    (integer >> 24) & MAX_BIT_BIN,
    (integer >> 16) & MAX_BIT_BIN,
    (integer >> 8) & MAX_BIT_BIN,
    integer & MAX_BIT_BIN
  ].join(".");
}

/**
 * Converts an IP/Submask into 32 bit int
 *
 * @param {Array.<string>} a quad-dotted IPv4 address -> array
 * @return {number} a 32-bit integer representation of an IPv4 address
 */
function qdotToInt(ip) {
  var x = 0;

  x += (+ip[0] << 24) >>> 0;
  x += (+ip[1] << 16) >>> 0;
  x += (+ip[2] << 8) >>> 0;
  x += +ip[3] >>> 0;

  return x;
}

function getCurrentDirectoryName() {
  var fullPath = __dirname;
  var path = fullPath.split("/");
  var cwd = path[path.length - 1];
  console.log("Full path: " + fullPath);

  // Se  fullPath comprende node_moduels
  if (!fullPath.indexOf("node_modules") > -1) {
    // restituisco lib
    cwd = "lib";
  }
  return cwd;
}

function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

export default new utils();
