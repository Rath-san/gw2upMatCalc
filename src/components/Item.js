import React from 'react';
import { formatPrice } from './../helpers/formatPrice';

export const ItemTile = ({ item, type, recipe }) => (
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
