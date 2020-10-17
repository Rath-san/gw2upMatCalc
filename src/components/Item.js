import React from 'react';
import { formatPrice } from './../helpers/formatPrice';

export const ItemTile = ({ item, count }) => {
    return (
        <>
            {item && (
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>{count}</div>
                        <img src={item.img} alt={item.name} title={item.name} />
                        <p>name: {item.name}</p>
                    </div>
                    <p>
                        price:{' '}
                        {formatPrice(
                            Math.floor(count * item.min_sale_unit_price),
                        )}
                    </p>
                </div>
            )}
        </>
    );
};
