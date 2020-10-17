import React from 'react';
import ItemService from '../services/ItemService';
import { outputIsInInput } from './helpers';

export const useGetItems = (inputIds, outputIds) => {
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const getItems = React.useCallback(async () => {
        try {
            setLoading(true);
            const itemResponseCollection = await Promise.all([
                ...inputIds.map(async (item) => {
                    return ItemService.getItem(item);
                }),
                ...(outputIsInInput(inputIds, outputIds)
                    ? []
                    : [ItemService.getItem(outputIds[0])]),
            ]);
            const collection = itemResponseCollection.map(
                (itemResponse) => itemResponse?.data?.result,
            );
            setItems([...collection]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [inputIds, outputIds]);

    React.useEffect(() => {
        getItems();
    }, [getItems]);

    return {items, loading};
};
