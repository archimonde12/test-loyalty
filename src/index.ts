import {
    addNewBet,
  addNewUser,
  CronJobUpdatePersonalBet,
  CronJobUpdateSystemBet,
  FakeSystemInfo,
  FakeUserData,
  findUserExistBySlug,
} from "./fakeData";

const start = () => {
  addNewUser("hoan009", "hoan007");
  addNewBet("hoan009",200)
  addNewUser("hoan010", "hoan009");
  addNewBet("hoan010",100)
  addNewUser("hoan011", "");
  addNewBet("hoan010",500)
  addNewBet("hoan011",500)
  CronJobUpdatePersonalBet();
  CronJobUpdateSystemBet();
};

start();
