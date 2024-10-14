import { useEffect, useState } from "react";

const useDesktopDialog = () => {
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  const initialValue = isMobile() ? false : !!JSON.parse(localStorage.getItem("desktopDialogOpen") || "true")
  const [desktopDialogOpen, setDesktopDialogOpen] = useState(initialValue
  );
  useEffect(() => {
    localStorage.setItem("desktopDialogOpen", desktopDialogOpen.toString());
  }, [desktopDialogOpen]);
  return { open: desktopDialogOpen, setOpen: setDesktopDialogOpen };
}

export default useDesktopDialog;