export const stages = [
  {
    name: "forest",
    background:
      "url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    levels: 10,
    fight: [2, 6],
    boss: [9],
    tresure: [4],
    presentation:
      "ti dai un'occhiata intorno e noti il sole che a malapena si vede tra tutti i tronchi degli alberi è capisci subito di trovarti nella foresta ",
  },
  {
    name: "swamp",
    background: "url('https://pbs.twimg.com/media/EYZZBm8XYAAih1v.jpg')",
    levels: 10,
    fight: [2, 6],
    boss: [9],
    tresure: [4],
    presentation:
      "si sentono insetti di ogni tipo vedi ragnatele ovunque, l'acqua ti arriva alle ginocchia questa deve essere la palude",
  },
];

export const enemies = [
  {
    name: "goblin",
    health: 20,
    maxHealth: 20,
    attack: 2,
    defence: 0,
    image: "https://www.svgheart.com/wp-content/uploads/2021/11/goblin-halloween-free-svg-file-SvgHeart.Com.png",
    armorClass: 8,
    bonus: 0,
    description: "un nemico non molto sveglio ma comunque pericoloso specialmente in gruppo",
  },
  {
    name: "slime",
    health: 10,
    maxHealth: 10,
    attack: 1,
    defence: 0,
    image: "https://i.pinimg.com/originals/14/4f/ff/144fffe3ddcb5c2d68a724f9e57a1d57.png",
    armorClass: 6,
    bonus: +2,
    description:
      "questo essere gelatinoso può sembrare puccioso ma in verità è molto pericoloso. il suo metodo è quello di inglobare gli avversari facendoli soffocare",
  },
  {
    name: "wolf",
    health: 6,
    maxHealth: 6,
    attack: 1,
    defence: 0,
    image:
      "https://images.vexels.com/media/users/3/288762/isolated/preview/cb7438aba416f821d02d8ea45f65e8d8-howling-wolf-animal.png",
    armorClass: 12,
    bonus: +2,
    description:
      "il lupo è molto veloce è schiva velocemente gli attacchi tuttavia non ha armatura naturale e può essere sconfitto facilmente",
  },
  {
    name: "spider",
    health: 15,
    maxHealth: 15,
    attack: 2,
    defence: 2,
    image:
      "https://img.freepik.com/premium-photo/giant-spider-lurking-shadows-fantasy-concept-illustration-painting-generative-ai_743201-14092.jpg",
    armorClass: 6,
    bonus: 0,
    description: "l'incubo degli aracnofobici",
  },
  {
    name: "witch",
    health: 10,
    maxHealth: 10,
    attack: 4,
    defence: 0,
    image: "https://4vector.com/i/free-vector-old-witch-clip-art_108274_Old_Witch_clip_art_hight.png",
    armorClass: 4,
    bonus: +2,
    description: "questa signora si è ritirata in questa parte della foresta per studiare le arti oscure",
  },
  {
    name: "bandit",
    health: 10,
    maxHealth: 10,
    attack: 2,
    defence: 0,
    image:
      "https://cdn2.iconfinder.com/data/icons/avatar-classes-role-playing-game-2/340/character_rpg_thief_crime_knife_bandit_weapon-512.png",
    armorClass: 8,
    bonus: +2,
    description: "o la borsa o la vita",
  },
];

export const boss = [
  {
    name: "orco",
    health: 60,
    maxHealth: 60,
    attack: 8,
    defence: 2,
    image: "https://i.pinimg.com/originals/91/35/2c/91352c20549a52f152870b4ad1ce1b82.png",
    armorClass: 0,
    bonus: -4,
    description:
      "una creatura letale quanto lenta, i suoi attachi sono facili da schivare ma se ti prendono ti faranno rimpiangere di aver iniziato questo scontro",
  },
  {
    name: "ent",
    health: 100,
    maxHealth: 100,
    attack: 2,
    defence: 2,
    image: "https://i.pinimg.com/originals/49/9b/f3/499bf301a12214c39910a3d9f404ffb5.jpg",
    armorClass: 8,
    bonus: -2,
    description:
      "gli ent sono sempre stati ostili a tutti i tipi di creature che non abitano nei boschi sono molto resistenti",
  },
];

export const items = [
  {
    type: "weapon",
    name: "spada degli abissi",
    image:
      "https://banner2.cleanpng.com/20190212/kgx/kisspng-dark-souls-classification-of-swords-weapon-image-cross-planes-out-of-the-abyss-a-trio-of-magic-we-5c6384b359ea48.1896901215500259073683.jpg",
    bonusAT: 3,
  },
  {
    type: "weapon",
    name: "spada glaciale",
    image:
      "https://e7.pngegg.com/pngimages/896/517/png-clipart-world-of-warcraft-wrath-of-the-lich-king-warcraft-iii-reign-of-chaos-pixel-art-drawing-arthas-menethil-sword-cross-weapon-thumbnail.png",
    bonusAT: 2,
  },
  {
    type: "weapon",
    name: "spada del vuoto",
    image:
      "https://png.pngtree.com/png-clipart/20190906/original/pngtree-purple-long-sword-weapon-png-image_4582441.jpg",
    bonusAT: 1,
  },
  {
    type: "shield",
    name: "scudo di ferro",
    image: "https://freesvg.org/img/Shield_005_SPenguin.png",
    bonusAC: 3,
  },
  {
    type: "shield",
    name: "scudo di cobalto",
    image: "https://i.pinimg.com/originals/56/3a/43/563a43cdaea49e971e5f105e2ab2b69d.png",
    bonusAC: 4,
  },
  {
    type: "shield",
    name: "scudo di legno",
    image:
      "https://cdn3.iconfinder.com/data/icons/medieval-2d-rpg-game-items-weapons-armour-helmets-/26/GAME-SVG_--52-512.png",
    bonusAC: 2,
  },
  {
    type: "armor",
    name: "armatura da samurai",
    image:
      "https://e7.pngegg.com/pngimages/310/622/png-clipart-japanese-armour-body-armor-components-of-medieval-armour-samurai-armour-leather-cuirass.png",
    defence: 1,
  },
  {
    type: "armor",
    name: "armatura di diamante",
    image: "https://i.pinimg.com/736x/67/07/d3/6707d394adc22c8ea4bc137dcfb1c10e.jpg",
    defence: 3,
  },
  {
    type: "armor",
    name: "armatura d'acciaio",
    image:
      "https://w7.pngwing.com/pngs/491/852/png-transparent-the-elder-scrolls-v-skyrim-plate-armour-knight-breastplate-armour-king-steel-human-back.png",
    defence: 2,
  },
];
