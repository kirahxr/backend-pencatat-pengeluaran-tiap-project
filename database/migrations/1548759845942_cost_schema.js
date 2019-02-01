'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CostSchema extends Schema {
  up () {
    this.create('costs', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.integer('amount')
      table.boolean('completed')
      table.timestamps()
    })
  }

  down () {
    this.drop('costs')
  }
}

module.exports = CostSchema
