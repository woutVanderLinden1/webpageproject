import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Checkbox from "./checkBox";
import Swal, {clickCancel, clickConfirm} from 'sweetalert2';

class Profile extends React.Component {
    constructor() {
        super();
        let alreadySet = false;
        this.amountOfLikes = 0;
        this.amountOfDislikes = 0;
        if(localStorage.getItem('users') != null){
            let users = JSON.parse(localStorage.getItem('users'));
            for(let i = 0; i<users.length; i++){
                if(users[i].Name === localStorage.getItem('currentUser')){
                    if(users[i].Preferences && users[i].Preferences.length && users[i].Allergies&& users[i].Preferences){
                        alreadySet = true;
                        this.amountOfDislikes = users[i].Allergies.length;
                        this.amountOfLikes = users[i].Preferences.length;
                        break;
                    }

                }
            }
        }
        if(!alreadySet){
            let list = [];
        }
        this.items = ['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'side-dishes', 'vegetables', 'mexican', 'easy', 'fall', 'holiday-event', 'vegetarian', 'winter', 'dietary', 'christmas', 'seasonal', 'squash', '30-minutes-or-less', 'breakfast', 'main-dish', 'pork', 'american', 'oven', 'kid-friendly', 'pizza', 'northeastern-united-states', 'meat', 'equipment', 'chili', 'crock-pot-slow-cooker', '4-hours-or-less', 'eggs-dairy', 'potatoes', 'dinner-party', 'easter', 'cheese', 'stove-top', 'new-years', 'thanksgiving', 'independence-day', 'st-patricks-day', 'valentines-day', 'inexpensive', 'brunch', 'superbowl', 'presentation', 'served-hot', 'weeknight', 'canning', 'condiments-etc', 'heirloom-historical', 'amish-mennonite', 'number-of-servings', 'technique', '15-minutes-or-less', 'low-protein', '5-ingredients-or-less', 'beverages', 'fruit', 'low-sodium', 'shakes', 'low-calorie', 'low-in-something', 'apples', 'served-cold', '3-steps-or-less', 'appetizers', 'canadian', 'vegan', 'freezer', 'south-west-pacific', 'hawaiian', 'spicy', 'copycat', 'pork-ribs', 'super-bowl', 'novelty', 'taste-mood', 'savory', 'sweet', 'pies-and-tarts', 'desserts', 'lunch', 'snacks', 'no-cook', 'refrigerator', 'frozen-desserts', 'pies', 'chocolate', 'breads', 'oamc-freezer-make-ahead', 'quick-breads', 'tropical-fruit', 'bananas', 'healthy', '1-day-or-more', 'comfort-food', 'berries', 'strawberries', 'beans', 'potluck', 'to-go', 'greens', 'collard-greens', 'pork-chops', 'southwestern-united-states', 'deep-fry', 'candy', 'beef', 'one-dish-meal', 'lactose', 'bisques-cream-soups', 'soups-stews', 'spring', 'food-processor-blender', 'free-of-something', 'cauliflower', 'small-appliance', 'beginner-cook', 'low-cholesterol', 'low-carb', 'healthy-2', 'spinach', 'low-saturated-fat', 'high-calcium', 'high-in-something', 'very-low-carbs', 'sauces', 'eggs', 'savory-sauces', 'asian', 'indian', 'herb-and-spice-mixes', 'cooking-mixes', 'peppers', 'poultry', 'chicken', 'gluten-free', 'californian', 'black-beans', 'grilling', 'picnic', 'cookies-and-brownies', 'bar-cookies', 'brownies', 'gifts', 'casseroles', 'ground-beef', 'wild-game', 'deer', 'low-fat', 'summer', 'toddler-friendly', 'mixer', 'clear-soups', 'salads', 'pasta', 'pasta-rice-and-grains', 'for-large-groups', 'muffins', 'sandwiches', 'cakes', 'nuts', 'pineapple', 'corn', 'german', 'european', 'yeast', 'italian', 'lasagna', 'omelets-and-frittatas', 'for-1-or-2', 'romantic', 'ramadan', 'chicken-breasts', 'diabetic', 'dips', 'barbecue', 'marinades-and-rubs', 'finger-food', 'infant-baby-friendly', 'roast', 'veal', 'garnishes', 'cheesecake', 'grains', 'wedding', 'kosher', 'high-protein', 'mushrooms', 'seafood', 'fish', 'tuna', 'saltwater-fish', 'elbow-macaroni', 'pancakes-and-waffles', 'midwestern', 'southern-united-states', 'chicken-thighs-legs', 'salmon', 'indonesian', 'soy-tofu', 'tempeh', 'spreads', 'beef-ribs', 'grapes', 'smoothies', 'bacon', 'broil', 'pacific-northwest', 'tomatoes', 'cocktails', 'no-shell-fish', 'squid', 'polish', 'chinese', 'steam', 'onions', 'british-columbian', 'broccoli', 'kwanzaa', 'meatloaf', 'simply-potatoes2', 'rolled-cookies', 'drop-cookies', 'cake-fillings-and-frostings', 'lettuces', 'stews', 'lentils', 'danish', 'scandinavian', 'swiss', 'swedish', 'french', 'from-scratch', 'microwave', 'granola-and-porridge', 'bread-machine', 'asparagus', 'gumbo', 'african', 'cajun', 'shrimp', 'creole', 'shellfish', 'savory-pies', 'salad-dressings', 'orange-roughy', 'leftovers', 'simply-potatoes', 'crab', 'mango', 'curries', 'egg-free', 'roast-beef', 'pork-sausage', 'brown-bag', 'turkey', 'whole-turkey', 'green-yellow-beans', 'beef-sausage', 'australian', 'rice', 'brown-rice', 'white-rice', 'long-grain-rice', 'caribbean', 'central-american', 'stuffings-dressings', 'english', 'spaghetti', 'coconut', 'quebec', 'freshwater-fish', 'catfish', 'middle-eastern', 'lebanese', 'ravioli-tortellini', 'steak', 'clams', 'rolls-biscuits', 'gelatin', 'greek', 'citrus', 'oranges', 'papaya', 'punch', 'pitted-fruit', 'peaches', 'moose', 'wings', 'pasta-shells', 'blueberries', 'fudge', 'celebrity', 'south-american', 'sweet-sauces', 'russian', 'pork-loins', 'ham', 'burgers', 'biscotti', 'peanut-butter', 'baja', 'halloween', 'dairy-free', 'high-fiber', 'zucchini', 'puddings-and-mousses', 'japanese', 'lemon', 'chick-peas-garbanzos', 'cobblers-and-crisps', 'lamb-sheep', 'flat-shapes', 'turkey-burgers', 'carrots', 'penne', 'micro-melanesia', 'yams-sweet-potatoes', 'cinco-de-mayo', 'native-american', 'artichoke', 'salsas', 'cupcakes', 'puerto-rican', 'stir-fry', 'hand-formed-cookies', 'spanish', 'steaks', 'irish', 'scones', 'oaxacan', 'lime', 'camping', 'thai', 'polynesian', 'melons', 'jewish-ashkenazi', 'hanukkah', 'rosh-hashana', 'iraqi', 'saudi-arabian', 'whole-chicken', 'sourdough', 'baking', 'medium-grain-rice', 'pakistani', 'scottish', 'chutneys', 'somalian', 'non-alcoholic', 'mardi-gras-carnival', 'ontario', 'raspberries', 'crusts-pastry-dough-2', 'coffee-cakes', 'memorial-day', 'tex-mex', 'south-african', 'passover', 'new-zealand', '', 'chowders', 'pressure-cooker', 'whitefish', 'halibut', 'bok-choys', 'pennsylvania-dutch', 'ice-cream', 'pears', 'scallops', 'pheasant', 'water-bath', 'stocks', 'tarts', 'chinese-new-year', 'chicken-livers', 'manicotti', 'szechuan', 'birthday', 'nut-free', 'fillings-and-frostings-chocolate', 'jams-and-preserves', 'unprocessed-freezer', 'cherries', 'chard', 'tilapia', 'colombian', 'welsh', 'short-grain-rice', 'kiwifruit', 'breakfast-eggs', 'eggs-breakfast', 'czech', 'filipino', 'turkey-breasts', 'cuban', 'perch', 'smoker', 'college', 'belgian', 'costa-rican', 'guatemalan', 'honduran', 'finnish', 'moroccan', 'a1-sauce', 'avocado', 'jellies', 'labor-day', 'iranian-persian', 'jewish-sephardi', 'dutch', 'pumpkin', 'cod', 'sole-and-flounder', 'plums', 'turkish', 'portuguese', 'soul', 'hungarian', 'georgian', 'brazilian', 'nigerian', 'ethiopian', 'fathers-day', 'sudanese', 'congolese', 'ecuadorean', 'mussels', 'peruvian', 'meatballs', 'egyptian', 'argentine', 'mahi-mahi', 'chilean', 'hidden-valley-ranch', 'dehydrator', 'crawfish', 'oatmeal', 'reynolds-wrap', 'malaysian', 'duck', 'rosh-hashanah', 'nepalese', 'eggplant', 'goose', 'icelandic', 'veggie-burgers', 'mothers-day', 'mashed-potatoes', 'chocolate-chip-cookies', 'vietnamese', 'elk', 'oysters', 'palestinian', 'rabbit', 'norwegian', 'lobster', 'main-dish-beef', 'beef-crock-pot', 'pot-roast', 'hunan', 'austrian', 'halloween-cocktails', 'libyan', 'april-fools-day', 'beef-organ-meats', 'beef-liver', 'angolan', 'korean', 'cantonese', 'whole-duck', 'halloween-cupcakes', 'halloween-cakes', 'ragu-recipe-contest', 'macaroni-and-cheese', 'trout', 'irish-st-patricks-day', 'bass', 'beijing', 'quail', 'pickeral', 'main-dish-chicken', 'bear', 'brewing', 'cambodian', 'beef-kidney', 'beef-sauces', 'spaghetti-sauce', 'heirloom-historical-recipes', 'pot-pie', 'dips-lunch-snacks', 'pressure-canning', 'main-dish-pork', 'pork-loins-roast', 'quiche', 'sugar-cookies', 'venezuelan', 'octopus', 'side-dishes-beans', 'beans-side-dishes', 'baked-beans', 'snacks-kid-friendly', 'snacks-sweet', 'duck-breasts', 'main-dish-pasta', 'pasta-salad', 'pasta-elbow-macaroni', 'namibian', 'mushroom-soup', 'beef-barley-soup', 'pork-crock-pot', 'crock-pot-main-dish', 'desserts-fruit', 'desserts-easy', 'lasagne', 'laotian', 'cabbage', 'prepared-potatoes', 'middle-eastern-main-dish', 'high-in-something-diabetic-friendly', 'dips-summer', 'black-bean-soup', 'bean-soup', 'served-hot-new-years', 'ham-and-bean-soup', 'lamb-sheep-main-dish', 'mongolian', 'for-large-groups-holiday-event', 'stews-poultry', 'pasta-rice-and-grains-elbow-macaroni', 'pork-loin', 'cranberry-sauce', 'marinara-sauce', 'breakfast-casseroles', 'breakfast-potatoes', 'main-dish-seafood', 'shrimp-main-dish', 'pumpkin-bread', 'bread-pudding', 'less_thansql:name_topics_of_recipegreater_than', 'chicken-crock-pot', 'chicken-stews', 'chicken-stew', 'Throw the ultimate fiesta with this sopaipillas recipe from Food.com.', 'roast-beef-main-dish', 'roast-beef-comfort-food'];

        this.state = {
            boxes: this.getItemLocal("boxes"),
            suggestionsLiked: [],
            suggestionsDisliked: [],
            textLiked: '',
            textDisliked: ''
        };

        this.success = this.success.bind(this);
        this.updateAccount = this.updateAccount.bind(this);

    }


    getItemLocal(name) {
        return (JSON.parse(localStorage.getItem(name)))
    }

    getRender() {
        let users = JSON.parse(localStorage.getItem('users'));
        let tempIndex = -1;
        for (let i = users.length-1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                tempIndex = i;
                localStorage.setItem("favorite", JSON.stringify(false));
                if (users[i].FirstTime){

                    Swal.fire({
                        title: 'Welcome!',
                        text: "Let's set you up! First, choose your preferences and things you dislike, like allergies for example.",
                        icon: 'info',
                        confirmButtonText: 'Okay!'
                    });

                    users[i].FirstTime = false;
                    localStorage.setItem('users', JSON.stringify(users));

                    break;
                }
            }
        }

        let returnVal = [];
        let returnList = [];
        returnVal.push( <h3> Things you like </h3>);
        const {textLiked} = this.state;
        const {textDisliked} = this.state;

        for (let i = 0; i < this.amountOfLikes; i++) {
            returnList.push(<Checkbox name={users[tempIndex].Preferences[i]} checked={users[tempIndex].booleansPreferences[i]} id={i} prefs={true}/>)
        }


        returnVal.push(<div class={"container"}><ul class={"ks-cboxtags"}> {returnList} </ul></div>);
        returnVal.push( <input className="textBoxAdd" value={textLiked}  onChange={this.onTextChangedLiked}  type={'text'}/>);
        returnVal.push(this.renderSuggestionsLiked());
        returnVal.push(<input className="addButton" type={"submit"} value={"Add something you like"} onClick={() =>this.doChange(textLiked, 1)}/>);
        returnVal.push(<h3> Things you dislike </h3>);
        returnList = [];
        for (let i = 0; i <  this.amountOfDislikes; i++) {
            returnList.push(<Checkbox name={users[tempIndex].Allergies[i]} checked={users[tempIndex].booleanAllergies[i]} id={-i-1} prefs={false}/>)
        }

        returnVal.push(<div class={"container"}><ul class={"ks-cboxtags"}> {returnList} </ul></div>);
        returnVal.push( <input className="textBoxAdd" value={textDisliked}  onChange={this.onTextChangedDisliked}  type={'text'}/>);
        returnVal.push(this.renderSuggestionsDisliked());
        returnVal.push(<input className="addButton" type={"submit"} value={"Add something you dislike"} onClick={() =>this.doChange(textDisliked, 2)}/>);
        return returnVal

    }

