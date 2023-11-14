/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ktdaiw96um5rzkr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mvmjlzzd",
    "name": "fin",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ktdaiw96um5rzkr")

  // remove
  collection.schema.removeField("mvmjlzzd")

  return dao.saveCollection(collection)
})
