import { atom } from 'recoil';

interface IPostFilter {
  filter: string | undefined,
  keyword: string | undefined
}

const FilterState = atom<IPostFilter>({
  key: "FilterState",
  default: {
    filter: undefined,
    keyword: undefined
  },
});

export default FilterState;