/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ktdaiw96um5rzkr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pitfchnh",
    "name": "date",
    "type": "date",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ktdaiw96um5rzkr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pitfchnh",
    "name": "date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
