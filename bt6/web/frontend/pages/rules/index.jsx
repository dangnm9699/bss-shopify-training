import {
  Page,
  Layout,
  LegacyCard,
  useIndexResourceState,
  IndexTable,
  Badge,
  Button,
  ButtonGroup,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Rules() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [rules, setRules] = useState(localStorage.getItem('rules') ? JSON.parse(localStorage.getItem('rules')) : []);

  const resourceName = {
    singular: 'rule',
    plural: 'rules',
  };
  
  const statusText = {
    0: t("RuleForm.information.form_status_options.disable"),
    1: t("RuleForm.information.form_status_options.enable")
  }

  const statusColor = {
    0: null,
    1: 'success'
  }

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(rules);

  const rowMarkup = rules.map(
    (
      { id, name, priority, status },
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>{name}</IndexTable.Cell>
        <IndexTable.Cell>{priority}</IndexTable.Cell>
        <IndexTable.Cell>
          <Badge status={statusColor[status]}>
            {statusText[status]}
          </Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <ButtonGroup>
            <Button primary onClick={() => navigate(`/rules/${id}`)}>
              {t("Rules.edit")}
            </Button>
            <Button destructive onClick={() => {
              const newRules = rules.filter(item => item.id !== id);
              setRules(newRules);
              localStorage.setItem('rules', JSON.stringify(newRules));
            }}>
              {t("Rules.delete")}
            </Button>
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Page narrowWidth>
      <TitleBar title={t("Rules.title")} primaryAction={{
        content: 'Create new rule',
        onAction: () => navigate("/rules/add")
      }} breadcrumbs={{
        content: 'Home',
        url: '/'
      }} />
      <Layout sectioned>
        <LegacyCard sectioned>
          <IndexTable
            selectable={false}
            resourceName={resourceName}
            itemCount={rules.length}
            selectedItemsCount={
              allResourcesSelected ? 'All' : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Name' },
              { title: 'Priority' },
              { title: 'Status' },
              { title: 'Actions' },
            ]}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      </Layout>
    </Page>
  );
}
