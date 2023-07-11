import {
  Page,
  Layout,
  LegacyCard,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      </Layout>
    </Page>
  );
}
