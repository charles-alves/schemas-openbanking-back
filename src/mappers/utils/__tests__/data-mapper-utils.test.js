import { dataMapperUtils } from '../data-mapper-utils.js'

describe('Testing class util to data mappers', () => {
  describe('Test getOcurrencesValue method', () => {
    it('should return 1 when receve a dash parameter value', () => {
      const ocurrences = dataMapperUtils.getOcurrencesValue('-')

      expect(ocurrences).toEqual(1)
    })

    it('should return N when receaves a N parameter value', () => {
      const ocurrences = dataMapperUtils.getOcurrencesValue('N')

      expect(ocurrences).toEqual('N')
    })

    it('should return a valid number when receve a number as parameter', () => {
      const ocurrences = dataMapperUtils.getOcurrencesValue('10')

      expect(ocurrences).toEqual(10)
    })

    it('should throws an erro when receaves an invalid parameter', () => {
      expect(() => {
        dataMapperUtils.getOcurrencesValue('a')
      }).toThrow(Error)
    })
  })

  describe('Test getFieldType method', () => {
    it('should return Enum type to multe valued text type field', () => {
      const fieldType = dataMapperUtils.getFieldType({
        fieldType: 'Texto',
        allowedValues: ['A', 'B']
      })

      expect(fieldType).toEqual('Enum')
    })

    it('should return String to a text field type and empty allowed values', () => {
      const fieldType = dataMapperUtils.getFieldType({
        fieldType: 'Texto',
        allowedValues: []
      })

      expect(fieldType).toEqual('String')
    })

    it('should return Object to a Object field type', () => {
      const fieldType = dataMapperUtils.getFieldType({
        fieldType: 'Object',
        allowedValues: []
      })

      expect(fieldType).toEqual('Object')
    })

    it('should return boolean to a Bolleano field type', () => {
      const fieldType = dataMapperUtils.getFieldType({
        fieldType: 'Booleano',
        allowedValues: []
      })

      expect(fieldType).toEqual('boolean')
    })

    it('should return List to a List field type', () => {
      const fieldType = dataMapperUtils.getFieldType({
        fieldType: 'List',
        allowedValues: []
      })

      expect(fieldType).toEqual('List')
    })

    it('should return Field to an unmapped type', () => {
      const fieldType = dataMapperUtils.getFieldType({
        fieldType: 'Loan',
        allowedValues: []
      })

      expect(fieldType).toEqual('Field')
    })

    it('should return Object to an empty field type', () => {
      const fieldType = dataMapperUtils.getFieldType({
        fieldType: '',
        allowedValues: []
      })

      expect(fieldType).toEqual('Object')
    })
  })

  describe('Test createField method', () => {
    it('should create a String field', () => {
      const field = dataMapperUtils.createField({
        fieldType: 'Texto',
        description: 'A String field',
        size: 30,
        required: true,
        regexValidation: '\\w*\\W*',
        allowedValues: [],
        observation: ''
      })

      expect(field).toEqual({
        meta: {
          fieldType: 'String',
          description: 'A String field',
          size: 30,
          required: true,
          validation: '\\w*\\W*',
          allowedValues: [],
          observation: ''
        }
      })
    })

    it('should create a Enum field', () => {
      const field = dataMapperUtils.createField({
        fieldType: 'Texto',
        description: 'A String field',
        size: 30,
        required: true,
        regexValidation: '\\w*\\W*',
        allowedValues: ['A', 'B', 'C'],
        observation: ''
      })

      expect(field).toEqual({
        meta: {
          fieldType: 'Enum',
          description: 'A String field',
          size: 30,
          required: true,
          validation: '\\w*\\W*',
          allowedValues: [
            {
              enum: 'A',
              value: 'A'
            },
            {
              enum: 'B',
              value: 'B'
            },
            {
              enum: 'C',
              value: 'C'
            }
          ],
          observation: ''
        }
      })
    })

    it('should create a unmapped field with fieldType Field', () => {
      const field = dataMapperUtils.createField({
        fieldType: 'Loan',
        description: 'A String field',
        size: 30,
        required: true,
        regexValidation: '\\w*\\W*',
        allowedValues: ['A', 'B', 'C'],
        observation: ''
      })

      expect(field).toEqual({
        meta: {
          fieldType: 'Field',
          description: 'A String field',
          size: 30,
          required: true,
          validation: '\\w*\\W*',
          allowedValues: [
            {
              enum: 'A',
              value: 'A'
            },
            {
              enum: 'B',
              value: 'B'
            },
            {
              enum: 'C',
              value: 'C'
            }
          ],
          observation: ''
        }
      })
    })
  })
})
