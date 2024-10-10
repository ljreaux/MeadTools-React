import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { toast } from "@/components/ui/use-toast";
import { useiSpindelContext } from "@/hooks/useiSpindelContext";
import { FaRegClipboard } from "react-icons/fa";

import { FaCircleCheck } from "react-icons/fa6";

function TokenGen() {
  const { hydrometerToken, loading, getNewHydrometerToken } =
    useiSpindelContext();

  const handleClick = async () => {
    if (hydrometerToken) {
      navigator.clipboard.writeText(hydrometerToken);
      toast({
        description: (
          <div className="flex items-center justify-center gap-2">
            <FaCircleCheck className="text-xl text-green-500" />
            Token successfully copied to clipboard.
          </div>
        ),
      });
    }
  };

  return (
    <div className="flex gap-0 flex-nowrap max-w-[500px] w-full">
      <LoadingButton
        loading={loading}
        onClick={getNewHydrometerToken}
        className="rounded-r-none"
      >
        Generate Token
      </LoadingButton>
      <Input
        readOnly
        disabled
        value={hydrometerToken || ""}
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
}

export default TokenGen;
