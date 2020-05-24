import axios from 'axios';
const API_URL = 'http://localhost:8080/api/recipeSearch';

class RecipeService{
    getRecipeContent(){
        return axios.get(API_URL+"?q=apple");
    }
}
export default new RecipeService();
