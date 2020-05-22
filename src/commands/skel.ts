/**
 * penguins-eggs-v7 based on Debian live
 * author: Piero Proietti
 * email: piero.proietti@gmail.com
 * license: MIT
 */
import { Command, flags } from '@oclif/command'
import Utils from '../classes/utils'
import chalk = require('chalk')
import fs = require('fs')
import Pacman from '../classes/pacman'
import Xdg from '../classes/xdg'

const exec = require('../lib/utils').exec


export default class Skel extends Command {
  static description = 'update skel from home configuration'

  static examples = [
    `$ eggs skel --user mauro
desktop configuration of user mauro will get used as default`]


  static flags = {
    help: flags.help({ char: 'h' }),
    user: flags.string({ char: 'u', description: 'user to be used' }),
    verbose: flags.boolean({ char: 'v' }),
  }


  async run() {
    const { flags } = this.parse(Skel)

    let verbose = false
    if (flags.verbose) {
      verbose = true
    }

    let user = ''
    if (flags.user) {
      user = flags.user
    } else {
      user = Utils.getPrimaryUser()
    }
    Utils.warning(`user: ${user}`)

    let source = ''
    if (fs.existsSync(`/home/${user}`)) {
      source = `/home/${user}`
    } else {
      Utils.error(`User ${user} not exist or not a proper home`)
      Utils.warning(`terminate`)
      process.exit(0)
    }

    if (Utils.isRoot()) {
      Utils.titles('skel')
      Xdg.skel(user, verbose)
    }
  }
}