import React from 'react';
import { formatPrice } from '../helpers';
import { subtotal, multiplyCountPrice } from './helpers';
import { ItemTile } from './Item';

const RecipeComponent = (props) => {
    const { input, output } = props;
    const dataInput = Object.keys(input);
    const dataOutput = Object.keys(output);

    return (
        <>
            {Boolean(true) && (
                <div>
                    {dataInput.map((itemId, i) => (
                        <React.Fragment key={itemId}>
                            <ItemTile {...input[itemId]} />
                            {i < dataInput.length - 1 ? '+' : ''}
                        </React.Fragment>
                    ))}
                    =
                    {Boolean(dataOutput.length) &&
                        dataOutput.map((itemId, i) => (
                            <ItemTile key={itemId} {...output[itemId]} />
                        ))}
                    {Boolean(dataOutput.length) &&
                        formatPrice(addTPListing(output, dataOutput, input, dataInput))}
                </div>
            )}
        </>
    );
};

const addTPListing = (output, dataOutput, input, dataInput) => {
    const value =
        multiplyCountPrice(
            output[dataOutput[0]].item?.['min_sale_unit_price'],
            output[dataOutput[0]].count,
        ) - subtotal(dataInput, input, 'min_sale_unit_price');

    return Math.floor(value - value * 0.15);
};

export const Recipe = React.memo(RecipeComponent);
