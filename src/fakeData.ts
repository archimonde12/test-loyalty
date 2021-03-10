type User = {
  slug: string;
  parent: string | null;
  children: string[];
  totalPersonalBet: number;
  currentPersonalBet: number;
  totalSystemBet: number;
  currentSystemBet: number;
  _lastCalculatedWeek: number;
  _userLayer: number;
};

type SystemInfo = {
  weekNo: number;
  levelMax: number;
};

type BetData = {
  slug: string;
  amount: number;
};
let FakeUserData: User[] = [
  {
    slug: "hoan001",
    parent: null,
    children: ["hoan002", "hoan003", "hoan004"],
    totalPersonalBet: 0,
    currentPersonalBet: 0,
    totalSystemBet: 0,
    currentSystemBet: 0,
    _lastCalculatedWeek: 0,
    _userLayer: 0,
  },
  {
    slug: "hoan002",
    parent: "hoan001",
    children: ["hoan005", "hoan006"],
    totalPersonalBet: 0,
    currentPersonalBet: 0,
    totalSystemBet: 0,
    currentSystemBet: 0,
    _lastCalculatedWeek: 0,
    _userLayer: 1,
  },
  {
    slug: "hoan003",
    parent: "hoan001",
    children: [],
    totalPersonalBet: 0,
    currentPersonalBet: 0,
    totalSystemBet: 0,
    currentSystemBet: 0,
    _lastCalculatedWeek: 0,
    _userLayer: 1,
  },
  {
    slug: "hoan004",
    parent: "hoan001",
    children: [],
    totalPersonalBet: 0,
    currentPersonalBet: 0,
    totalSystemBet: 0,
    currentSystemBet: 0,
    _lastCalculatedWeek: 0,
    _userLayer: 1,
  },
  {
    slug: "hoan005",
    parent: "hoan002",
    children: ["hoan007"],
    totalPersonalBet: 0,
    currentPersonalBet: 0,
    totalSystemBet: 0,
    currentSystemBet: 0,
    _lastCalculatedWeek: 0,
    _userLayer: 2,
  },
  {
    slug: "hoan006",
    parent: "hoan002",
    children: [],
    totalPersonalBet: 0,
    currentPersonalBet: 0,
    totalSystemBet: 0,
    currentSystemBet: 0,
    _lastCalculatedWeek: 0,
    _userLayer: 2,
  },
  {
    slug: "hoan007",
    parent: "hoan005",
    children: [],
    totalPersonalBet: 0,
    currentPersonalBet: 0,
    totalSystemBet: 0,
    currentSystemBet: 0,
    _lastCalculatedWeek: 0,
    _userLayer: 3,
  },
  {
    slug: "hoan008",
    parent: null,
    children: [],
    totalPersonalBet: 0,
    currentPersonalBet: 0,
    totalSystemBet: 0,
    currentSystemBet: 0,
    _lastCalculatedWeek: 0,
    _userLayer: 0,
  },
];

let FakeBetData: BetData[] = [
  {
    slug: "hoan001",
    amount: 100,
  },
  {
    slug: "hoan002",
    amount: 100,
  },
  {
    slug: "hoan003",
    amount: 100,
  },
  {
    slug: "hoan004",
    amount: 100,
  },
  {
    slug: "hoan005",
    amount: 100,
  },
  {
    slug: "hoan006",
    amount: 100,
  },
  {
    slug: "hoan007",
    amount: 100,
  },
  {
    slug: "hoan008",
    amount: 100,
  },
];

let FakeSystemInfo: SystemInfo = {
  weekNo: 0,
  levelMax: 3,
};

const findUserExistBySlug = (slug: string) => {
  let foundUser;
  FakeUserData.forEach((value) => {
    if (value.slug === slug) foundUser = value;
  });
  return foundUser || null;
};
const findUsersByLayer = (layer: number) => {
  let foundUser: User[] = [];
  FakeUserData.forEach((value) => {
    if (value._userLayer === layer) foundUser.push(value);
  });
  return foundUser;
};
const updatePersonalBet = (slug: string, amount: number) => {
  FakeUserData.forEach((value, index) => {
    if (value.slug === slug) FakeUserData[index].currentPersonalBet += amount;
  });
};
const updateSystemBet = (slug: string, amount: number) => {
  FakeUserData.forEach((value, index) => {
    if (value.slug === slug) FakeUserData[index].currentSystemBet += amount;
  });
};
const addNewUser = (slug: string, parent: string) => {
  const parentData = findUserExistBySlug(parent) as User | null;
  if (findUserExistBySlug(slug)) throw new Error(`${slug} exist`);
  const newUser: User = {
    slug,
    parent,
    children: [],
    totalPersonalBet: 0,
    currentPersonalBet: 0,
    totalSystemBet: 0,
    currentSystemBet: 0,
    _lastCalculatedWeek: 0,
    _userLayer: parentData ? parentData._userLayer + 1 : 0,
  };
  FakeUserData.push(newUser);
  if (newUser._userLayer > FakeSystemInfo.levelMax)
    FakeSystemInfo.levelMax = newUser._userLayer;
  console.log({ newUser });
};
const addNewBet = (slug: string, amount: number) => {
  const userData = findUserExistBySlug(slug) as User | null;
  if (!userData) throw new Error(`${slug} not found`);
  const newBet: BetData = {
    amount,
    slug,
  };
  FakeBetData.push(newBet);
};

const CronJobUpdatePersonalBet = () => {
  FakeBetData.forEach((bet) => {
    const { amount, slug } = bet;
    updatePersonalBet(slug, amount);
  });
};

const CronJobUpdateSystemBet = () => {
  for (let index = FakeSystemInfo.levelMax; index > -1; index--) {
    let allLayerUserData = findUsersByLayer(index);
    allLayerUserData.forEach((value) => {
      updateSystemBet(value.slug, value.currentPersonalBet);
      if (value.parent) updateSystemBet(value.parent, value.currentSystemBet);
    });
  }
  console.log({ FakeUserData });
};

export {
  findUserExistBySlug,
  addNewUser,
  addNewBet,
  FakeBetData,
  FakeUserData,
  FakeSystemInfo,
  CronJobUpdatePersonalBet,
  CronJobUpdateSystemBet
};
