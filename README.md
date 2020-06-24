penguins-eggs
=============

### Penguin&#39;s eggs are generated and new birds are ready to fly...
[![sources](https://img.shields.io/badge/github-sources-blue)](https://github.com/pieroproietti/penguins-eggs)
[![blog](https://img.shields.io/badge/blog-penguin's%20eggs-blue)](https://penguins-eggs.net)
[![sources-documentation](https://img.shields.io/badge/sources-documentation-blue)](https://penguins-eggs.net/sources-documentation/index.html)
[![guide](https://img.shields.io/badge/guide-penguin's%20eggs-blue)](https://penguins-eggs.net/book/)
[![npm version](https://img.shields.io/npm/v/penguins-eggs.svg)](https://npmjs.org/package/penguins-eggs)
[![deb](https://img.shields.io/badge/deb-packages-orange)](https://sourceforge.net/projects/penguins-eggs/files/packages-deb)
[![iso](https://img.shields.io/badge/iso-images-orange)](https://sourceforge.net/projects/penguins-eggs/files/iso)


# Index
<!-- toc -->
* [Index](#index)
* [Presentation](#presentation)
* [That distros you can use](#that-distros-you-can-use)
* [Install penguins-eggs](#install-penguins-eggs)
* [Usage](#usage)
* [Commands](#commands)
* [That's all Folks!](#thats-all-folks)
<!-- tocstop -->

# Presentation
penguins-eggs is a console utility, in active development, who let you to remaster your system and redistribuite it as iso images or from the lan via PXE
remote boot.

The scope of this project is to implement the process of remastering your version of Linux, generate it as ISO image to burn on a CD/DVD or copy to a usb
key to boot your system. You can also boot your egg - via remote boot - on your LAN.

All it is written in pure typescript, so ideally can be used with differents Linux distros. Yes, there are big differences about package manager used, but not so much in the way to work of bash and various programs used to build the iso.

penguins-eggs, at the moment 2020 june 21 is a working tool, yes can have again same troubles for people not in confidence with Linux system administration, but
can be already extremely usefull, You can easily create your organization/school version of Linux and deploy it on your LAN, give it to your friends as usb key 
or publish eggs in the internet!

You can try now penguins-eggs, it is a console utility - no GUI - but don't be scared, penguins-eggs is a console command - really very simple - if you
are able to open a terminal, you can use it.

# That distros you can use
Eggs is born using Debian 9 and Debian 10, I test it on Debian Buster and Linux Mind Debian Edition (LMDE4). You can try it on others distros and give a feedback.

Same iso images complete with eggs are loaded in the [sourceforge](https://sourceforge.net/projects/penguins-eggs/files/iso/) page of the project. 

# Install penguins-eggs

## Debian package
This simplest way to installe eggs is to download the [package eggs](https://sourceforge.net/projects/penguins-eggs/files/packages-deb/) from [sourceforge](https://sourceforge.net/projects/penguins-eggs/) and install it

```sudo dpkg -i eggs_7.1.XX-1_amd64.deb```

the most recent package, is usually the right choice.

## NPM package (require nodejs)

If you have already nodejs installed, you can install penguins-eggs with the utility npm (node package manager).

Simply copy and past the following lines:

```sudo npm config set unsafe-perm true```

```sudo npm i penguins-eggs -g```

### Note on i386 architecture

*Same time ago, eggs was compatible with Nodejs v8.x, actually due the use of current LTS version of nodejs, we are not. If there is a real interest in this architecture, you can read [i386-nodejs](https://github.com/pieroproietti/penguins-eggs/blob/master/documents/i386-nodejs.md).*

At the moment eggs is **NOT compatible** with i386.

# Usage
<!-- usage -->
```sh-session
$ npm install -g penguins-eggs
$ eggs COMMAND
running command...
$ eggs (-v|--version|version)
penguins-eggs/7.5.123 linux-ia32 node-v8.17.0
$ eggs --help [COMMAND]
USAGE
  $ eggs COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`eggs adjust`](#eggs-adjust)
* [`eggs calamares`](#eggs-calamares)
* [`eggs clean`](#eggs-clean)
* [`eggs help [COMMAND]`](#eggs-help-command)
* [`eggs howto:configuration`](#eggs-howtoconfiguration)
* [`eggs howto:grub`](#eggs-howtogrub)
* [`eggs info`](#eggs-info)
* [`eggs install`](#eggs-install)
* [`eggs kill`](#eggs-kill)
* [`eggs prerequisites`](#eggs-prerequisites)
* [`eggs produce`](#eggs-produce)
* [`eggs skel`](#eggs-skel)
* [`eggs sterilize`](#eggs-sterilize)
* [`eggs update`](#eggs-update)

## `eggs adjust`

auto adjust monitor resolution

```
USAGE
  $ eggs adjust

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [src/commands/adjust.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/adjust.ts)_

## `eggs calamares`

configure calamares or install and configure it

```
USAGE
  $ eggs calamares

OPTIONS
  -h, --help           show CLI help
  -i, --install        install
  -v, --verbose
  --branding=branding  branding for calamares

EXAMPLES
  ~$ sudo eggs calamares 
  create calamares configuration

  ~$ sudo eggs calamares -i 
  install calamares  and configure it
```

_See code: [src/commands/calamares.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/calamares.ts)_

## `eggs clean`

Clean system log, apt, etc

```
USAGE
  $ eggs clean

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  verbose
```

_See code: [src/commands/clean.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/clean.ts)_

## `eggs help [COMMAND]`

display help for eggs

```
USAGE
  $ eggs help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `eggs howto:configuration`

configure eggs

```
USAGE
  $ eggs howto:configuration

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/howto/configuration.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/howto/configuration.ts)_

## `eggs howto:grub`

boot from grub rescue

```
USAGE
  $ eggs howto:grub

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/howto/grub.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/howto/grub.ts)_

## `eggs info`

informations about system and eggs

```
USAGE
  $ eggs info

EXAMPLE
  $ eggs info
  You will find here informations about penguin's eggs!
```

_See code: [src/commands/info.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/info.ts)_

## `eggs install`

system installation (the eggs became penguin)

```
USAGE
  $ eggs install

OPTIONS
  -g, --gui        use gui installer
  -h, --info       show CLI help
  -l, --lvmremove  remove lvm /dev/pve
  -u, --umount     umount devices
  -v, --verbose    verbose

ALIASES
  $ eggs hatch

EXAMPLE
  $ eggs install
  penguin's eggs installation
```

_See code: [src/commands/install.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/install.ts)_

## `eggs kill`

kill the eggs/free the nest

```
USAGE
  $ eggs kill

OPTIONS
  -h, --help     show CLI help
  -u, --umount   umount
  -v, --verbose  verbose

EXAMPLE
  $ eggs kill
  kill the eggs/free the nest
```

_See code: [src/commands/kill.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/kill.ts)_

## `eggs prerequisites`

install packages prerequisites to run eggs

```
USAGE
  $ eggs prerequisites

OPTIONS
  -c, --configuration_only  not remove/reinstall calamares, only configuration
  -h, --help                show CLI help
  -v, --verbose             verbose

EXAMPLES
  ~$ eggs prerequisites
  install prerequisites and create configuration files

  ~$ eggs prerequisites -c
  only create configuration files
```

_See code: [src/commands/prerequisites.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/prerequisites.ts)_

## `eggs produce`

livecd creation. (the penguin produce an egg)

```
USAGE
  $ eggs produce

OPTIONS
  -a, --assistant          install assistant
  -b, --basename=basename  basename egg
  -c, --compress           max compression
  -d, --dry                perform a dry run, no iso build but only scripts generated
  -f, --fast               fast compression
  -h, --help               show CLI help
  -v, --verbose            verbose
  --branding=branding      brand for calamares default eggs

ALIASES
  $ eggs spawn
  $ eggs lay

EXAMPLE
  $ eggs produce --basename egg
  the penguin produce an egg called egg-i386-2020-04-13_1815.iso
```

_See code: [src/commands/produce.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/produce.ts)_

## `eggs skel`

update skel from home configuration

```
USAGE
  $ eggs skel

OPTIONS
  -h, --help       show CLI help
  -u, --user=user  user to be used
  -v, --verbose

EXAMPLE
  $ eggs skel --user mauro
  desktop configuration of user mauro will get used as default
```

_See code: [src/commands/skel.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/skel.ts)_

## `eggs sterilize`

remove all packages installed as prerequisites

```
USAGE
  $ eggs sterilize

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  verbose
```

_See code: [src/commands/sterilize.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/sterilize.ts)_

## `eggs update`

update/upgrade the penguin's eggs tool.

```
USAGE
  $ eggs update

DESCRIPTION
  This way of update work only with npm installation, if you used the debian package version, please download the new 
  one and install it.

EXAMPLE
  $ eggs update
  update/upgrade the penguin's eggs tool
```

_See code: [src/commands/update.ts](https://github.com/pieroproietti/penguins-eggs/blob/v7.5.123/src/commands/update.ts)_
<!-- commandsstop -->

# That's all Folks!
No need other configurations, penguins-eggs are battery included or better, as in the real, live is inside! :-D

## More informations

You can find more informations at [Penguin's eggs blog](https://penguins-eggs.net).

## Contacts
Feel free to contact [me](https://gitter.im/penguins-eggs-1/community?source=orgpage) or open an issue on [github](https://github.com/pieroproietti/penguins-eggs/issues).

* mail: piero.proietti@gmail.com

## Copyright and licenses
Copyright (c) 2017, 2020 [Piero Proietti](https://penguins-eggs.net/about-me.html), dual licensed under the MIT or GPL Version 2 licenses.
