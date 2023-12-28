import { Link } from "react-router-dom";
function Logos({ logo, link, calc }) {
  return (
    <div className="group flex items-center">
      <div className="bg-background rounded-full hover:text-background hover:bg-textColor hover:scale-105 transition-colors inline-block mx-1">
        <Link to={link}>{logo}</Link>
      </div>
      <span className="inline-block  whitespace-nowrap min-w-fit mx-2 px-4 py-2 text-sm bg-sidebar border-s-textColor border-2  opacity-0  rounded-lg group-hover:opacity-100 transition-opacity">
        {calc}
      </span>
    </div>
  );
}

export default Logos;
