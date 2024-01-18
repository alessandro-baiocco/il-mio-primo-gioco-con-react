export const stages = [
  {
    name: "forest",
    background:
      "url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    levels: 10,
    fight: [2, 6],
    boss: [9],
    presentation:
      "ti dai un'occhiata intorno e nori il sole che a malapena si vede tra tutti i tronchi degli alberi è capisci subito di trovarti nella foresta ",
  },
];

export const enemies = [
  {
    name: "goblin",
    health: 20,
    attack: 2,
    defence: 0,
    image: "https://png.pngtree.com/png-clipart/20211022/ourmid/pngtree-goblin-goblin-elf-png-image_4004208.png",
    armorClass: 8,
    bonus: 0,
  },
  {
    name: "slime",
    health: 10,
    attack: 1,
    defence: 0,
    image: "https://toppng.com/uploads/preview/slime-slime-11562980326osnwivy7ba.png",
    armorClass: 6,
    bonus: +2,
  },
];

export const boss = [
  {
    name: "orco",
    health: 60,
    attack: 8,
    defence: 2,
    image: "https://i.pinimg.com/originals/91/35/2c/91352c20549a52f152870b4ad1ce1b82.png",
    armorClass: 2,
    bonus: -4,
  },
];
