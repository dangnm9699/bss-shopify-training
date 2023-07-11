import {
  Page,
  Layout,
  LegacyCard,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { RuleFormCxt, RuleFormCxtProvider } from "../../contexts/RuleFormContext";
import RuleFormInformation from "../../components/RuleForm/Information";
import RuleFormCondition from "../../components/RuleForm/Condition";
import RuleFormChange from "../../components/RuleForm/Change";
import { useContext, useEffect, useRef } from "react";

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
  const { rule, setStates } = useContext(RuleFormCxt);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const rules = localStorage.getItem('rules') ? JSON.parse(localStorage.getItem('rules')) : [];
    const id = params.id;
    if (id !== "add") {
      if (!rules.length) {
        navigate('/rules');
      } else {
        const rule = rules.filter(rule => '' + rule.id === id)[0];
        setStates(rule);
      }
    }
  }, [params]);

  const ref = useRef(rule);

  const isError = !!(rule.errors.name || rule.errors.priority || rule.errors.change_value);

  return (
    <>
      <TitleBar title={params.id === 'add' ? t("RuleForm.title_create") : t("RuleForm.title_edit", { id: params.id })} primaryAction={{
        content: params.id === 'add' ? 'Create' : 'Update',
        disabled: isError,
        onAction: () => {
          const errors = {
            name: null,
            priority: null,
            change_value: null,
          }
          if (!rule.name) {
            errors.name = 'This field is required';
          }
          if (rule.priority > 99 || rule.priority < 0) {
            errors.priority = 'Invalid value';
          }
          if (rule.change_value < 0 || (rule.change_type === 3 && rule.change_value > 100)) {
            errors.change_value = 'Invalid value';
          }
          if (errors.name || errors.priority || errors.change_value) {
            setStates({ errors });
          } else {
            const rules = localStorage.getItem('rules') ? JSON.parse(localStorage.getItem('rules')) : [];
            const { errors: _, ...newRule } = rule;
            if (newRule.condition_type === 1) {
              newRule.condition_collections = [];
              newRule.condition_products = newRule.condition_products.map(item => item.id);
              newRule.condition_tags = [];
            } else if (newRule.condition_type === 2) {
              newRule.condition_collections = newRule.condition_collections.map(item => item.id);
              newRule.condition_products = [];
              newRule.condition_tags = [];
            } else if (newRule.condition_type === 3) {
              newRule.condition_collections = [];
              newRule.condition_products = [];
              newRule.condition_tags = [];
            } else {
              newRule.condition_collections = [];
              newRule.condition_products = [];
              newRule.condition_tags = [];
            }
            if (newRule.id) {
              // Update
              const index = rules.findIndex(rule => rule.id === newRule.id);
              rules[index] = rule;
            } else {
              // Create
              newRule.id = Date.now();
              rules.push(newRule);
            }
            localStorage.setItem('rules', JSON.stringify(rules));
            navigate('/rules');
          }
        },
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
