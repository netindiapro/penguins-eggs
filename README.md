# penguins-eggs

![penguins-eggs](https://github.com/pieroproietti/penguins-eggs/blob/master/src/assets/penguins-eggs.png?raw=true)

penguins-eggs is a console utility, still not relead, who let you to remaster your system and redistrribuite it with as iso images or distribuite it from the lan with PXE.

It include all the necessary services dhcp, dhcp-proxy, tftp and http to realize a fast and powerfull PXE server who can work alone or in a preesistent architecture LAN.

it is written in nodejs, so ideally can be used with different Linux distro. At the moment it work well with Debian 8 Jessie and Debian 9 Stretch, soon
will include Ubuntu and derivates. For others distros we need to find collaboratores.

The scope of this project is to implement the process of remastering your version of Linux, generate it as ISO images, burn it on a DVD/install or a usb key or
perform a remote boot on your entire lan.

penguins-eggs, at the moment october 22, is not release yet, and can have same troubles for people not in confidence with Linux system administration, but can be
already extremely usefull: imagine to install it on an lan and start to manage the computers with it. You can easily install clonezilla on it, or clamav and
you have a tool to backup/restore/sanityze your entire infrastructure.

You can, also easily create your organization/school distro and deploy it on the lan, give it to your friend as usb key or publish in the internet!

You can test now penguins-eggs, it is a console utility - no GUI yet - but don't be scared, all you need is to install [node](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

penguins-eggs is a console command - really with very simple usage. If you are able to open a terminal, you can use it.

## Commands
* create
* destroy
* serve
* hatch

### create
Will create an iso image of your system

### destroy
Ad the name, will destroy all the infrastructure created

### serve
Will start a PXE server, serving the eggs created (and others if You want)!

### hatch
Will install the egg, or better will hatch the egg and it will became a penguin!

## options
* -d --distroname <distroname>


## Testing penguins-eggs
Well, it is time to try it!
### Prerequisites
Penguins-eggs on Debian depend from this packages, you need to install it, in this way:
``` bash
sudo apt-get update
sudo apt-get install squashfs-tools xorriso live-boot syslinux syslinux-common isolinux pxelinux
```

To test it, you need a functional installation of Linux Debian version 8 or 9:

``` bash
 git clone https://github.com/pieroproietti/penguins-eggs
 cd penguins-eggs
 npm i
```
To launch egg

``` bash
 sudo npm  start
```
or
``` bash
./eggs
```

Soon, but not today,  will be possible also to use it directly from npm
``` bash
sudo npm i penguins-egg -g
sudo eggs
```
Of course, you need NodeJs omstalled.

Later, I hope in december, we will releas a Debian/Ubuntu packages for it.

No need other configurations, penguins-eggs are battery included or better, the live is inside! :-D

## informations
For other informations, write me.

The author
piero.proietti@gmail.com

[Facebook](https://www.facebook.com/thewind61)
[Penguin's Eggs on Facebook](https://www.facebook.com/groups/128861437762355/)
