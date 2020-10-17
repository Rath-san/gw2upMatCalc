import React from 'react';
import { Recipe } from './components/Recipe';
import { FINE_MATERIALS, LODESTONES } from './constants/recipes';
import Select from './components/Select';
import { useGetItems } from './components/hooks';

const AVALIBLE_RECIPES = [
    {
        name: 'Fine materials',
        value: 'fineMaterials',
        data: FINE_MATERIALS,
    },
    {
        name: 'Lodestones',
        value: 'lodestones',
        data: LODESTONES,
    },
];

const App = () => {
    const [RECIPES, setRECIPES] = React.useState([]);
    const { items, getItems } = useGetItems();
    const [selectedRecipe, setSelectedRecipe] = React.useState(
        AVALIBLE_RECIPES[0].value
    );

    const handleOnSelectChange = (newValue) => {
        setSelectedRecipe(newValue.target.value);
    };

    React.useEffect(() => {
        const newRecipes = AVALIBLE_RECIPES.find(
            (r) => r.value === selectedRecipe
        ).data;
        setRECIPES([...newRecipes]);
    }, [selectedRecipe]);

    
    // get unique items
    React.useEffect(() => {
        // flatten recipe
        const recipeItems = Array.from(new Set(RECIPES.reduce((p, n) => {
            return [...p, ...Object.keys(n.input), ...Object.keys(n.output)]
        }, [])))
        if (!recipeItems.length) return
        getItems(recipeItems)
    }, [getItems, RECIPES]);
    // map items to recipe

    const itemsToRecipe = () => {

        const f = (inputKeys, input) => {
            
            let g = {}

            inputKeys.forEach(itemId => {
                Object.assign(g, {
                    [itemId]: {
                        count: input[itemId],
                        item: items.find(e => e.data_id === Number(itemId))
                    }
                })
            })
            return g
        }

        const m = RECIPES.map(({input, output}) => {
            const inputKeys = Object.keys(input);
            const outputKeys = Object.keys(output);

            return {
                input: f(inputKeys, input),
                output: f(outputKeys, output)
            }

        })
        return m
    }

    return (
        <div>
            <Select
                onChange={handleOnSelectChange}
                options={AVALIBLE_RECIPES}
                value={selectedRecipe}
            />
            <div
                style={{
                    display: 'flex',
                }}>
                {Boolean(items.length) &&
                    itemsToRecipe().map((recipe, i) => (
                        <React.Fragment key={i}>
                            <Recipe {...recipe} />
                            <hr style={{ margin: '1rem' }} />
                        </React.Fragment>
                    ))}
            </div>
        </div>
    );
};

export default App;
