import {
    LegacyCard,
    RadioButton,
    LegacyStack,
    TextField,
    Banner,
    Text,
    Thumbnail,
    Autocomplete,
    Icon,
    Tag,
    SkeletonBodyText,
} from "@shopify/polaris";
import { SearchMinor, CirclePlusMinor, ImageMajor } from '@shopify/polaris-icons';
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { RuleFormCxt } from "../../contexts/RuleFormContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { useAppQuery } from "../../hooks";

const ALL = 'ALL';
const PRODUCTS = 'PRODUCTS';
const COLLECTIONS = 'COLLECTIONS';
const TAGS = 'TAGS';

const Options = {
    [ALL]: '0',
    [PRODUCTS]: '1',
    [COLLECTIONS]: '2',
    [TAGS]: '3',
}

const ConditionOption = ({ cKey, value, option, onChange }) => {
    const { t } = useTranslation();

    return (
        <RadioButton
            key={cKey}
            label={t(`RuleForm.condition.${option.toLowerCase()}`)}
            checked={'' + value === Options[option]}
            id={option}
            name={option.toLowerCase()}
            onChange={(_, val) => onChange({ condition_type: parseInt(Options[val]) })}
        />
    )
}

ConditionOption.propTypes = {
    cKey: PropTypes.string,
    value: PropTypes.number,
    option: PropTypes.string,
    onChange: PropTypes.func
}

const AllProducts = ({ value, onChange }) => {
    return (
        <ConditionOption
            key={`option_condition__all`}
            cKey={`option_condition__all`}
            value={value}
            option={ALL}
            onChange={onChange}
        />
    )
}

const SpecificProducts = ({ value, onChange, selected, error }) => {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    return (
        <>
            <ConditionOption
                key={`option_condition__products`}
                cKey={`option_condition__products`}
                value={value}
                option={PRODUCTS}
                onChange={onChange}
            />
            {
                '' + value === Options[PRODUCTS]
                    ? <TextField
                        onFocus={() => setOpen(true)}
                        placeholder={t("RuleForm.condition.search.products")}
                        autoComplete="off"
                        error={error}
                    />
                    : null
            }
            {
                ('' + value === Options[PRODUCTS] && selected && selected.length)
                    ? <LegacyStack vertical>
                        <div></div>
                        {selected.map((product) => (
                            <Banner
                                key={product.handle}
                                hideIcon
                                onDismiss={() => {
                                    const index = selected.findIndex(item => item.id === product.id);
                                    if (index > -1) {
                                        selected.splice(index, 1);
                                        onChange({ condition_products: [...selected] })
                                    }
                                }}
                            >
                                <LegacyStack vertical={false}>
                                    <Thumbnail
                                        source={
                                            (product.images && product.images.length) 
                                            ? (product.images[0].originalSrc || product.images[0].url) 
                                            : ImageMajor}
                                        alt={product.handle}
                                    />
                                    <Text variant="bodyLg" as="p" alignment="start">
                                        {product.title}
                                    </Text>
                                </LegacyStack>
                            </Banner>
                        ))}
                    </LegacyStack>
                    : null
            }
            <ResourcePicker
                resourceType="Product"
                showVariants={false}
                actionVerb={"select"}
                open={open}
                initialSelectionIds={selected}
                onSelection={(ids) => { onChange({ condition_products: ids.selection }); setOpen(false) }}
                onCancel={() => setOpen(false)}
            />
        </>
    )
}

