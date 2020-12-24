# Stock Market Recommender

The application is build with react and redux.

## How to run the application

In the project directory, you can run:

`npm install`
`npm start`

Application visible at [http://localhost:3000](http://localhost:3000).

## The problem

Behavioral Finance is an exciting field and you’ve decided to jump in with an idea for your new start up.
In an earlier experimentation you’ve noticed a correlation between the various social media posts on a
stock symbol and that share price for that stock symbol.

You’ve decided to build an app that can provide a buy, hold or sell recommendation when given a stock
symbol. The recommendation adjusts itself based on data.

Unfortunately, there are multiple challenges around building this app. However, as a smart CTO, you’ve
realized that things must be done in parallel. While you look at building your backend, you’ve decided to
start working on the frontend today.

## The solution

- We have initial mock data as json files on the data folder for the available stocks and social network posts.
- The user must select an available stock and the numbers of posts to be display.
- After the form is submitted the data for prices, number of posts and recommendations are generated randomly.
- The information for the selected stock is updated asynchronosly every 5 seconds to show the new prices, posts and recommendations.
- We build a service layer in order to be changed once the backend is developed.

## About the accessibility

- The application use contrasts colors which guarantee a visually impaired person can use it. Tested using [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/).
- The application form can be use by keyboard.
- We set the ARIA necessary in the diferent html tags.
- We set the inital focus in our react application in order to guarantee the application is used on components mounted.
- Other react accessibility recomendations [https://reactjs.org/docs/accessibility.html#standards-and-guidelines](https://reactjs.org/docs/accessibility.html#standards-and-guidelines).

## Suggested improvements

- PropTypes need to be added to the application in order to define the properties expected by the components.
- Unit tests need to be implemented.
- Better error handling for form.
- Use a style preprocessor as Sass to build the css.
- Dynamic integration of social medias.
- Graph for recommendations.