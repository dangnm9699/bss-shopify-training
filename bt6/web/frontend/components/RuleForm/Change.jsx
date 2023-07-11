import {
    LegacyCard,
    RadioButton,
    LegacyStack,
    TextField,
} from "@shopify/polaris";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { RuleFormCxt } from "../../contexts/RuleFormContext";
import { GlobalCtx } from "../../contexts/GlobalContext";

const NEW = 'NEW';
const DECREASE_FIXED = 'DECREASE_FIXED';
const DECREASE_PERCENTAGE = 'DECREASE_PERCENTAGE';

const options = {
    [NEW]: '0',
    [DECREASE_FIXED]: '1',
    [DECREASE_PERCENTAGE]: '2',
}

const valueTypes = {
    '0': 'amount',
    '1': 'amount',
    '2': 'percentage',
}

const ChangeOption = ({ cKey, value, option, onChange }) => {
    const { t } = useTranslation();

    return (
        <RadioButton
            key={cKey}
            label={t(`RuleForm.change.${option.toLowerCase()}`)}
            checked={'' + value === options[option]}
            id={option}
            name={option.toLowerCase()}
            onChange={(_, val) => onChange({ change_type: parseInt(options[val]) })}
        />
    )
}

ChangeOption.propTypes = {
    cKey: PropTypes.string,
    value: PropTypes.number,
    option: PropTypes.string,
    onChange: PropTypes.func
}

const ChangeField = ({ value, option, onChange }) => {
    const { shop } = useContext(GlobalCtx);
    console.log(shop);
    const { t } = useTranslation();
    const valueType = valueTypes[option];

    const field = <TextField
        label={t("RuleForm.change.amount_label")}
        value={value}
        suffix={valueType === "percentage" ? "%" : shop.currencyCode}
        onChange={(value) => onChange({ change_value: parseFloat(value || 0) })}
        min={0}
        max={valueType === "percentage" ? 100 : undefined}
        step={0.01}
        type="number"
        autoComplete="off"
    />

    return field
}

ChangeField.propTypes = {
    value: PropTypes.number,
    option: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
}

export default function RuleFormChange() {
    const { rule, setStates } = useContext(RuleFormCxt);
    const { t } = useTranslation();

    return (
        <LegacyCard title={t("RuleForm.change.card_title")} sectioned>
            <LegacyStack vertical>
                {[NEW, DECREASE_FIXED, DECREASE_PERCENTAGE].map((item, index) => (
                    <ChangeOption
                        key={`option_change__${index}`}
                        cKey={`option_change__${index}`}
                        value={rule.change_type}
                        option={item}
                        onChange={setStates}
                    />
                ))}
                <ChangeField
                    value={rule.change_value}
                    option={'' + rule.change_type}
                    onChange={setStates}
                />
            </LegacyStack>
        </LegacyCard>
    )
}
