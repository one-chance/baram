import { atom } from 'recoil';

interface IPostFilter {
  query: Array<string>
}

const FilterState = atom<IPostFilter>({
  key: "FilterState",
  default: {
    query : []
  },
});

export default FilterState;