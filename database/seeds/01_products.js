exports.seed = async function (knex) {
  // Deleta dados existentes
  await knex("products").del();

  // Insere produtos iniciais com JSON válido
  await knex("products").insert([
    {
      id: 'prod-massas-1',
      name: 'Spaghetti Carbonara',
      description: 'Clássico spaghetti com molho carbonara cremoso, bacon e queijo parmesão',
      category: 'massas',
      base_price: 32.90,
      images: JSON.stringify(['https://example.com/carbonara.jpg']), // ✅ JSON válido
      preparation_time: 20,
      tags: JSON.stringify(['tradicional', 'cremoso']),
      allowed_sizes: JSON.stringify([
        { id: 'small', name: 'Pequena', price: 0 },
        { id: 'medium', name: 'Média', price: 5 },
        { id: 'large', name: 'Grande', price: 10 }
      ]),
      is_available: true
    },
    {
      id: 'prod-massas-2', 
      name: 'Fettuccine Alfredo',
      description: 'Fettuccine com molho Alfredo cremoso e queijo parmesão',
      category: 'massas',
      base_price: 28.90,
      images: JSON.stringify(['https://example.com/alfredo.jpg']),
      preparation_time: 15,
      tags: JSON.stringify(['cremoso', 'vegetariano']),
      allowed_sizes: JSON.stringify([
        { id: 'small', name: 'Pequena', price: 0 },
        { id: 'medium', name: 'Média', price: 5 },
        { id: 'large', name: 'Grande', price: 10 }
      ]),
      is_available: true
    },
    {
      id: "prod-massas-3",
      name: "Penne ao Molho Pomodoro",
      description: "Penne com molho de tomate fresco, manjericão e azeite",
      category: "massas",
      base_price: 24.9,
      images: JSON.stringify(["https://example.com/pomodoro.jpg"]),
      preparation_time: 12,
      tags: JSON.stringify(["tradicional", "vegetariano"]),
      allowed_sizes: JSON.stringify([
        { id: "small", name: "Pequena", price: 0 },
        { id: "medium", name: "Média", price: 4 },
        { id: "large", name: "Grande", price: 8 },
      ]),
      is_available: true,
    },
    {
      id: "prod-risotos-1",
      name: "Risotto de Cogumelos",
      description: "Risotto cremoso com cogumelos frescos e queijo parmesão",
      category: "risotos",
      base_price: 36.9,
      images: JSON.stringify(["https://example.com/risotto.jpg"]),
      preparation_time: 25,
      tags: JSON.stringify(["cremoso", "sofisticado"]),
      allowed_sizes: JSON.stringify([
        { id: "small", name: "Pequena", price: 0 },
        { id: "medium", name: "Média", price: 6 },
        { id: "large", name: "Grande", price: 12 },
      ]),
      is_available: true,
    },
  ]);
};
