import React, { useContext } from "react";
import classes from "./Participants.module.css";
import { StoreContext } from "../../Contexts/store";
import { useSelector } from "react-redux";

const Participants = () => {
  //const store = useContext(StoreContext);
  const participantView = useSelector((state) => state.participantView);

  const TEMP = [
    {
      id: "user_123",
      name: "A",
    },
    {
      id: "user_234",
      name: "B",
    },
  ];

  const Participants = TEMP.map((Participants) => {
    return (
      <li className={classes.Participant} key={Participants.id}>
        {Participants.name}
      </li>
    );
  });

  return (
    <ul
      className={
        participantView ? classes.ContainerShow : classes.ContainerHidden
      }
    >
      {Participants}
    </ul>
  );
};
//   return (
//     <ul
//       className={
//         store.participantView ? classes.ContainerShow : classes.ContainerHidden
//       }
//     >
//       {Participants}
//     </ul>
//   );
// };

export default Participants;
