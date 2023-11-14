/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ktdaiw96um5rzkr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ujholmkm",
    "name": "image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ktdaiw96um5rzkr")

  // remove
  collection.schema.removeField("ujholmkm")

  return dao.saveCollection(collection)
})
