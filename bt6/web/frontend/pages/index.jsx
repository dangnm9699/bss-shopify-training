import {
  Page,
  Layout,
  LegacyCard,
} from "@shopify/polaris";
import { TitleBar, useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { GlobalCtx } from "../contexts/GlobalContext";
import { useContext } from "react";

export default function HomePage() {
  const app = useAppBridge();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { shop } = useContext(GlobalCtx);

  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout sectioned>
        <LegacyCard title="Home" sectioned primaryFooterAction={{
          content: 'Go to rules',
          onAction: () => navigate('/rules')
        }}>
          <LegacyCard.Section>
            {t("HomePage.welcome")}
          </LegacyCard.Section>
        </LegacyCard>
        <LegacyCard title="Add app-metafields" sectioned primaryFooterAction={{
          content: 'Create app metafields',
          onAction: () => {
            const count = parseInt(localStorage.getItem("fetchCount") || "0") + 1;
            getSessionToken(app).then(token => {
              console.log(token);
              console.log(shop)
              return token;
            })
            .then(token => fetch(`/api/shop/metafields`, {
              method: `POST`,
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': `application/json`
              },
              body: JSON.stringify({
                count,
                appInstallationId: shop.currentAppInstallation.id
              })
            })).then(res => res.json()).then((data) => console.log(data)).catch(err => console.error(err))
            .finally(() => {
              localStorage.setItem("fetchCount", count);
            });
          }
        }}>
          <LegacyCard.Section>
            {t("HomePage.welcome")}
          </LegacyCard.Section>
        </LegacyCard>
      </Layout>
    </Page>
  );
}
