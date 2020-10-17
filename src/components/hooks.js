import React from 'react';
import ItemService from '../services/ItemService';

export const useGetItems = () => {
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const getItems = React.useCallback(async (inputIds) => {
        try {
            setLoading(true);
            const itemResponseCollection = await Promise.all([
                ...inputIds.map(async (item) => {
                    return ItemService.getItem(item);
                })
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
    }, []);

    return {items, loading, getItems};
};
