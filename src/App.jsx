import React, { useState, useEffect } from "react";
// https://pushjs.org/docs/introduction
import Push from "push.js";
import permitScreenshot from "./resources/permit.jpg";

const notifications = [
  {
    id: 1,
    title: "Notification 1",
    body: "Notification body",
  },
  {
    id: 2,
    title: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dicta ducimus maxime eligendi eaque voluptatibus laborum eos nemo dolorem reiciendis aperiam ut cumque possimus optio, officiis dignissimos neque ipsam animi!`,
    body: "Notification body",
    icon: "https://robohash.org/goper",
  },
  {
    id: 3,
    title: "Notification 3",
    body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dicta ducimus maxime eligendi eaque voluptatibus laborum eos nemo dolorem reiciendis aperiam ut cumque possimus optio, officiis dignissimos neque ipsam animi!`,
    icon: "https://robohash.org/steel",
  },
  {
    id: 4,
    title: "Notification 4",
    body: "Notification body 🔥🔥🔥",
    icon: "https://robohash.org/gold",
  },
  {
    id: 5,
    title: "⚠️ Warning!",
    body: "Notification body",
    icon: "https://robohash.org/dark",
  },
];

const sendNotication = (count) => {
  const { title = "", body = "", icon = "" } = notifications[count];

  Push.create(title, {
    body,
    timeout: 6000,
    icon,
    onClick: function () {
      window.focus();
      this.close();
    },
  });
};

const ButtonSector = () => {
  const [count, setCount] = useState(0);

  const timer = () => {
    const newCount = count - 1;
    sendNotication(newCount);
    setCount(newCount);
  };

  useEffect(() => {
    if (count <= 0) {
      return;
    }
    const id = setInterval(timer, 2000);
    return () => clearInterval(id);
  }, [count]);

  const handleClick = () => {
    setCount(notifications.length);
  };

  return (
    <main>
      <button onClick={handleClick} disabled={count !== 0}>
        Start Notifications {count ? `: ${count}` : ""}
      </button>
    </main>
  );
};

const NoPermissions = () => {
  return (
    <div>
      Please allow notifications <br /> <br />
      <img src={permitScreenshot} alt="" style={{ display: "block" }} />
    </div>
  );
};

function App() {
  const ifHasPermission = Push.Permission.has();

  return (
    <div className="App">
      <header>
        <h1>Notifications test</h1>
      </header>
      {ifHasPermission ? <ButtonSector /> : <NoPermissions />}
    </div>
  );
}

export default App;
