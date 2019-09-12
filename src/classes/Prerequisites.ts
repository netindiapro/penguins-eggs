/**
 * penguins-eggs: Prerequisites.ts
 * 
 * author: Piero Proietti
 * mail: piero.proietti@gmail.com
 */

"use strict";
import utils from "../lib/utils";
import { IOses } from "../interfaces";

class Prerequisites {
    // Properties

    private o: IOses;

    constructor(o: IOses) {
        this.o = o;
    }



    // Methods
    public async install() {
        console.log(`Prerequisites: ${this.o.distroLike}`);

        if (this.o.distroLike === "Debian") {
            this.debian();
        } else if (this.o.distroLike === "Ubuntu") {
            this.debian();
        }
    }


    async debian(): Promise<void> {
        console.log(
            ">>> eggs: Installing the prerequisites packages..."
        );
        utils.execute(`apt-get update`);
        utils.execute(`apt-get --yes install \
                            lvm2 \
                            parted \
                            squashfs-tools \
                            xorriso \
                            syslinux \
                            isolinux \
                            live-boot \
                            calamares \
                            calamares-settings-debian \
                            qml-module-qtquick2 \
                            qml-module-qtquick-controls`);

        utils.execute(`apt-get clean`);
        utils.execute(`apt-get autoclean`);
    }
}
export default Prerequisites;