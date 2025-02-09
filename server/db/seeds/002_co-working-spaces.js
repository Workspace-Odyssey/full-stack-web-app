/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('coworkings').del()
  await knex('coworkings').insert([
    {
      uuid: '7f776f15-7e04-4f3c-81da-8a90f69b37f2',
      name: "渋谷宮益坂アントレサロン",
      location: 'Shibuya',
      google_place_id: 'ChIJveS41o6LGGAR4DPwgTYHEfQ',
    },
    {
      uuid: 'd4cf3fe6-504e-4219-a94e-6676fb8b5bcd',
      name: 'COWORKING SALON SLOTH JINNAN',
      location: 'Shibuya',
      google_place_id: 'ChIJnyFntbaNGGARrL2fwyV7Org',
    },
    {
      uuid: 'cd067c88-b14e-484b-9d4f-4be3fbec2511',
      name: 'HAKADORU 渋谷宮益坂店',
      location: "Shibuya",
      google_place_id: 'ChIJEzl7gbWLGGAR1LmYwWvnzns',
    },
    {
      uuid: 'e7a48b92-290b-49d1-88cd-73357b87fbe1',
      name: 'THE MODULE roppongi',
      location: 'Roponggi',
      google_place_id: 'ChIJ_wgWm8qLGGARBV8kzyOU5wQ',
    },
    {
      uuid: '7495b8af-c3eb-42d7-a51d-092522588c89',
      name: 'Spaces',
      location: 'Roponggi',
      google_place_id: 'ChIJaxZROwOLGGARzpvzVNSBntE',
    }
  ]);
};
