/// <reference path="../pb_data/types.d.ts" />

migrate((db) => {
    const settings = new Collection({
        "id": "settings00001",
        "name": "site_settings",
        "type": "base",
        "schema": [
            { "id": "s001", "name": "about_photo",      "type": "file", "required": false, "options": { "maxSelect": 1, "maxSize": 10485760, "mimeTypes": ["image/jpeg", "image/png", "image/webp"], "thumbs": ["400x500", "800x1000"], "protected": false } },
            { "id": "s002", "name": "about_name",        "type": "text", "required": false, "options": { "min": null, "max": 100, "pattern": "" } },
            { "id": "s003", "name": "about_credential",  "type": "text", "required": false, "options": { "min": null, "max": 100, "pattern": "" } }
        ],
        "listRule": "",
        "viewRule": "",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    });
    Dao(db).saveCollection(settings);

    // seed one empty settings record so the admin just edits rather than creates
    const dao = new Dao(db);
    const col = dao.findCollectionByNameOrId("site_settings");
    const record = new Record(col, {
        about_name: "Your Name",
        about_credential: "MSc. Physiotherapy",
    });
    dao.saveRecord(record);

}, (db) => {
    try {
        const c = Dao(db).findCollectionByNameOrId("site_settings");
        Dao(db).deleteCollection(c);
    } catch (_) {}
});
