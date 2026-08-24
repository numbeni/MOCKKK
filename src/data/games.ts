export type GamePlatform = 'PS4' | 'PS5' | 'PS4 + PS5';
export type GameCategory = 'all' | 'orders' | 'settings' | 'tickets';

export interface Game {
  id: string;
  title: string;
  cover: string;
  platform: GamePlatform;
  active: boolean;
  pinned: boolean;
  accountCount: number;
}

export const games: Game[] = [
  { id: 'g1', title: 'F1 25', platform: 'PS5', active: true, pinned: false, accountCount: 0, cover: 'https://images.pexels.com/photos/20196376/pexels-photo-20196376.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'g2', title: 'EA Sports FC 25', platform: 'PS4 + PS5', active: true, pinned: true, accountCount: 12, cover: 'https://images.pexels.com/photos/9072216/pexels-photo-9072216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'g3', title: 'Call of Duty: Black Ops 6', platform: 'PS5', active: true, pinned: false, accountCount: 8, cover: 'https://images.pexels.com/photos/5030527/pexels-photo-5030527.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'g4', title: 'Grand Theft Auto V', platform: 'PS4', active: false, pinned: false, accountCount: 4, cover: 'https://images.pexels.com/photos/10068853/pexels-photo-10068853.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'g5', title: 'God of War Ragnarök', platform: 'PS4 + PS5', active: true, pinned: true, accountCount: 6, cover: 'https://images.pexels.com/photos/14201953/pexels-photo-14201953.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'g6', title: 'The Last of Us Part II Remastered', platform: 'PS5', active: true, pinned: false, accountCount: 3, cover: 'https://images.pexels.com/photos/217660/pexels-photo-217660.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'g7', title: 'Hogwarts Legacy', platform: 'PS4', active: true, pinned: false, accountCount: 9, cover: 'https://images.pexels.com/photos/29189097/pexels-photo-29189097.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'g8', title: 'Marvel’s Spider-Man 2', platform: 'PS5', active: true, pinned: false, accountCount: 5, cover: 'https://images.pexels.com/photos/18545010/pexels-photo-18545010.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'g9', title: 'Mortal Kombat 1', platform: 'PS4 + PS5', active: true, pinned: false, accountCount: 2, cover: 'https://images.pexels.com/photos/30903758/pexels-photo-30903758.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'g10', title: 'Red Dead Redemption 2', platform: 'PS4', active: true, pinned: false, accountCount: 11, cover: 'https://images.pexels.com/photos/29652322/pexels-photo-29652322.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'g11', title: 'Assassin’s Creed Mirage', platform: 'PS4 + PS5', active: false, pinned: false, accountCount: 1, cover: 'https://images.pexels.com/photos/10002074/pexels-photo-10002074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'g12', title: '007 Legends', platform: 'PS4', active: true, pinned: false, accountCount: 0, cover: 'https://images.pexels.com/photos/11876812/pexels-photo-11876812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

export const platforms: GamePlatform[] = ['PS4', 'PS5', 'PS4 + PS5'];
export const alphabet = ['همه', 'PIN', '0-9', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
