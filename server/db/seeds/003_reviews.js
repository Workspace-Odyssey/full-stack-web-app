/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('reviews').del()
  await knex('reviews').insert([
    {
      content: 'Great place to work! The atmosphere is productive and the amenities are top-notch.',
      stars: 5,
      user_id: '9b99857c-4346-4686-962b-c2ce4c1cf9e3',
      coworking_id: '7f776f15-7e04-4f3c-81da-8a90f69b37f2',
      created_at: '2025-02-05'
    },
    {
      content: 'The coffee is amazing, but the Wi-Fi can be slow during peak hours.',
      stars: 3,
      user_id: '6ef29d68-660e-4a57-bd3e-266cd6dbf93f',
      coworking_id: 'd4cf3fe6-504e-4219-a94e-6676fb8b5bcd',
      created_at: '2025-01-28'
    },
    {
      content: 'Perfect for collaborative work, but a bit noisy at times.',
      stars: 4,
      user_id: 'a0c9d7a6-cb62-418c-9d95-b44a6a2bab43',
      coworking_id: 'cd067c88-b14e-484b-9d4f-4be3fbec2511',
      created_at: '2025-01-18'
    },
    {
      content: 'Not a bad spot, but could use more private rooms for focused work.',
      stars: 3,
      user_id: '152fca67-30b3-4bd8-a5c9-09b85d0c5de7',
      coworking_id: 'e7a48b92-290b-49d1-88cd-73357b87fbe1',
      created_at: '2025-01-10'
    },
    {
      content: 'Super quiet and well-designed. The team is friendly and helpful.',
      stars: 5,
      user_id: '049f4efd-f9ed-4280-b5b8-adeb70e84030',
      coworking_id: '7495b8af-c3eb-42d7-a51d-092522588c89',
      created_at: '2025-01-22'
    },
    {
      content: 'Decent place to work, but lacks variety in seating options.',
      stars: 3,
      user_id: 'cb0c0658-380a-45a4-983b-8ff7b3ddfa7b',
      coworking_id: '7f776f15-7e04-4f3c-81da-8a90f69b37f2',
      created_at: '2025-01-30'
    },
    {
      content: 'Great value for the price. Would come back again for sure.',
      stars: 4,
      user_id: '9b99857c-4346-4686-962b-c2ce4c1cf9e3',
      coworking_id: 'd4cf3fe6-504e-4219-a94e-6676fb8b5bcd',
      created_at: '2025-02-01'
    },
    {
      content: 'The location is fantastic, but the space gets crowded during lunch.',
      stars: 4,
      user_id: '6ef29d68-660e-4a57-bd3e-266cd6dbf93f',
      coworking_id: 'cd067c88-b14e-484b-9d4f-4be3fbec2511',
      created_at: '2025-01-25'
    },
    {
      content: 'I love the vibe here! The community is so supportive and welcoming.',
      stars: 5,
      user_id: 'a0c9d7a6-cb62-418c-9d95-b44a6a2bab43',
      coworking_id: 'e7a48b92-290b-49d1-88cd-73357b87fbe1',
      created_at: '2025-01-12'
    },
    {
      content: 'There are a lot of distractions, but overall a good environment.',
      stars: 3,
      user_id: '152fca67-30b3-4bd8-a5c9-09b85d0c5de7',
      coworking_id: '7495b8af-c3eb-42d7-a51d-092522588c89',
      created_at: '2025-01-19'
    }
  ]);
};
