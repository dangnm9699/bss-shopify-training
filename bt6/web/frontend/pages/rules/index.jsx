import {
    Page,
    Layout,
    LegacyCard,
  } from "@shopify/polaris";
  import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
  
  export default function Rules() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
      <Page narrowWidth>
        <TitleBar title={t("Rules.title")} primaryAction={{
            content: 'Create new rule',
            onAction: () => navigate("/rules/add")
        }} />
        <Layout>
          <LegacyCard>
          </LegacyCard>
        </Layout>
      </Page>
    );
  }
  