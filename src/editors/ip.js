import { StringEditor } from './string.js'
import { extend } from '../utilities.js'

export class IpEditor extends StringEditor {
  build () {
    super.build()

    if (this.format !== 'ipv6') {
      this.input.addEventListener('input', e => {
        const el = e.target
        if (!el.value.includes(',')) return
        const pos = el.selectionStart
        el.value = el.value.replace(/,/g, '.')
        if (pos !== null) el.setSelectionRange(pos, pos)
      })
    }
  }

  preBuild () {
    super.preBuild()

    /* Create schema options object if deesn't exist */
    if (!this.schema.options) {
      this.schema.options = {}
    }

    /* Create cleave options if they don't exist */
    if (!this.schema.options.cleave) {
      switch (this.format) {
        case 'ipv6':
          this.schema.options.cleave = {
            delimiters: [':'],
            blocks: [4, 4, 4, 4, 4, 4, 4, 4],
            uppercase: true
          }
          break
        case 'ipv4':
          this.schema.options.cleave = {
            delimiters: ['.'],
            blocks: [3, 3, 3, 3],
            numericOnly: true
          }
          break
      }
    }

    /* Update options object */
    this.options = extend(this.options, this.schema.options || {})
  }
}
