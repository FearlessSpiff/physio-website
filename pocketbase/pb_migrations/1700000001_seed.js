/// <reference path="../pb_data/types.d.ts" />

migrate((db) => {
    const dao = new Dao(db);
    const courses = dao.findCollectionByNameOrId("courses");

    const seedCourses = [
        {
            title: "Yoga for Back Pain Relief",
            description: "A gentle, therapeutically guided yoga course for people dealing with lower back pain or recovering from a spinal injury. Postures are adapted to your level with physiotherapy principles at the core.",
            date: "2026-07-15",
            time: "09:00 – 12:00",
            location: "Zurich",
            address: "Musterstrasse 1, 8001 Zürich",
            max_participants: 12,
            current_participants: 5,
            price: 180,
            currency: "CHF",
            is_active: true,
        },
        {
            title: "Pilates Fundamentals",
            description: "Learn the foundational Pilates repertoire with a focus on core stability, posture, and controlled movement. Ideal for beginners or those returning after injury.",
            date: "2026-08-03",
            time: "09:00 – 12:00",
            location: "Basel",
            address: "Hauptstrasse 22, 4051 Basel",
            max_participants: 10,
            current_participants: 7,
            price: 160,
            currency: "CHF",
            is_active: true,
        },
        {
            title: "Restorative Yoga & Breathwork",
            description: "A deeply restorative course combining long-held supported postures with guided breathwork techniques. Designed to calm the nervous system and aid recovery from stress or chronic pain.",
            date: "2026-08-20",
            time: "10:00 – 13:00",
            location: "Bern",
            address: "Bahnhofplatz 10, 3011 Bern",
            max_participants: 14,
            current_participants: 2,
            price: 150,
            currency: "CHF",
            is_active: true,
        },
        {
            title: "Clinical Pilates for Rehabilitation",
            description: "An evidence-based Pilates programme developed for patients in active physiotherapy rehabilitation. Focuses on neuromuscular control, joint stability, and functional movement patterns.",
            date: "2026-09-10",
            time: "09:00 – 17:00",
            location: "Lucerne",
            address: "Pilatusstrasse 5, 6003 Luzern",
            max_participants: 8,
            current_participants: 3,
            price: 320,
            currency: "CHF",
            is_active: true,
        },
    ];

    for (const data of seedCourses) {
        const record = new Record(courses, data);
        dao.saveRecord(record);
    }

}, (db) => {
    // no down migration for seed data
});
