import {
    LegacyCard,
    FormLayout,
    TextField,
    Select,
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { RuleFormCxt } from "../../contexts/RuleFormContext";
import { useContext } from "react";

export default function RuleFormInformation() {
    const { t } = useTranslation();
    const { rule, setStates } = useContext(RuleFormCxt);

    const options = [
        { label: t("RuleForm.information.form_status_options.enable"), value: '0' },
        { label: t("RuleForm.information.form_status_options.disable"), value: '1' },
    ];

    return (
        <LegacyCard title={t("RuleForm.information.card_title")} sectioned>
            <FormLayout>
                <TextField label={t("RuleForm.information.form_name")} value={rule.name} onChange={(value) => setStates({ name: value })} placeholder={t("RuleForm.information.form_name")} autoComplete="off" />
                <TextField 
                    label={t("RuleForm.information.form_priority")}
                    helpText={t("RuleForm.information.form_priority_helpText")}
                    value={'' + rule.priority} 
                    onChange={(value) => setStates({ priority: parseInt(value) })} 
                    placeholder={t("RuleForm.information.form_priority")} 
                    type="number"
                    min={0}
                    max={99}
                    step={1}
                    autoComplete="off" 
                />
                <Select label={t("RuleForm.information.form_status")} value={'' + rule.status} options={options} onChange={(value) => setStates({ status: parseInt(value) })} />
            </FormLayout>
        </LegacyCard>
    )
}
