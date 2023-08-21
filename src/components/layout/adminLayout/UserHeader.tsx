import { useEffect, useState } from 'react';
import {NavLink} from "react-router-dom"
import { useContext } from 'react';
import { SideBar, SidebarContext } from './sidebar/sidebarContext';
import "../../styles/admin.scss";
import { navigationLinks } from './sidebar/data';
import { personsImgs } from '../../../utils/images';
interface Navigation {
  id: number; title: string, image: string;
}

const Sidebar = () => {
  const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext<SideBar>(SidebarContext);

  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  return (
    <div className={ `sidebar ${sidebarClass}` }>
      <div className="user-info">
          <div className="info-img img-fit-cover">
              <img src={ personsImgs.person_two } alt="profile image" />
          </div>
          <span className="info-name">alice-doe</span>
      </div>

      <nav className="navigation">
          <ul className="nav-list">
            {
              navigationLinks.map((navigationLink: Navigation) => (
                <li className="nav-item" key = { navigationLink.id }>
                  <NavLink to="" className={ `nav-link ${ navigationLink.id === activeLinkIdx ? 'active' : null }` }>
                      <img src={ navigationLink.image } className="nav-link-icon" alt = { navigationLink.title } />
                      <span className="nav-link-text">{ navigationLink.title }</span>
                  </NavLink>
                </li>
              ))
            }
          </ul>
      </nav>
    </div>
  )
}

export default Sidebar
