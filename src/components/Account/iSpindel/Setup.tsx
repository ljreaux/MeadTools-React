import { API_URL } from "@/main";
import TokenGen from "./RegisterDevice";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Input } from "@/components/ui/input";

import { FaCircleCheck, FaRegClipboard } from "react-icons/fa6";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

function Setup() {
  const [displayUrl] = API_URL.split("/api");

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h2 className="my-4 text-2xl">Setup iSpindel</h2>
      <TokenGen />
      <p>
        The above token is used along with the iSpindel Name to identify your
        devices and link them to your account. Please make sure that you have a
        different iSpindel Name for each of your devices to avoid overlap when
        logging data.
      </p>
      <UrlCopyButton
        buttonDetails={{ url: displayUrl, buttonText: "Server Address" }}
      />
      <UrlCopyButton
        buttonDetails={{ url: "/api/ispindel", buttonText: "Path / URI" }}
      />
      <p>Service Type: HTTPS Post</p>
    </div>
  );
}

export default Setup;

const UrlCopyButton = ({
  buttonDetails,
}: {
  buttonDetails: { url: string; buttonText: string };
}) => {
  const handleClick = async () => {
    navigator.clipboard.writeText(buttonDetails.url);
    toast({
      description: (
        <div className="flex items-center justify-center gap-2">
          <FaCircleCheck className="text-xl text-green-500" />
          Text successfully copied to clipboard.
        </div>
      ),
    });
  };
  return (
    <div className="flex gap-0 flex-nowrap max-w-[500px] w-full">
      <LoadingButton disabled className="rounded-r-none" variant={"secondary"}>
        {buttonDetails.buttonText}
      </LoadingButton>
      <Input
        readOnly
        disabled
        value={buttonDetails.url}
        placeholder="Please Generate Token"
        className="text-center border-collapse rounded-none border-x-0"
      />
      <Button
        value={"copy to clipboard"}
        className="rounded-l-none"
        onClick={handleClick}
      >
        <FaRegClipboard />
      </Button>
    </div>
  );
};
