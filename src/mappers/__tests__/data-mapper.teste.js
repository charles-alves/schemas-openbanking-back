import { dataMapper } from '../data-mapper.js'

describe('Test dataMapper', () => {
  it('should process a v1 data', () => {
    const obj = dataMapper.createObject([
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

  it('should process a v2 data', () => {
    const obj = dataMapper.createObject([
      {
        name: 'brand',
        level: 0,
        description: '',
        fieldType: '',
        size: 0,
        required: true,
        regexValidation: '',
        allowedValues: [],
        minOccurrences: '-',
        maxOccurrences: '-',
        observation: ''
      },
      {
        name: 'name',
        level: 1,
        description: 'This is an application name',
        fieldType: 'Texto',
        size: 30,
        required: true,
        regexValidation: '\\w*\\W*',
        allowedValues: [],
        minOccurrences: '1',
        maxOccurrences: '1',
        observation: 'NA'
      },
      {
        name: 'cpnj',
        level: 1,
        description: 'This is a corporation CNPJ',
        fieldType: 'Texto',
        size: 14,
        required: true,
        regexValidation: '\\w*\\W*',
        allowedValues: [],
        minOccurrences: '1',
        maxOccurrences: '1',
        observation: 'NA'
      },
      {
        name: 'loans',
        level: 1,
        description: '',
        fieldType: 'List',
        size: 0,
        required: true,
        regexValidation: '',
        allowedValues: [],
        minOccurrences: '14',
        maxOccurrences: '14',
        observation: ''
      },
      {
        name: 'type',
        level: 2,
        description: 'Avaliable loans types',
        fieldType: 'Texto',
        size: 30,
        required: true,
        regexValidation: '',
        allowedValues: ['CONSIGNADO', 'CHEQUE-ESPECIAL'],
        minOccurrences: '1',
        maxOccurrences: '1',
        observation: ''
      },
      {
        name: 'url',
        level: 1,
        description: 'More information URL',
        fieldType: 'Texto',
        size: 160,
        required: false,
        regexValidation: '\\w*\\W*',
        allowedValues: [],
        minOccurrences: '1',
        maxOccurrences: '1',
        observation: ''
      }
    ])

    expect(obj).toEqual({
      brand: {
        meta: {
          fieldType: 'Object',
          minOccurrences: 1,
          maxOccurrences: 1,
          required: true,
          validation: '',
          allowedValues: [],
          observation: '',
          size: 0,
          description: ''
        },
        name: {
          meta: {
            fieldType: 'String',
            minOccurrences: 1,
            maxOccurrences: 1,
            required: true,
            validation: '\\w*\\W*',
            allowedValues: [],
            observation: 'NA',
            size: 30,
            description: 'This is an application name'
          }
        },
        cpnj: {
          meta: {
            fieldType: 'String',
            minOccurrences: 1,
            maxOccurrences: 1,
            required: true,
            validation: '\\w*\\W*',
            allowedValues: [],
            observation: 'NA',
            size: 14,
            description: 'This is a corporation CNPJ'
          }
        },
        loans: {
          meta: {
            fieldType: 'List',
            minOccurrences: 14,
            maxOccurrences: 14,
            required: true,
            validation: '',
            allowedValues: [],
            observation: '',
            size: 0,
            description: ''
          },
          type: {
            meta: {
              fieldType: 'Enum',
              minOccurrences: 1,
              maxOccurrences: 1,
              required: true,
              validation: '',
              allowedValues: [
                {
                  enum: 'CONSIGNADO',
                  value: 'CONSIGNADO'
                },
                {
                  enum: null,
                  value: 'CHEQUE-ESPECIAL'
                }
              ],
              observation: '',
              size: 30,
              description: 'Avaliable loans types'
            }
          }
        },
        url: {
          meta: {
            fieldType: 'String',
            minOccurrences: 1,
            maxOccurrences: 1,
            required: false,
            validation: '\\w*\\W*',
            allowedValues: [],
            observation: '',
            size: 160,
            description: 'More information URL'
          }
        }
      }
    })
  })
})
