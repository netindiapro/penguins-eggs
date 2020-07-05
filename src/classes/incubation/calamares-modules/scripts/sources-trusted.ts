/**
 *
 */
export function sourcesTrusted(): string {
   let text = ``
   text = `#!/bin/sh\n`
   text += `CHROOT=$(mount | grep proc | grep calamares | awk '{print $3}' | sed -e "s#/proc##g")\n`
   text += `RELEASE="buster"\n`
   text += `\n`
   text += `if [ "$1" = "-u" ]; then\n`
   text += `    rm $CHROOT/etc/apt/sources.list.d/debian-trusted.list\n`
   text += `    chroot $CHROOT apt-get --allow-unauthenticated update\n`
   text += `    exit 0\n`
   text += `fi\n`
   text += `\n`
   text += `# Remove previous sources, we will configure sources in a later phase\n`
   text += `#####################################################################\n`
   text += `rm $CHROOT/etc/apt/sources.list-backup\n`
   text += `rm $CHROOT/etc/apt/sources.list.d-backup -rf\n`
   text += `mv $CHROOT/etc/apt/sources.list $CHROOT/etc/apt/sources.list-backup\n`
   text += `mv $CHROOT/etc/apt/sources.list.d $CHROOT/etc/apt/sources.list.d-backup\n`
   text += `#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^#\n`
   text += `mkdir -p $CHROOT/etc/apt/sources.list.d\n`
   text += `#\n`
   text += `# Writes the debian-trusted.list file\n`
   text += `\n`
   text += `cat << EOF > $CHROOT/etc/apt/sources.list.d/debian-trusted.list\n`
   text += `# See https://wiki.debian.org/SourcesList for more information.\n`
   text += `# debian-trusted.list >>> That list is only for installation<<<\n`
   text += `deb [trusted=yes] http://deb.debian.org/debian $RELEASE main\n`
   text += `deb-src [trusted=yes] http://deb.debian.org/debian $RELEASE main\n`
   text += `\n`
   text += `deb [trusted=yes] http://deb.debian.org/debian $RELEASE-updates main\n`
   text += `deb-src [trusted=yes] http://deb.debian.org/debian $RELEASE-updates main\n`
   text += `\n`
   text += `deb [trusted=yes] http://security.debian.org/debian-security/ $RELEASE/updates main\n`
   text += `deb-src [trusted=yes] http://security.debian.org/debian-security/ $RELEASE/updates main\n`
   text += `EOF\n`
   text += `\n`
   text += `chroot $CHROOT apt-get --allow-unauthenticated update -y\n`
   text += `exit 0\n`

   return text
}