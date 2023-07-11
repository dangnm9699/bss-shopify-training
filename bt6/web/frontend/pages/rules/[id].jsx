import {
  Page,
  Layout,
  LegacyCard,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { RuleFormCxt, RuleFormCxtProvider } from "../../contexts/RuleFormContext";
import RuleFormInformation from "../../components/RuleForm/Information";
import RuleFormCondition from "../../components/RuleForm/Condition";
import RuleFormChange from "../../components/RuleForm/Change";
import { useContext } from "react";

export default function RuleForm() {
  return (
    <Page fullWidth>
      <RuleFormCxtProvider>
        <Content />
      </RuleFormCxtProvider>
    </Page>
  );
}

function Content() {
  const { rule } = useContext(RuleFormCxt);
  const { t } = useTranslation();
  const params = useParams();

  return (
    <>
      <TitleBar title={params.id === 'add' ? t("RuleForm.title_create") : t("RuleForm.title_edit", { id: params.id })} primaryAction={{
        content: params.id === 'add' ? 'Create' : 'Update',
        onAction: () => console.log(rule)
      }} breadcrumbs={{
        content: 'Rules',
        url: '/rules'
      }} />
      <Layout>
        <Layout.Section>
          <RuleFormInformation />
          <RuleFormCondition />
          <RuleFormChange />
        </Layout.Section>
        <Layout.Section secondary>
          <LegacyCard title={"Preview"} sectioned actions={[
            {
              content: 'Click to preview',
              onAction: () => {
                console.log('Pressed')
              }
            }
          ]}>

          </LegacyCard>
        </Layout.Section>
      </Layout>
    </>
  )
}
