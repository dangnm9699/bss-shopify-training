import {
  Page,
  Layout,
  LegacyCard,
  Icon,
  Tooltip,
  Text,
  LegacyStack,
  Spinner,
  DataTable
} from "@shopify/polaris";
import { CircleInformationMajor } from "@shopify/polaris-icons";
import { TitleBar, useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { RuleFormCxt, RuleFormCxtProvider } from "../../contexts/RuleFormContext";
import RuleFormInformation from "../../components/RuleForm/Information";
import RuleFormCondition from "../../components/RuleForm/Condition";
import RuleFormChange from "../../components/RuleForm/Change";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { getSessionToken } from "@shopify/app-bridge/utilities";

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
  const app = useAppBridge();

  const { rule, setStates, setErrors } = useContext(RuleFormCxt);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const [loadingPreview, setLoadingPreview] = useState("idle");
  const [collectionIdx, setCollectionIdx] = useState(-1);
  const [preview, setPreview] = useState([]);

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

  const isError = !!(rule.errors.name 
    || rule.errors.priority 
    || rule.errors.change_value 
    || rule.errors.condition_products 
    || rule.errors.condition_collections
  );

  const disablePreview = !!(rule.errors.condition_products || rule.errors.condition_collections);

  const errors = useMemo(() => {
    const errors = {
      name: null,
      priority: null,
      change_value: null,
      condition_collections: null,
      condition_products: null,
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
    if (rule.condition_type === 1 && !rule.condition_products?.length) {
      errors.condition_products = 'This field is required';
    }
    if (rule.condition_type === 2 && !rule.condition_collections?.length) {
      errors.condition_collections = 'This field is required';
    }
    return errors;
  }, [rule]);

  useEffect(() => {
    setCollectionIdx(-1);
    setErrors({ condition_collections: null });
  }, [rule.condition_collections]);

  useEffect(() => {
    setErrors({ condition_products: null });
  }, [rule.condition_products]);

  useEffect(() => {
    if (loadingPreview === "loading") {
      const searchParams = new URLSearchParams();
      searchParams.set("type", "product");
      if (rule.condition_type === 0) {
        searchParams.set("q", "");
      } else if (rule.condition_type === 1) {
        searchParams.set("q", `,query:"${rule.condition_products.map(item => `(id:${item.id.replace("gid://shopify/Product/", "")})`).join("OR")}"`);
      } else if (rule.condition_type === 2) {
        searchParams.set("type", "collection");
        searchParams.set("q", rule.condition_collections[collectionIdx].id);
      } else if (rule.condition_type === 3) {
        searchParams.set("q", `,query:"${rule.condition_tags.map(tag => `(tag:${tag})`).join("OR")}"`);
      }
      getSessionToken(app)
        .then(token => fetch(`/api/products/search?${searchParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }))
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            let existed = (
              data?.payload?.body?.data?.collection?.products?.edges &&
              collectionIdx > -1
            ) ? [...preview].map(item => item.id) : [];
            let raw = data?.payload?.body?.data?.collection?.products?.edges
              || data?.payload?.body?.data?.products?.edges
              || [];
            raw = raw.filter(item => existed.indexOf(item.node.id) === -1).map(item => {
              let node = item.node;
              let price = parseFloat(node.priceRangeV2.minVariantPrice.amount);
              let text = node.hasOnlyDefaultVariant ? '' : 'All variants ';
              if (rule.change_type === 0) {
                text += rule.change_value < price ? rule.change_value : price;
              } else if (rule.change_type === 1) {
                text += rule.change_value < price ? price - rule.change_value : 'FREE';
              } else if (rule.change_type === 2) {
                text += parseFloat((price - parseFloat((rule.change_value * price / 100).toFixed(2))).toFixed(2));
              }
              return {
                id: node.id,
                title: node.title,
                text
              };
            });
            setLoadingPreview("idle");
            if (rule.condition_type === 2 && collectionIdx > -1) {
              setPreview(prev => [...prev, ...raw]);
            } else {
              setPreview(raw);
            }
          }
        })
        .finally(() => setLoadingPreview("idle"));
    }
  }, [loadingPreview, rule, app, collectionIdx, preview]);

  return (
    <>
      <TitleBar title={params.id === 'add' ? t("RuleForm.title_create") : t("RuleForm.title_edit", { id: params.id })} primaryAction={{
        content: params.id === 'add' ? 'Create' : 'Update',
        disabled: isError,
        onAction: () => {
          if (errors.name || errors.priority || errors.change_value || errors.condition_products || errors.condition_collections) {
            setStates({ errors });
          } else {
            const rules = localStorage.getItem('rules') ? JSON.parse(localStorage.getItem('rules')) : [];
            const { errors: _, ...newRule } = rule;
            if (newRule.condition_type === 1) {
              newRule.condition_collections = [];
              newRule.condition_products = newRule.condition_products.map(item => ({ id: item.id }));
              newRule.condition_tags = [];
            } else if (newRule.condition_type === 2) {
              newRule.condition_collections = newRule.condition_collections.map(item => ({ id: item.id }));
              newRule.condition_products = [];
              newRule.condition_tags = [];
            } else if (newRule.condition_type === 3) {
              newRule.condition_collections = [];
              newRule.condition_products = [];
            } else {
              newRule.condition_collections = [];
              newRule.condition_products = [];
              newRule.condition_tags = [];
            }
            if (newRule.id) {
              // Update
              const index = rules.findIndex(rule => rule.id === newRule.id);
              rules[index] = newRule;
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
          <LegacyCard 
            title={<>
              <LegacyStack>
                <Tooltip content={"Sampling max 15 products"}>
                  <Icon source={CircleInformationMajor} />
                </Tooltip>
                <Text>Preview</Text>
              </LegacyStack>
            </>}
            sectioned 
            actions={[
              {
                content: 'Click to preview',
                onAction: () => {
                  if (rule.condition_type !== 2) {
                    setCollectionIdx(-1);
                  } else {
                    setCollectionIdx(0);
                  }
                  setLoadingPreview("loading");
                },
                disabled: 
                loadingPreview === "loading" 
                || (collectionIdx > -1 && collectionIdx+1 < rule.condition_collections.length && rule.condition_type === 2)
                || disablePreview,
              },
            ]}
            primaryFooterAction={
              (collectionIdx > -1 && collectionIdx+1 < rule.condition_collections.length && rule.condition_type === 2) ? {
                content: 'Load next collection',
                onAction: () => {
                  setCollectionIdx(prev => prev+1);
                  setLoadingPreview("loading");
                },
                disabled: loadingPreview === "loading"
              } : null
            }
          >
            {
              (loadingPreview === "loading") ? (
                <Spinner accessibilityLabel="preview__loading" size="large" />
              ) : (
                <DataTable
                  columnContentTypes={[
                    'text',
                    'numeric',
                  ]}
                  headings={[
                    'Product',
                    'Custom price',
                  ]}
                  rows={preview.map(item => ([
                    item.title,
                    item.text
                  ]))}
                />
              )
            }
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </>
  )
}
