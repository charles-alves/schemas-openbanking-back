import { promises as fs } from 'fs'
import debug from 'debug'

import { lineMapper } from './mappers/line-mapper.js'

const log = debug('app:data-repository')

const _readFile = async (path) => {
  const lines = (await fs.readFile(path, 'utf-8')).toString().split('\r\n')
  lines.shift()
  return lines
    .filter(l => !!l)
    .map(lines => lines.split('<sep>'))
}

const findAll = async (path) => {
  log(`Reading file: ${path}`)
  const file = await _readFile(path)
  log('Lines read')
  const data = file.map(f => lineMapper.parse(f))
  log('Data load finished')
  return data
}

export default {
  findAll
}