const SpecificCollections = ({ value, onChange, selected, error }) => {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    return (
        <>
            <ConditionOption
                key={`option_condition__collections`}
                cKey={`option_condition__collections`}
                value={value}
                option={COLLECTIONS}
                onChange={onChange}
            />
            {
                '' + value === Options[COLLECTIONS]
                    ? <TextField
                        onFocus={() => setOpen(true)}
                        placeholder={t("RuleForm.condition.search.collections")}
                        autoComplete="off"
                        error={error}
                    />
                    : null
            }
            {
                ('' + value === Options[COLLECTIONS] && selected && selected.length)
                    ? <LegacyStack vertical>
                        <div></div>
                        {selected.map((collection) => (
                            <Banner
                                key={collection.handle}
                                hideIcon
                                onDismiss={() => {
                                    const index = selected.findIndex(item => item.id === collection.id);
                                    if (index > -1) {
                                        selected.splice(index, 1);
                                        onChange({ condition_collections: [...selected] })
                                    }
                                }}
                            >
                                <LegacyStack vertical={false}>
                                    <Thumbnail
                                        source={
                                            (collection.image && (collection.image.url || collection.image.originalSrc))
                                                ? (collection.image.url || collection.image.originalSrc)
                                                : ImageMajor
                                        }
                                        alt={collection.handle}
                                    />
                                    <Text variant="bodyLg" as="p" alignment="start">
                                        {collection.title}
                                    </Text>
                                </LegacyStack>
                            </Banner>
                        ))}
                    </LegacyStack>
                    : null
            }
            <ResourcePicker
                resourceType="Collection"
                actionVerb={"select"}
                open={open}
                initialSelectionIds={selected}
                onSelection={(ids) => { onChange({ condition_collections: ids.selection }); setOpen(false) }}
                onCancel={() => setOpen(false)}
            />
        </>
    )
}

const SpecificTags = ({ value, onChange, selected, deselectedOptions, setDeselectedOptions }) => {
    const { t } = useTranslation();

    const [inputValue, setInputValue] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [options, setOptions] = useState(deselectedOptions);
    const [loading, setLoading] = useState(false);

    const updateText = useCallback(
        (value) => {
            setInputValue(value);

            if (!loading) {
                setLoading(true);
            }

            setTimeout(() => {
                if (value === '') {
                    setOptions(deselectedOptions);
                    setLoading(false);
                    return;
                }
                const filterRegex = new RegExp(value.trim(), 'i');
                const resultOptions = options.filter((option) =>
                    option.label.match(filterRegex),
                );
                setDisabled(!value.trim() || resultOptions.filter(option => option.value.toLowerCase() === value.trim().toLowerCase()).length > 0)
                setOptions(resultOptions);
                setLoading(false);
            }, 300);
        },
        [deselectedOptions, loading, options],
    );

    const updateSelection = useCallback(
        (value) => {
            onChange({ condition_tags: value });
        },
        [options],
    );

    const textField = (
        <Autocomplete.TextField
            onChange={updateText}
            value={inputValue}
            prefix={<Icon source={SearchMinor} />}
            placeholder={t("RuleForm.condition.search.tags")}
            autoComplete="off"
        />
    )

    return (
        <>
            <ConditionOption
                key={`option_condition__tags`}
                cKey={`option_condition__tags`}
                value={value}
                option={TAGS}
                onChange={onChange}
            />
            {
                ('' + value === Options[TAGS])
                    ? <Autocomplete
                        actionBefore={{
                            accessibilityLabel: 'Action label',
                            badge: {
                                status: 'new',
                                content: 'New!',
                            },
                            content: `Add ${inputValue}`,
                            icon: CirclePlusMinor,
                            wrapOverflow: true,
                            disabled: disabled,
                            onAction: () => {
                                setOptions(prev => [...prev, { label: inputValue, value: inputValue.toLowerCase() }]);
                                setDeselectedOptions(prev => [...prev, { label: inputValue, value: inputValue.toLowerCase() }]);
                                onChange({ condition_tags: [...selected, inputValue] });
                                setDisabled(true);
                            },
                        }}
                        allowMultiple
                        options={options}
                        selected={selected}
                        onSelect={updateSelection}
                        listTitle="Suggested tags"
                        loading={loading}
                        textField={textField}
                    />
                    : null
            }
            {
                ('' + value === Options[TAGS] && selected && selected.length)
                    ? (
                        <LegacyStack vertical>
                            <div></div>
                            <LegacyStack vertical={false}>
                                {selected.map((tag) => (
                                    <Tag key={tag} onRemove={() => {
                                        const newArr = selected.filter(item => item !== tag);
                                        onChange({ condition_tags: [...newArr] })
                                    }}>{tag}</Tag>
                                ))}
                            </LegacyStack>
                        </LegacyStack>
                    )
                    : null
            }
        </>
    )
}

