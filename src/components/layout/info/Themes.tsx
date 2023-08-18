import { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import { BsMoon, BsSun } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { themes } from "../../../data";
import ThemeItem from "./ThemeItem";
import "./themes.scss";

const getStorageColor = () => {
    let color: string = 'hsl(252, 35%, 51%)'; // Initialize with a default color
    if (localStorage.getItem('color')) {
      color = localStorage.getItem('color')!;
    }
    return color;
  };

  const getStorageTheme = () => {
    let theme: string = 'light-theme'; // Initialize with a default theme
    if (localStorage.getItem('theme')) {
      theme = localStorage.getItem('theme')!;
    }
    return theme;
  };
  
  const Themes = () => {
    const [showSwitcher, setShowSwitcher] = useState(false);
    const [color, setColor] = useState<string>(getStorageColor()); // Specify string type
    const [theme, setTheme] = useState(getStorageTheme());
  
    const changeColor = (color: string) => {
      setColor(color);
    };
  
    const toggleTheme = () => {
      if (theme === 'light-theme') {
        setTheme('dark-theme');
      } else {
        setTheme('light-theme');
      }
    };
  
    useEffect(() => {
      document.documentElement.className = theme;
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    useEffect(() => {
      document.documentElement.style.setProperty('--first-color', color);
      localStorage.setItem('color', color);
    }, [color]);
  return (
    <div>
      <div
        className={`${showSwitcher ? "show-switcher" : ""} style__switcher`}
      >
        <div
          className="style__switcher-toggler"
          onClick={() => setShowSwitcher(!showSwitcher)}
        >
          <FaCog />
        </div>
        <div className="theme__toggler" onClick={toggleTheme}>
          {theme === 'light-theme' ? <BsMoon /> : <BsSun />}
        </div>
        <h3 className="style__switcher-title">Style switcher</h3>
        <div className="style__switcher-items">
          {themes.map((theme) => {
            return <ThemeItem key={theme.id} {...theme} changeColor={changeColor} />;
          })}
        </div>

        <div className="style__switcher-close" onClick={() => setShowSwitcher(!showSwitcher)}>
          <GrClose />
        </div>
      </div>
    </div>
  );
};

export default Themes;
