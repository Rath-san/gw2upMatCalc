import React from 'react';
import { formatPrice } from '../helpers';
import { subtotal, multiplyCountPrice, findItemByKey } from './helpers';
import { ItemTile } from './Item';
import { useGetItems } from './hooks';

const RecipeComponent = (props) => {
    const { input, output } = props;
    const RECIPE_INPUT_IDS = React.useMemo(() => Object.keys(input), [input]);
    const RECIPE_OUTPUT_IDS = React.useMemo(() => Object.keys(output), [output]);
    const { items, loading } = useGetItems(RECIPE_INPUT_IDS, RECIPE_OUTPUT_IDS);
    const ingredients = [...items.slice(0, 4)];

    const outputItem = findItemByKey(items, 'data_id', Number(RECIPE_OUTPUT_IDS[0]));

    return (
        <>
            {Boolean(items.length) && !loading && (
                <div>
                    {ingredients.map((item, i) => (
                        <React.Fragment key={item.data_id}>
                            <ItemTile type="input" item={item} recipe={{input, output}} />
                            {i < items.length - 1 ? '+' : ''}
                        </React.Fragment>
                    ))}
                    =
                    {outputItem && (
                        <ItemTile type={'output'} item={outputItem} recipe={{ input, output }} />
                    )}
                    {outputItem &&
                        formatPrice(
                            Math.floor(
                                multiplyCountPrice(
                                    outputItem?.['min_sale_unit_price'],
                                    output[RECIPE_OUTPUT_IDS[0]],
                                ) - subtotal(ingredients, 'min_sale_unit_price', { input, output }),
                            ),
                        )}
                </div>
            )}
        </>
    );
};

export const Recipe = React.memo(RecipeComponent);
