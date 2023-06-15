import { ReactNode } from "react";
import styles from "./icons.module.css";

interface Props {
  icon: ReactNode;
}

const CircledIcon = ({ icon }: Props) => {
  return <span className={styles.circle}>{icon}</span>;
};

export default CircledIcon;
