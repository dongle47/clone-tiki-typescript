import * as React from "react";
import { useLocation } from "react-router-dom";

export interface IScrollToTopProps {}

export default function ScrollToTop(props: IScrollToTopProps) {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <></>;
}
