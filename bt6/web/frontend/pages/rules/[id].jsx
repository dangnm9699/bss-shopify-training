import {
    Page,
    Layout,
    LegacyCard,
  } from "@shopify/polaris";
  import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
  
  export default function RuleForm() {
    const { t } = useTranslation();
    const params = useParams();
    return (
      <Page narrowWidth>
        <TitleBar title={t("RuleForm.title")} primaryAction={{
            content: params.id === 'add' ? 'Create' : 'Update',
            onAction: () => console.log("OMG")
        }} />
        <Layout>
          <LegacyCard>
          </LegacyCard>
        </Layout>
      </Page>
    );
  }
  