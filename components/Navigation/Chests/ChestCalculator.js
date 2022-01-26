import { useState } from "react";
import styles from "./ChestCalculator.module.css";

import { AiOutlineLeft } from "react-icons/ai";
const Chests = {
  wood: {
    link: "https://bombcryptosimulator.com/img/chestWood.png",
    coin: 0.01425,
  },
  metal: {
    link: "https://bombcryptosimulator.com/img/chestMetal.png",
    coin: 0.0325,
  },
  gold: {
    link: "https://bombcryptosimulator.com/img/chestGold.png",
    coin: 0.1625,
  },
  crystal: {
    link: "https://bombcryptosimulator.com/img/chestCrystal.png",
    coin: 0.325,
  },
};

export function ChestCalculator() {
  const [value, setValue] = useState(0);

  const [wood, setWood] = useState(0);
  const [metal, setMetal] = useState(0);
  const [gold, setGold] = useState(0);
  const [crystal, setCrystal] = useState(0);
  const colapse = function () {
    const baus = document.querySelector(`.${styles.chest_container}`);
    const icons = document.querySelector(`.${styles.icons}`);
    baus.classList.toggle(`${styles.inactive}`);
    icons.classList.toggle(`${styles.inactive}`);
  };
  const clear = function () {
    setWood(0);
    setMetal(0);
    setGold(0);
    setCrystal(0);
  };
  return (
    <div className={styles.header_container}>
      <div className={styles.chest_container}>
        <div className={`${styles.wood} ${styles.chest}`}>
          <img src={Chests.wood.link} />
          <input
            type="text"
            onChange={(e) => setWood(Number(e.target.value))}
            value={wood}
          />
        </div>
        <div className={`${styles.metal} ${styles.chest}`}>
          <img src={Chests.metal.link} />
          <input
            type="text"
            onChange={(e) => setMetal(Number(e.target.value))}
            value={metal}
          />
        </div>
        <div className={`${styles.gold} ${styles.chest}`}>
          <img src={Chests.gold.link} />
          <input
            type="text"
            onChange={(e) => setGold(Number(e.target.value))}
            value={gold}
          />
        </div>
        <div className={`${styles.crystal} ${styles.chest}`}>
          <img src={Chests.crystal.link} />
          <input
            type="text"
            onChange={(e) => setCrystal(Number(e.target.value))}
            value={crystal}
          />
        </div>
        <div className={styles.result}>
          <span>
            {(
              wood * Chests.wood.coin +
              metal * Chests.metal.coin +
              gold * Chests.gold.coin +
              crystal * Chests.crystal.coin
            ).toFixed(2)} Bcoin
          </span>
        </div>
      </div>
      <div className={styles.icons}>
        <span onClick={clear}>Limpar</span>
        <span onClick={colapse}>Baús</span>
        <AiOutlineLeft onClick={colapse} />
      </div>
    </div>
  )
}