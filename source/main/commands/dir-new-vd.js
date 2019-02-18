const ZettlrCommand = require('./zettlr-command')

class DirNewVD extends ZettlrCommand {
  constructor (app) {
    super(app, 'dir-new-vd')
  }

  /**
    * Creates a new virtual directory
    * @param  {Object} arg The argument, containing both the containing hash and the new name
    */
  run (arg) {
    let dir
    if (arg.hasOwnProperty('hash')) {
      dir = this._app.findDir({ 'hash': parseInt(arg.hash) })
    } else {
      dir = this._app.getCurrentDir()
    }

    if (!dir) return false

    // Create the vd
    let vd = dir.addVirtualDir(arg.name)
    this._app.ipc.send('paths-update', this._app.getPathDummies())
    this._app.setCurrentDir(vd)
  }
}

module.exports = DirNewVD