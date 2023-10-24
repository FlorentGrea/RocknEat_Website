/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3qfoi9pg6efmefe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1zdmfwks",
    "name": "active",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3qfoi9pg6efmefe")

  // remove
  collection.schema.removeField("1zdmfwks")

  return dao.saveCollection(collection)
})
