import { atom, selector } from 'recoil';

export const toDoState = atom({
  key: 'toDo',
  default: {
    to_do: ['a', 'b'],
    doing: ['c', 'd'],
    done: ['e', 'f'],
  },
});
