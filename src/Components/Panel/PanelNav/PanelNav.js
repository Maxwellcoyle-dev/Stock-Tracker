import React, { useState, useEffect } from "react";
import styles from "../PanelStyles.module.css";
import { CgProfile } from "react-icons/cg";
import { BiListOl, BiNews } from "react-icons/bi";

export const PanelNav = (props) => {
  return (
    <div className={styles.panelNav}>
      <a
        className={
          props.panelTab === "stock-data" ? styles.selectedTab : styles.tab
        }
        onClick={() => props.setPanelTab("stock-data")}
      >
        <CgProfile className={styles.tabIcon} />
        <span className={styles.tooltipText}>Overview</span>
      </a>
      <a
        className={
          props.panelTab === "favorites" ? styles.selectedTab : styles.tab
        }
        onClick={() => props.setPanelTab("favorites")}
      >
        <BiListOl className={styles.tabIcon} />
        <span className={styles.tooltipText}>Watch List</span>
      </a>
      <a
        className={
          props.panelTab === "stock-news" ? styles.selectedTab : styles.tab
        }
        onClick={() => props.setPanelTab("stock-news")}
      >
        <BiNews className={styles.tabIcon} />
        <span className={styles.tooltipText}>News</span>
      </a>
    </div>
  );
};
