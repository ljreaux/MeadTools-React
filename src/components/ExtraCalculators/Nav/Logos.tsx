import { Link } from "react-router-dom";

function Logos({
  logo,
  link,
  calc,
}: {
  logo: JSX.Element;
  link: string;
  calc: string;
}) {
  return (
    <div className="flex items-center  justify-center group">
      <div className="flex justify-center items-center bg-background rounded-full hover:text-background hover:bg-textColor transition-colors mx-[.25rem] sm:mx-0 relative my-[.25rem]">
        <Link to={link}>{logo}</Link>
      </div>
      <span
        className="sm:whitespace-nowrap sm:min-w-fit sm:mx-2 sm:px-4 sm:py-2 
      sm:text-sm sm:bg-sidebar sm:border-s-textColor sm:border-2  sm:rounded-lg 
      sm:group-hover:inline-block  sm:transition-opacity hidden absolute left-[3rem]"
      >
        {calc}
      </span>
    </div>
  );
}

export default Logos;
