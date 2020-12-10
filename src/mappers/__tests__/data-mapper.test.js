import { dataMapper } from '../data-mapper.js'

describe('dataMapper test', () => {
  it('should resturn an empty object if the array is also empty', () => {
    const response = dataMapper.createObject([])

    expect(response).toEqual({})
  })

  it('should process the fisrt level object', () => {
    const result = dataMapper.createObject([
      {
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
      }
    ])

    expect(result).toEqual({
      brand: {
        meta: {
          fieldType: 'Object',
          required: false,
          allowedValues: [],
          description: '',
          observation: '',
          size: 0,
          validation: '',
          minOccurrences: 1,
          maxOccurrences: 1
        }
      }
    })
  })

  it('should process multiple lines', () => {
    const result = dataMapper.createObject([
      {
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
      },
      {
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
      }
    ])

    expect(result).toEqual({
      brand: {
        meta: {
          fieldType: 'Object',
          required: true,
          minOccurrences: 1,
          maxOccurrences: 1
        },
        name: {
          meta: {
            fieldType: 'String',
            description: 'Nome da Marca reportada pelo participante do Open Banking.',
            size: 30,
            required: true,
            validation: '\\w*\\W*',
            allowedValues: [],
            observation: '',
            minOccurrences: 1,
            maxOccurrences: 1
          }
        }
      }
    })
  })

  it('should process mim ocurrences iguals 4', () => {
    const result = dataMapper.createObject([
      {
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
      },
      {
        name: 'name',
        level: 1,
        description: 'Nome da Marca reportada pelo participante do Open Banking.',
        fieldType: 'Texto',
        size: 30,
        required: true,
        regexValidation: '\\w*\\W*',
        allowedValues: [],
        minOccurrences: '4',
        maxOccurrences: '4',
        observation: ''
      }
    ])

    expect(result).toEqual({
      brand: {
        meta: {
          fieldType: 'List',
          required: true,
          minOccurrences: 4,
          maxOccurrences: 4
        },
        name: {
          meta: {
            fieldType: 'String',
            description: 'Nome da Marca reportada pelo participante do Open Banking.',
            size: 30,
            required: true,
            validation: '\\w*\\W*',
            allowedValues: [],
            observation: '',
            minOccurrences: 4,
            maxOccurrences: 4
          }
        }
      }
    })
  })

  it('should process max ocurrences iguals 33', () => {
    const result = dataMapper.createObject([
      {
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
      },
      {
        name: 'name',
        level: 1,
        description: 'Nome da Marca reportada pelo participante do Open Banking.',
        fieldType: 'Texto',
        size: 30,
        required: true,
        regexValidation: '\\w*\\W*',
        allowedValues: [],
        minOccurrences: '1',
        maxOccurrences: '33',
        observation: ''
      }
    ])

    expect(result).toEqual({
      brand: {
        meta: {
          fieldType: 'List',
          required: true,
          minOccurrences: 1,
          maxOccurrences: 33
        },
        name: {
          meta: {
            fieldType: 'String',
            description: 'Nome da Marca reportada pelo participante do Open Banking.',
            size: 30,
            required: true,
            validation: '\\w*\\W*',
            allowedValues: [],
            observation: '',
            minOccurrences: 1,
            maxOccurrences: 33
          }
        }
      }
    })
  })
})