    success() {


    }
    updateAccount(){
        let users = JSON.parse(localStorage.getItem('users'));
        for(let i = 0; i<users.length; i++){
            if(users[i].Name === localStorage.getItem('currentUser')){
                //let prefAndAllergies = JSON.parse(localStorage.getItem('boxes'));
                //users[i].booleanAllergies = prefAndAllergies.slice(0, this.amountOfLikes);
                //users[i].booleansPreferences = prefAndAllergies.slice(this.amountOfLikes+1, this.amountOfLikes+this.amountOfDislikes);
                break;

            }
        }
        localStorage.setItem('users', JSON.stringify(users));
        this.success();
    }

    renderButton() {
        let users = JSON.parse(localStorage.getItem('users'));
        for (let i = users.length -1; i>=0; i--) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                if (users[i].FirstTime1){

                    localStorage.setItem('users', JSON.stringify(users));
                   return <Link to="/recommendations"><button className="NextButton Green" onClick={this.updateAccount}><b>Recommend!</b></button></Link>

                }
                else
                    return <Link to="/recommendations"><button className="NextButton Green" onClick={this.updateAccount}><b>Recommend!</b></button></Link>
            }
        }




    }

    onTextChangedLiked = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({suggestionsLiked: suggestions, textLiked: value}));
    }
    onTextChangedDisliked = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }

        this.setState(() => ({suggestionsDisliked: suggestions, textDisliked: value}));
    }
    suggestionSelectedLiked(value){

        this.setState(()=>({
            textLiked: value,
            suggestionsLiked: []
        }))
        this.state.textLiked = value;
    }
    suggestionSelectedDisliked(value){
        this.setState(()=>({
            textDisliked: value,
            suggestionsDisliked: []
        }))
        this.state.textDisliked = value;
    }
    renderSuggestionsLiked(){

        const {suggestionsLiked} = this.state;

        if(suggestionsLiked.length === 0 ){
            return null;
        }
        return(
            <div className={"AutoCompleteText"}>
            <ul>
                {suggestionsLiked.map((i) => <li onClick={() =>this.suggestionSelectedLiked(i)}>{i}</li>)}
            </ul>
            </div>
        );
    }
    renderSuggestionsDisliked(){

        const {suggestionsDisliked} = this.state;

        if(suggestionsDisliked.length === 0 ){
            return null;
        }
        return(
            <div className={"AutoCompleteText"}>
                <ul>
                    {suggestionsDisliked.map((i) => <li onClick={() =>this.suggestionSelectedDisliked(i)}>{i}</li>)}
                </ul>
            </div>
        );
    }
    doChange(item, buttonNb){
        let items = this.items;
        let users = JSON.parse(localStorage.getItem('users'));
        for(let i = 0; i<users.length; i++) {
            if (users[i].Name === localStorage.getItem('currentUser')) {
                if(items.includes(item) && item!==''){
                    if(buttonNb === 1){
                        users[i].Preferences.push(item);
                        users[i].booleansPreferences.push(true);
                        this.amountOfLikes = this.amountOfLikes + 1;
                        this.setState(() => ({textLiked: item}));

                    }
                    else if(buttonNb === 2){
                        users[i].Allergies.push(item);
                        users[i].booleanAllergies.push(true);
                        this.amountOfDislikes = this.amountOfDislikes + 1;
                        this.setState(() => ({textDisliked: item}));

                    }
                    items.splice(this.items.indexOf(item),1);
                    this.items = items

                    break;
                }
            }

        }
        localStorage.setItem('users', JSON.stringify(users));
    }
    render() {

        return (

            <div className="App">
                <div className="PageHeader"> <b className="PageTitle">Your profile</b>
                    <Link to="/profile"><button className="profile" ><b> </b></button></Link>
                    <Link to="/recommendations"><button onClick={() => {localStorage.setItem("favorite", JSON.stringify(true));}} title="favorites" className="favorites" ><b> </b></button></Link>
                    <Link to="/recommendations"><button onClick={() => localStorage.setItem("favorite", JSON.stringify(false))} title="recommends" className="toRecommendButton" ><b> </b></button></Link>

                </div>
                <header className="App-header">
                    {this.getRender()}
                    {this.renderButton()}


                </header>
            </div>


        );
    }
}

export default Profile;
