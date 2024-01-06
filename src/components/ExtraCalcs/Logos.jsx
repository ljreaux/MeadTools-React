import { NavLink } from "react-router-dom";
function Logos({ logo, link, calc }) {
  return (
    <div className="flex items-center group">
      <div className="navlogo inline-block bg-background rounded-full hover:text-background hover:bg-textColor transition-colors">
        <NavLink to={link}>{logo}</NavLink>
      </div>
      <span className="sm:inline-block  sm:whitespace-nowrap sm:min-w-fit sm:mx-2 sm:px-4 sm:py-2 sm:text-sm sm:bg-sidebar sm:border-s-textColor sm:border-2  sm:opacity-0  sm:rounded-lg sm:group-hover:opacity-100 sm:transition-opacity hidden">
        {calc}
      </span>
    </div>
  );
}

export default Logos;
