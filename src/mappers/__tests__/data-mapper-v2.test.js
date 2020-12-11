import { dataMapperV2 } from '../data-mapper-v2.js'

describe('dataMapperV2 test', () => {
  it('should create an empty object', () => {
    const object = dataMapperV2.createObject([])

    expect(object).toEqual({ })
  })

  it('should create an Object with first level field', () => {
    const obj = dataMapperV2.createObject([{
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
    }])

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
        }
      }
    })
  })

  it('should create an Object with second level of leaf', () => {
    const obj = dataMapperV2.createObject([
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
        }
      }
    })
  })

  it('should create an Object with a complex structure', () => {
    const obj = dataMapperV2.createObject([
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
        fieldType: 'Lista',
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
