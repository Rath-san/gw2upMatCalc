import React from 'react';
import { Recipe } from './components/Recipe';
import { FINE_MATERIALS, LODESTONES } from './constants/recipes';
import Select from './components/Select';

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
    const [selectedRecipe, setSelectedRecipe] = React.useState(
        AVALIBLE_RECIPES[0].value
    );
    const renders = React.useRef(0);

    const handleOnSelectChange = (newValue) => {
        setSelectedRecipe(newValue.target.value);
    };

    React.useEffect(() => {
        const newRecipes = AVALIBLE_RECIPES.find(
            (r) => r.value === selectedRecipe
        ).data;
        setRECIPES([...newRecipes]);
    }, [selectedRecipe]);

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
                {Boolean(RECIPES.length) &&
                    RECIPES.map((recipe, i) => (
                        <React.Fragment key={i}>
                            <Recipe recipe={recipe} />
                            <hr style={{ margin: '1rem' }} />
                        </React.Fragment>
                    ))}
            </div>
        </div>
    );
};

export default App;
