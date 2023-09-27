/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w3ir4eatdc5d3ts")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s0cpgu0o",
    "name": "Vege",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w3ir4eatdc5d3ts")

  // remove
  collection.schema.removeField("s0cpgu0o")

  return dao.saveCollection(collection)
})
