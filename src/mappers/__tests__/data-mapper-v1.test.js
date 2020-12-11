import { dataMapperV1 } from '../data-mapper-v1.js'
import { dataMapper } from '../data-mapper.js'

describe('dataMapperV1 test', () => {
  it('should resturn an empty object if the array is also empty', () => {
    const response = dataMapperV1.createObject([])

    expect(response).toEqual({})
  })

  it('should process the fisrt level object', () => {
    const result = dataMapperV1.createObject([
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
    const result = dataMapperV1.createObject([
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
    const result = dataMapperV1.createObject([
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
    const result = dataMapperV1.createObject([
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

  it('should process a complex structure', () => {
    const obj = dataMapperV1.createObject([
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
      },
      {
        name: 'loans',
        level: 1,
        description: '',
        fieldType: '',
        size: 0,
        required: false,
        regexValidation: '',
        allowedValues: [],
        minOccurrences: '',
        maxOccurrences: '',
        observation: ''
      },
      {
        name: 'type',
        level: 2,
        description: 'Type of loan',
        fieldType: 'Texto',
        size: 30,
        required: true,
        regexValidation: '\\w\\W',
        allowedValues: ['CHEQUE-ESPECIAL', 'CONSIGNADO', 'FINANCIAMENTO_IMOVEL'],
        minOccurrences: '32',
        maxOccurrences: '32',
        observation: ''
      },
      {
        name: 'cpnj',
        level: 1,
        description: 'Company CNPJ',
        fieldType: 'Texto',
        size: 14,
        required: true,
        regexValidation: '\\w*\\W*',
        allowedValues: [],
        minOccurrences: '1',
        maxOccurrences: '33',
        observation: ''
      }
    ])

    expect(obj).toEqual({
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
        },
        loans: {
          meta: {
            fieldType: 'List',
            required: true,
            minOccurrences: 32,
            maxOccurrences: 32
          },
          type: {
            meta: {
              fieldType: 'Enum',
              description: 'Type of loan',
              size: 30,
              required: true,
              validation: '\\w\\W',
              allowedValues: [
                {
                  enum: null,
                  value: 'CHEQUE-ESPECIAL'
                },
                {
                  enum: 'CONSIGNADO',
                  value: 'CONSIGNADO'
                },
                {
                  enum: 'FINANCIAMENTO_IMOVEL',
                  value: 'FINANCIAMENTO_IMOVEL'
                }
              ],
              observation: '',
              minOccurrences: 32,
              maxOccurrences: 32
            }
          }
        },
        cpnj: {
          meta: {
            description: 'Company CNPJ',
            fieldType: 'String',
            size: 14,
            required: true,
            validation: '\\w*\\W*',
            allowedValues: [],
            minOccurrences: 1,
            maxOccurrences: 33,
            observation: ''
          }
        }
      }
    })
  })
})