export default function RuleFormCondition() {
    const { t } = useTranslation();
    const { rule, setStates } = useContext(RuleFormCxt);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState({
        products: true,
        collections: true,
        tags: true,
    });

    const {
        data: productTags,
        isLoading: fetchingTags
    } = useAppQuery({
        url: "/api/shop/product-tags",
        reactQueryOptions: {
            onSuccess: () => { },
        },
    });

    useEffect(() => {
        if (productTags) {
            if (productTags?.payload?.body?.data?.shop?.productTags?.edges) {
                setTags(productTags?.payload?.body?.data?.shop?.productTags?.edges.map(tag => ({
                    label: tag.node,
                    value: tag.node
                })));
            }
            setLoading(prev => ({ ...prev, tags: false }));
        }
    }, [productTags]);

    const {
        data: products,
        isLoading: fetchingProducts
    } = useAppQuery({
        url: `/api/products?ids=${rule.condition_products.map(item => item.id).join(",")}`,
        reactQueryOptions: {
            onSuccess: () => { },
        },
    });

    useEffect(() => {
        if (products) {
            if (products?.payload?.body?.data?.nodes) {
                setStates({
                    condition_products: products?.payload?.body?.data?.nodes.map(node => {
                        const {
                            images,
                            hasOnlyDefaultVariant: _hasOnlyDefaultVariant,
                            priceRangeV2: _priceRangeV2,
                            ...product
                        } = node;
                        product.images = images?.edges?.map(image => image.node);
                        return product;
                    })
                })
            }
            setLoading(prev => ({ ...prev, products: false }));
        }
    }, [products]);

    const {
        data: collections,
        isLoading: fetchingCollections
    } = useAppQuery({
        url: `/api/collections?ids=${rule.condition_collections.map(item => item.id).join(",")}`,
        reactQueryOptions: {
            onSuccess: () => { },
        },
    });

    useEffect(() => {
        if (collections) {
            if (collections?.payload?.body?.data?.nodes) {
                setStates({ condition_collections: collections?.payload?.body?.data?.nodes });
            }
            setLoading(prev => ({ ...prev, collections: false }));
        }
    }, [collections]);

    return (
        <LegacyCard title={t("RuleForm.condition.card_title")} sectioned>
            <LegacyStack vertical>
                <AllProducts
                    value={rule.condition_type}
                    onChange={setStates}
                />
                {
                    (fetchingProducts || loading.products) ? (
                        <SkeletonBodyText lines={1} />
                    ) : (
                        <SpecificProducts
                            value={rule.condition_type}
                            onChange={setStates}
                            selected={rule.condition_products}
                            error={rule.errors.condition_products}
                        />
                    )
                }
                {
                    (fetchingCollections || loading.collections) ? (
                        <SkeletonBodyText lines={1} />
                    ) : (
                        <SpecificCollections
                            value={rule.condition_type}
                            onChange={setStates}
                            selected={rule.condition_collections}
                            error={rule.errors.condition_collections}
                        />
                    )
                }
                {
                    (fetchingTags || loading.tags) ? (
                        <SkeletonBodyText lines={1} />
                    ) : (
                        <SpecificTags
                            value={rule.condition_type}
                            onChange={setStates}
                            selected={rule.condition_tags}
                            deselectedOptions={tags}
                            setDeselectedOptions={setTags}
                        />
                    )
                }
            </LegacyStack>
        </LegacyCard>
    )
}
