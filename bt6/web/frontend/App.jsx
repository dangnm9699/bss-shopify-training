import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { GlobalCtx, GlobalCtxProvider } from "./contexts/GlobalContext";
import { useAppQuery } from "./hooks";
import { useContext, useEffect } from "react";

export default function App() {
  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <GlobalCtxProvider>
              <Content />
            </GlobalCtxProvider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}

function Content() {
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();
  const { setStates } = useContext(GlobalCtx);

  const {
    data
  } = useAppQuery({
    url: "/api/shop",
    reactQueryOptions: {
      onSuccess: () => {
        console.log("done");
      },
    },
  });

  useEffect(() => {
    if (data?.payload?.body?.data?.shop) {
      setStates(data.payload.body.data.shop);
    }
  }, [data]);

  return (
    <>
      <NavigationMenu
        navigationLinks={[
          {
            label: t("NavigationMenu.rules"),
            destination: "/rules",
          },
        ]}
      />
      <Routes pages={pages} /></>
  )
}
