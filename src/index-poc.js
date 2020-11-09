import { promises as fs } from 'fs'
import debug from 'debug'

import dataRepository from './data-repository.js'
import { dataMapper } from './mappers/data-mapper.js'

const log = debug('app:index')

const init = async () => {
  console.time('parser')
  log('Parsing csv file')
  const data = await dataRepository.findAll('./resources/data.csv')
  const obj = dataMapper.createObject(data)
  await fs.writeFile('./resources/schema.json', JSON.stringify(obj, null, 2), 'utf-8')
  console.timeEnd('parser')
  log('done.')
}

init()
