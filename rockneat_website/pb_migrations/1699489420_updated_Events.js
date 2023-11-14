/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ktdaiw96um5rzkr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gtjmmos9",
    "name": "status",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ktdaiw96um5rzkr")

  // remove
  collection.schema.removeField("gtjmmos9")

  return dao.saveCollection(collection)
})
