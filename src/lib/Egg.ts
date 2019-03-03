/*
  penguins-eggs: Eggs.js
  author: Piero Proietti
  mail: piero.proietti@gmail.com
*/
"use strict";

import fs from "fs";
import shell from "shelljs";
import utils from "./utils";
import filters from "./filters";

import { IDistro, INet, IUser } from "../interfaces";

class Egg {
  // Properties
  private workDir: string;
  private distro: IDistro;
  private net: INet;
  private user: IUser;
  private root: IUser;

  constructor(
    workDir: string,
    distro?: IDistro,
    net?: INet,
    user?: IUser,
    root?: IUser
  ) {

    this.distro = {} as IDistro;
    this.net = {} as INet;
    this.user = {} as IUser;
    this.root = {} as IUser;

    if (workDir == undefined){
      this.workDir = "/var/lib/vz/eggs/";
    } else{
      this.workDir = workDir;
    }

    if (distro == undefined) {
      this.distro.name = 'penguin';
    } else {
      this.distro.name = distro.name;
    }
    this.distro.kernel = utils.kernerlVersion();
    this.distro.pathHome = workDir + `${this.distro.name}`;
    this.distro.pathFs = this.distro.pathHome + `/fs`;
    this.distro.pathIso = this.distro.pathHome + `/iso`;


    if (net == undefined) {
      this.net.dhcp = false;
      this.net.address = "192.168.61.100";
      this.net.netmask = "255.255.255.0";
      this.net.gateway = "192.168.61.1";
    } else {
      this.net.dhcp = net.dhcp;
      this.net.address = net.address;
      this.net.netmask = net.netmask;
      this.net.gateway = net.gateway;
    }
    this.net.name = utils.netDeviceName();
    this.net.domainName = "lan";
    this.net.dnsAddress = utils.netDns();

    if (user == undefined) {
      this.user.name = "artisan";
      this.user.fullName = "Artisan";
      this.user.password = "evolution"
    } else {
      this.user.name = user.name;
      this.user.fullName = user.fullName;
      this.user.password = user.password;
    }

    if (root == undefined) {
      this.root.name = "root";
      this.root.fullName = "root";
      this.root.password = "evolution"
    } else {
      this.root.name = user.name;
      this.root.fullName = user.fullName;
      this.root.password = user.password;
    }

  }

  public async kill() {
    console.log("==========================================");
    console.log("eggs kill");
    console.log("==========================================");
    utils.exec(`rm -rf ${this.distro.pathHome}`);
  }

  // Check or create a nest
  public async spawn() {
    console.log("==========================================");
    console.log("eggs spawn");
    console.log("==========================================");
    if (!fs.existsSync(this.distro.pathHome)) {
      utils.exec(`mkdir -p ${this.distro.pathHome}`);
      //utils.exec(`ln -s ${this.distro.pathHome} /srv/penguins-eggs`);
    }

    if (fs.existsSync(this.distro.pathFs)) {
      // Remove and create /var ed /etc
      utils.exec(`rm -rf ${this.distro.pathFs}/var`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/var`);
      utils.exec(`rm -rf ${this.distro.pathFs}/etc`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/etc/live`);
    } else {
      utils.exec(`mkdir -p ${this.distro.pathFs}`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/dev`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/etc`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/etc/intefaces`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/etc/live`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/proc`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/sys`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/media`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/run`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/var`);
      utils.exec(`mkdir -p ${this.distro.pathFs}/tmp`);
    }
  }

  public async copy() {
    let cmd = "";
    cmd = `
    rsync -aq  \
    --filter="- ${this.distro.pathHome}"  \
    --delete-before  \
    --delete-excluded  \ ${filters} / ${this.distro.pathFs}`;
    console.log("spawning the system to egg...");
    //console.log(cmd.trim());
    shell.exec(cmd.trim(), {
      async: false
    });
  }

  public async fstab() {
    let file = `${this.distro.pathFs}/etc/fstab`;
    let text = `
#proc /proc proc defaults 0 0
/dev/nfs / nfs defaults 1 1
`;
    utils.bashWrite(file, text);
  }

  public async hostname() {
    utils.hostname(this.distro.pathFs, this.distro.name);
  }

  public async resolvConf() {
    let file = `${this.distro.pathFs}/etc/resolv.conf`;
    let text = `
search ${this.net.domainName}
nameserver ${this.net.dnsAddress}
nameserver 8.8.8.8
nameserver 8.8.4.4
`;

    utils.bashWrite(file, text);
  }

  public async interfaces() {
    let file = `${this.distro.pathFs}/etc/network/interfaces`;
    let text = `
auto lo
iface lo inet loopback
iface ${this.net.name} inet manual
`;

    utils.bashWrite(file, text);
  }

  public async hosts() {
    let file = `${this.distro.pathFs}/etc/hosts`;
    let text = `
127.0.0.1 localhost.localdomain localhost
${this.net.address} ${this.distro.name}.${this.net.domainName} ${this.distro.name}
# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
`;

    utils.bashWrite(file, text);
  }
}

export default Egg;