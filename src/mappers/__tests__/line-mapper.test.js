import { lineMapper } from '../line-mapper.js'

describe('lineMapper.parse tests', () => {
  it('should parse a line with empty attributes', () => {
    const result = lineMapper.parse(['<brand>', '', '', '', '', '', '', '', '', '', '', ''])

    expect(result).toEqual({
      name: 'brand',
      level: 0,
      description: '',
      fieldType: '',
      size: 0,
      required: false,
      regexValidation: '',
      allowedValues: [],
      minOccurrences: '-',
      maxOccurrences: '-',
      observation: ''
    })
  })

  it('should parse a line with all attributes', () => {
    const result = lineMapper.parse([
      '|......name',
      'name',
      'BRAND.NAME',
      'Nome da Marca reportada pelo participante do Open Banking.',
      'Texto',
      '30',
      'Mandatório',
      '\\w*\\W*',
      '',
      '1',
      '1',
      'N/A'
    ])

    expect(result).toEqual({
      name: 'name',
      level: 1,
      description: 'Nome da Marca reportada pelo participante do Open Banking.',
      fieldType: 'Texto',
      size: 30,
      required: true,
      regexValidation: '\\w*\\W*',
      allowedValues: [],
      minOccurrences: '1',
      maxOccurrences: '1',
      observation: ''
    })
  })
})
