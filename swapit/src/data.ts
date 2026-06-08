export type Item = {
  id: string; title: string; desc: string; iconName: string;
  dist: string; city: string; wants: string; wantsCategories: string[];
  owner: string; ownerInitials: string; rating: string; trades: number;
  loc: string; daysAgo: number; category: string;
};

export const ITEMS: Item[] = [
  { id: '1', title: 'Rower górski Trek Marlin 5', desc: 'Trek Marlin 5, rozmiar M, 2019, bardzo dobry stan. Rama aluminiowa, 21 biegów Shimano. Wymienię na sprzęt fotograficzny lub laptopa.', iconName: 'bicycle', dist: '0,3 km', city: 'Kielce', wants: 'Elektronika', wantsCategories: ['Elektronika', 'Laptop'], owner: 'Marek Kowalski', ownerInitials: 'MK', rating: '4,8', trades: 23, loc: 'Kielce, ul. Ogrodowa', daysAgo: 2, category: 'Sport' },
  { id: '2', title: 'Aparat Canon EOS 90D', desc: 'Canon EOS 90D z obiektywem 18-55mm kit, przebieg 5 tys. zdjęć. Stan idealny, wszystkie funkcje sprawne.', iconName: 'camera-outline', dist: '0,8 km', city: 'Kielce', wants: 'Książki', wantsCategories: ['Książki', 'Rowery'], owner: 'Anna Nowak', ownerInitials: 'AN', rating: '5,0', trades: 8, loc: 'Kielce, ul. Jesionowa', daysAgo: 3, category: 'Elektronika' },
  { id: '3', title: 'Gitara Yamaha F310', desc: 'Gitara akustyczna Yamaha F310 w twardym etui. Sprawna, nastrojona. Idealna dla początkujących.', iconName: 'musical-notes-outline', dist: '1,2 km', city: 'Kielce', wants: 'Sport', wantsCategories: ['Sport', 'Elektronika'], owner: 'Piotr Wiśniewski', ownerInitials: 'PW', rating: '4,6', trades: 15, loc: 'Kielce, ul. Lipowa', daysAgo: 5, category: 'Muzyka' },
  { id: '4', title: 'Laptop Dell XPS 13', desc: 'Dell XPS 13 2022, Intel i5-1250P, 16 GB RAM, 512 GB SSD. Ekran 13,4" FHD+. Bateria trzyma 8 h. Stan bardzo dobry.', iconName: 'laptop-outline', dist: '2,1 km', city: 'Kielce', wants: 'Odzież', wantsCategories: ['Odzież', 'Dom'], owner: 'Katarzyna Zając', ownerInitials: 'KZ', rating: '4,9', trades: 31, loc: 'Kielce, ul. Planty', daysAgo: 7, category: 'Elektronika' },
  { id: '5', title: 'Plecak Osprey Atmos 45L', desc: 'Plecak Osprey Atmos AG 45L, rozmiar M/L, kolor zielony. Używany 2 razy. Ergonomiczny system nośny.', iconName: 'bag-outline', dist: '1,6 km', city: 'Kielce', wants: 'Muzyka', wantsCategories: ['Muzyka', 'Książki'], owner: 'Tomasz Malik', ownerInitials: 'TM', rating: '4,7', trades: 6, loc: 'Kielce, ul. Warszawska', daysAgo: 1, category: 'Sport' },
  { id: '6', title: 'Słuchawki Sony WH-1000XM4', desc: 'Sony WH-1000XM4, czarne, ANC, Bluetooth 5.0. Stan bardzo dobry. Oryginalne etui i kabel. Bateria 30 h.', iconName: 'headset-outline', dist: '3,0 km', city: 'Kielce', wants: 'Sport', wantsCategories: ['Sport', 'Rowery'], owner: 'Michał Dąbrowski', ownerInitials: 'MD', rating: '4,5', trades: 19, loc: 'Kielce, ul. Sienkiewicza', daysAgo: 4, category: 'Elektronika' },
];

export const CATEGORIES = ['Wszystkie', 'Elektronika', 'Sport', 'Muzyka', 'Odzież', 'Książki', 'Dom'];

export const MY_ITEMS = [
  { id: 'm1', title: 'Rower górski Trek', date: '3 dni temu', status: 'active' as const, iconName: 'bicycle' },
  { id: 'm2', title: 'Kamera GoPro Hero 9', date: '7 dni temu', status: 'active' as const, iconName: 'videocam-outline' },
  { id: 'm3', title: 'Gitara akustyczna Yamaha', date: '14 dni temu', status: 'done' as const, iconName: 'musical-notes-outline' },
  { id: 'm4', title: 'Plecak turystyczny 45L', date: '21 dni temu', status: 'active' as const, iconName: 'bag-outline' },
  { id: 'm5', title: 'Słuchawki Sony XM4', date: '30 dni temu', status: 'active' as const, iconName: 'headset-outline' },
];

export const OFFERS = [
  { id: 'o1', from: 'Anna Nowak', initials: 'AN', itemOffered: 'Aparat Canon EOS 90D', myItem: 'Rower górski Trek', timeAgo: '2 godz.', iconName: 'camera-outline' },
  { id: 'o2', from: 'Piotr Wiśniewski', initials: 'PW', itemOffered: 'Gitara Yamaha F310', myItem: 'GoPro Hero 9', timeAgo: '1 dzień', iconName: 'musical-notes-outline' },
  { id: 'o3', from: 'Tomasz Malik', initials: 'TM', itemOffered: 'Plecak Osprey 45L', myItem: 'Słuchawki Sony', timeAgo: '2 dni', iconName: 'bag-outline' },
];
