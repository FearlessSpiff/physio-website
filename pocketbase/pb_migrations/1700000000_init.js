/// <reference path="../pb_data/types.d.ts" />

migrate((db) => {
    // courses collection
    const courses = new Collection({
        "id": "courses000001",
        "name": "courses",
        "type": "base",
        "schema": [
            { "id": "f001", "name": "title",               "type": "text",   "required": true,  "options": { "min": 1, "max": 200, "pattern": "" } },
            { "id": "f002", "name": "description",          "type": "text",   "required": false, "options": { "min": null, "max": 2000, "pattern": "" } },
            { "id": "f003", "name": "date",                 "type": "text",   "required": true,  "options": { "min": null, "max": null, "pattern": "" } },
            { "id": "f004", "name": "time",                 "type": "text",   "required": false, "options": { "min": null, "max": null, "pattern": "" } },
            { "id": "f005", "name": "location",             "type": "text",   "required": true,  "options": { "min": null, "max": null, "pattern": "" } },
            { "id": "f006", "name": "address",              "type": "text",   "required": false, "options": { "min": null, "max": null, "pattern": "" } },
            { "id": "f007", "name": "max_participants",     "type": "number", "required": false, "options": { "min": 1, "max": null, "noDecimal": true } },
            { "id": "f008", "name": "current_participants", "type": "number", "required": false, "options": { "min": 0, "max": null, "noDecimal": true } },
            { "id": "f009", "name": "price",                "type": "number", "required": false, "options": { "min": 0, "max": null, "noDecimal": false } },
            { "id": "f010", "name": "currency",             "type": "text",   "required": false, "options": { "min": null, "max": 10,   "pattern": "" } },
            { "id": "f011", "name": "is_active",            "type": "bool",   "required": false, "options": {} }
        ],
        "listRule": "",
        "viewRule": "",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    });
    Dao(db).saveCollection(courses);

    // gallery collection
    const gallery = new Collection({
        "id": "gallery000001",
        "name": "gallery",
        "type": "base",
        "schema": [
            { "id": "g001", "name": "title",         "type": "text",   "required": false, "options": { "min": null, "max": 200, "pattern": "" } },
            { "id": "g002", "name": "description",   "type": "text",   "required": false, "options": { "min": null, "max": 500, "pattern": "" } },
            { "id": "g003", "name": "image",         "type": "file",   "required": true,  "options": { "maxSelect": 1, "maxSize": 10485760, "mimeTypes": ["image/jpeg", "image/png", "image/webp", "image/gif"], "thumbs": ["600x400", "1200x0"], "protected": false } },
            { "id": "g004", "name": "display_order", "type": "number", "required": false, "options": { "min": 0, "max": null, "noDecimal": true } }
        ],
        "listRule": "",
        "viewRule": "",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    });
    Dao(db).saveCollection(gallery);

    // contact_messages collection
    const contact = new Collection({
        "id": "contact000001",
        "name": "contact_messages",
        "type": "base",
        "schema": [
            { "id": "c001", "name": "name",    "type": "text",  "required": true,  "options": { "min": 1, "max": 200, "pattern": "" } },
            { "id": "c002", "name": "email",   "type": "email", "required": true,  "options": { "exceptDomains": null, "onlyDomains": null } },
            { "id": "c003", "name": "subject", "type": "text",  "required": false, "options": { "min": null, "max": 300, "pattern": "" } },
            { "id": "c004", "name": "message", "type": "text",  "required": true,  "options": { "min": 1, "max": 5000, "pattern": "" } }
        ],
        "listRule": null,
        "viewRule": null,
        "createRule": "",
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    });
    Dao(db).saveCollection(contact);

}, (db) => {
    for (const id of ["contact000001", "gallery000001", "courses000001"]) {
        try {
            const c = Dao(db).findCollectionByNameOrId(id);
            Dao(db).deleteCollection(c);
        } catch (_) {}
    }
});
