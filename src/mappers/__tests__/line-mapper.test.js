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

describe('lineMapper.parse v2 test', () => {
  it('should process a line with list type', () => {
    const result = lineMapper.parse([
      '|......|......|......|......priorityServices',
      '',
      'where SERVICE.SERVICE_TYPE in (\'PRIORITY\')',
      'Lista das Tarifas cobradas sobre Serviços Prioritários',
      'Lista',
      '',
      '',
      '',
      '',
      '1',
      '31',
      ''
    ])

    expect(result).toEqual({
      name: 'priorityServices',
      level: 4,
      description: 'Lista das Tarifas cobradas sobre Serviços Prioritários',
      fieldType: 'Lista',
      size: 0,
      required: false,
      regexValidation: '',
      allowedValues: [],
      minOccurrences: '1',
      maxOccurrences: '31',
      observation: ''
    })
  })

  it('should process a line with list type with value N in max ocurrences', () => {
    const result = lineMapper.parse([
      '|......|......|......|......priorityServices',
      '',
      'where SERVICE.SERVICE_TYPE in (\'PRIORITY\')',
      'Lista das Tarifas cobradas sobre Serviços Prioritários',
      'Lista',
      '',
      '',
      '',
      '',
      '1',
      'N',
      ''
    ])

    expect(result).toEqual({
      name: 'priorityServices',
      level: 4,
      description: 'Lista das Tarifas cobradas sobre Serviços Prioritários',
      fieldType: 'Lista',
      size: 0,
      required: false,
      regexValidation: '',
      allowedValues: [],
      minOccurrences: '1',
      maxOccurrences: 'N',
      observation: ''
    })
  })

  it('should process a line with required field', () => {
    const result = lineMapper.parse([
      '|......name',
      'name',
      'BRAND.NAME',
      'Nome da Marca reportada pelo participante do Open Banking.',
      'Texto',
      '80',
      'Obrigatório',
      '\\w*\\W*',
      '',
      '1',
      '1',
      ''
    ])

    expect(result).toEqual({
      name: 'name',
      level: 1,
      description: 'Nome da Marca reportada pelo participante do Open Banking.',
      fieldType: 'Texto',
      size: 80,
      required: true,
      regexValidation: '\\w*\\W*',
      allowedValues: [],
      minOccurrences: '1',
      maxOccurrences: '1',
      observation: ''
    })
  })

  it('should process a line with NA observation value', () => {
    const result = lineMapper.parse([
      '|......name',
      'name',
      'BRAND.NAME',
      'Nome da Marca reportada pelo participante do Open Banking.',
      'Texto',
      '80',
      'Obrigatório',
      '\\w*\\W*',
      '',
      '1',
      '1',
      'NA'
    ])

    expect(result).toEqual({
      name: 'name',
      level: 1,
      description: 'Nome da Marca reportada pelo participante do Open Banking.',
      fieldType: 'Texto',
      size: 80,
      required: true,
      regexValidation: '\\w*\\W*',
      allowedValues: [],
      minOccurrences: '1',
      maxOccurrences: '1',
      observation: ''
    })
  })
})
