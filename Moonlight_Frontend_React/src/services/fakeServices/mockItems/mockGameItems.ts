import type { GameResponseDTO } from "../../../@types/game/game.dto";

export const mockGameItems: GameResponseDTO[] = [
  {
    id_game: 1,
    title: "Elden Ring",
    description: "Levante-se, Maculado, e seja guiado pela graça para portar o poder do Anel Príncipio e se tornar um Lorde Príncipio nas Terras Intermédias.",
    price: 249.9,
    launch_date: new Date("2022-02-25"),
    active: true,
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/hero_capsule.jpg",
    banner_image: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/library_hero.jpg",
    link: "/game/elden-ring",
    categories: ["RPG", "Ação e Aventura"]
  },
  {
    id_game: 2,
    title: "Counter-Strike 2",
    description: "Por mais de duas décadas, o Counter-Strike ofereceu uma experiência competitiva de elite. Agora, o próximo capítulo da saga CS começou.",
    price: 0,
    launch_date: new Date("2023-09-27"),
    active: true,
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/hero_capsule.jpg",
    banner_image: "https://cdn.akamai.steamstatic.com/steam/apps/730/library_hero.jpg",
    link: "/game/cs2",
    categories: ["FPS"]
  },
  {
    id_game: 3,
    title: "Forza Horizon 5",
    description: "Sua aventura Horizon definitiva te espera! Explore as paisagens vibrantes e em constante evolução do mundo aberto do México.",
    price: 249.0,
    launch_date: new Date("2021-11-09"),
    active: true,
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/hero_capsule.jpg",
    banner_image: "https://cdn.akamai.steamstatic.com/steam/apps/1551360/library_hero.jpg",
    link: "/game/forza-horizon-5",
    categories: ["Corrida"]
  },
  {
    id_game: 4,
    title: "Stardew Valley",
    description: "Você herdou a antiga fazenda do seu avô. Com ferramentas de segunda mão e algumas moedas, você parte para começar sua nova vida.",
    price: 24.99,
    launch_date: new Date("2016-02-26"),
    active: true,
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/hero_capsule.jpg",
    banner_image: "https://cdn.akamai.steamstatic.com/steam/apps/413150/library_hero.jpg",
    link: "/game/stardew-valley",
    categories: ["RPG", "Indie"]
  },
  {
    id_game: 5,
    title: "Cyberpunk 2077",
    description: "Um RPG de ação e aventura em mundo aberto ambientado em Night City, uma megalópole obcecada por poder, glamour e modificações corporais.",
    price: 199.9,
    launch_date: new Date("2020-12-10"),
    active: true,
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/hero_capsule.jpg",
    banner_image: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/library_hero.jpg",
    link: "/game/cyberpunk-2077",
    categories: ["RPG", "FPS", "Ação e Aventura"]
  },
  {
    id_game: 6,
    title: "Hollow Knight",
    description: "Forje seu próprio caminho em Hollow Knight! Uma aventura épica de ação através de um reino vasto e arruinado de insetos e heróis.",
    price: 27.99,
    launch_date: new Date("2017-02-24"),
    active: false,
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/hero_capsule.jpg",
    banner_image: "https://cdn.akamai.steamstatic.com/steam/apps/367520/library_hero.jpg",
    link: "/game/hollow-knight",
    categories: ["Ação e Aventura", "Indie"]
  },
  {
    id_game: 7,
    title: "Resident Evil 4",
    description: "A sobrevivência é apenas o começo. Seis anos após o desastre biológico em Raccoon City, Leon S. Kennedy busca a filha do presidente.",
    price: 169.00,
    launch_date: new Date("2023-03-24"),
    active: true,
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/hero_capsule.jpg",
    banner_image: "https://cdn.akamai.steamstatic.com/steam/apps/2050650/library_hero.jpg",
    link: "/game/re4-remake",
    categories: ["Terror", "Ação e Aventura"]
  },
  {
    id_game: 8,
    title: "Street Fighter 6",
    description: "O novo capítulo da lendária franquia de luta. Domine o Fighting Ground, explore o World Tour e brilhe no Battle Hub.",
    price: 249.00,
    launch_date: new Date("2023-06-01"),
    active: true,
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/hero_capsule.jpg",
    banner_image: "https://cdn.akamai.steamstatic.com/steam/apps/1364780/library_hero.jpg",
    link: "/game/sf6",
    categories: ["Luta"]
  },
  {
    id_game: 9,
    title: "The Witcher 3: Wild Hunt",
    description: "Torne-se um caçador de monstros profissional e embarque em uma aventura de proporções épicas para encontrar a criança da profecia.",
    price: 129.99,
    launch_date: new Date("2015-05-18"),
    active: true,
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/hero_capsule.jpg",
    banner_image: "https://cdn.akamai.steamstatic.com/steam/apps/292030/library_hero.jpg",
    link: "/game/witcher-3",
    categories: ["RPG", "Ação e Aventura"]
  },
  {
    id_game: 10,
    title: "Baldur's Gate 3",
    description: "Reúna seu grupo e retorne aos Reinos Esquecidos em uma história de amizade e traição, sacrifício e sobrevivência, e a atração pelo poder absoluto.",
    price: 199.99,
    launch_date: new Date("2023-08-03"),
    active: true,
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/hero_capsule.jpg",
    banner_image: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/library_hero.jpg",
    link: "/game/baldurs-gate-3",
    categories: ["RPG", "Estratégia"]
  }
];
