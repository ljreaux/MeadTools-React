import {
  SelectValue,
  SelectTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./select";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div>
      <Select
        value={i18n.resolvedLanguage}
        onValueChange={(val) => {
          i18n.changeLanguage(val);
        }}
      >
        <SelectTrigger className="lg:w-[180px] w-full">
          <SelectValue placeholder="EN" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="en">EN</SelectItem>
            <SelectItem value="de">DE</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LanguageSwitcher;
