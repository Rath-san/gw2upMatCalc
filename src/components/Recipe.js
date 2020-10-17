import React from 'react';
import ItemService from '../services/ItemService';
import { formatPrice } from '../helpers';

const multiplyCountPrice = (price, count) => {
    return price * count;
};

const subtotal = (array, key, recipe) =>
    array.reduce((p, c) => {
        return (
            p + multiplyCountPrice(c?.[key], Number(recipe.input[c.data_id]))
        );
    }, 0);

const findItemByKey = (array, key, searchId) => {
    return array.find((item) => item[key] === searchId);
};

const RecipeComponent = (props) => {
    const { recipe } = props;
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const ingredients = [...items.slice(0, 4)];

    const RECIPE_INPUT_IDS = Object.keys(recipe.input);
    const RECIPE_OUTPUT_IDS = Object.keys(recipe.output);

    const outputIsInInput = RECIPE_INPUT_IDS.includes(RECIPE_OUTPUT_IDS[0]);

    const outputItem = findItemByKey(
        items,
        'data_id',
        Number(RECIPE_OUTPUT_IDS[0])
    );

    React.useEffect(() => {
        const getItems = async () => {
            try {
                setLoading(true);
                const itemResponseCollection = await Promise.all([
                    ...RECIPE_INPUT_IDS.map(async (item) => {
                        return ItemService.getItem(item);
                    }),
                    ...(outputIsInInput
                        ? []
                        : [ItemService.getItem(RECIPE_OUTPUT_IDS[0])]),
                ]);
                const collection = itemResponseCollection.map(
                    (itemResponse) => itemResponse?.data?.result
                );
                console.log(collection);
                setItems([...collection]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getItems();
    }, [recipe]);

    return (
        <>
            {/* renders: {renders.current++} */}
            {Boolean(items.length) && !loading && (
                <div>
                    {ingredients.map((item, i) => (
                        <React.Fragment key={item.data_id}>
                            <ItemTile
                                type='input'
                                item={item}
                                recipe={recipe}
                            />
                            {i < items.length - 1 ? '+' : ''}
                        </React.Fragment>
                    ))}
                    =
                    {outputItem && (
                        <ItemTile
                            type={'output'}
                            item={outputItem}
                            recipe={recipe}
                        />
                    )}
                    {outputItem &&
                        formatPrice(
                            Math.floor(
                                multiplyCountPrice(
                                    outputItem?.['min_sale_unit_price'],
                                    recipe.output[RECIPE_OUTPUT_IDS[0]]
                                ) -
                                    subtotal(
                                        ingredients,
                                        'min_sale_unit_price',
                                        recipe
                                    )
                            )
                        )}
                </div>
            )}
        </>
    );
};

export const Recipe = RecipeComponent;

const ItemTile = ({ item, type, recipe }) => {
    return (
        <>
            {item && (
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>{recipe[type][item.data_id]}</div>
                        <img src={item.img} alt={item.name} title={item.name} />
                        <p>name: {item.name}</p>
                    </div>
                    <p>
                        price:{' '}
                        {formatPrice(
                            Math.floor(
                                recipe[type][item.data_id] *
                                    item.min_sale_unit_price
                            )
                        )}
                    </p>
                </div>
            )}
        </>
    );
};
