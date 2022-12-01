import "./Sidebar.css";
import { Link } from "react-router-dom";
import dumpsterFireLogo from "../../images/dumpsterfire.png";
import {
  Home,
  Edit,
  Photo,
  ListAlt,
  Message,
  ShoppingBag,
  Group,
  Settings,
  Build,
} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const tabs = [
  { title: "Dashboard", Icon: Home, path: "Dashboard" },
  { title: "Backing", Icon: Edit, path: "Backing" },
  { title: "Kanban Board", Icon: Photo, path: "Kanban" },
  { title: "Reports", Icon: ListAlt, path: "Reports" },
  { title: "Issues Log", Icon: Message, path: "Issues" },
  { title: "RoadMap", Icon: DashboardIcon, path: "Road" },
  { title: "Active Sprints", Icon: ShoppingBag, path: "Active" },
  { title: "Project Settings", Icon: Group, path: "Project" },
  { title: "User Settings", Icon: Settings, path: "User" },
  { title: "Tools", Icon: Build, path: "Tools" },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img
        className="dashboard-logo"
        src={dumpsterFireLogo}
        alt="Dumpster Fire Logo"
      />
      {tabs.map(({ title, Icon, path }) => (
        <Link to={path} className="tab-link">
          <Icon />
          <p>{title}</p>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
