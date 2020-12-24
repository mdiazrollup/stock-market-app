import { stockData } from "../data/stocks";
import {postsData} from '../data/posts';
import {socialNetwoks, timeWindows, 
    maxPosts, maxPrice,
    marketOptions} from '../share/constants';
import moment from 'moment';

export const getStocksData = () => stockData;

export const getStockDataBySymbol = (stockSymbol, numPosts) => {
    const dates = generateDates(timeWindows);
    const socialNetworksPosts = socialNetwoks.map(network => {
        return {
            name: network,
            posts: socialMediaCountGenerator(stockSymbol, network)
        }
    });
    const prices = stockPriceGenerator(stockSymbol, dates);
    const rating = recommendationAlgorithm(prices,socialNetworksPosts);
    return {
        symbol: stockSymbol,
        numPosts: numPosts,
        timeWindows: timeWindows,
        socialNetworksPosts: socialNetworksPosts,
        recommentations: rating,
        posts: getPosts(numPosts)
    };
};

const stockPriceGenerator = (stockSymbol, dates) => {
    const price = () => (Math.random() * maxPrice).toFixed(2);
    return dates.map(date => {
        return {
            date: date,
            price: price()
        }
    });
};

const socialMediaCountGenerator = (stockSymbol, socialMediaType) => {
    const counts = Math.random() * maxPosts;
    return Math.floor(counts);
};

const recommendationAlgorithm = (stockPrices, socialMediaCounts) => {
    const profitIndexes = getMaxAndMinProfitIndex(stockPrices.map(stockPrice => stockPrice.price));
    const maxProfitIndex = profitIndexes.maxProfitIndex;
    const minProfitIndex = profitIndexes.minProfitIndex;
    
    return stockPrices.map((price, index) => {
        let recommended = marketOptions.HOLD;
        if(index === maxProfitIndex) {
            recommended = marketOptions.SELL
        } else if(index === minProfitIndex) {
            recommended = marketOptions.BUY
        } 

        return {
            date: price.date,
            price: price.price,
            recommended: recommended
        }
    });
};

// Return the index of the date with max and min profit to sell and buy
const getMaxAndMinProfitIndex = (prices) => {
    let minIdx = 0;
    let maxIdx = 1;
    let currMin = 0;
    let maxProfit = 0;

    if(prices.length < 2) {
        throw new Error("Need atleast two time periods to be profitable!");
    }
    
    for(let i = 1; i < prices.length; i++) {

        // new current min.
        if(prices[i] < prices[currMin]) { 
        	currMin = i;
        }
        
        // new best profit
        if(prices[maxIdx] - prices[minIdx] < prices[i] - prices[currMin]) {
                maxIdx = i;
            	minIdx = currMin;
        }

    }

    maxProfit  = prices[maxIdx] - prices[minIdx];
    return {
        maxProfit: maxProfit,
        maxProfitIndex: maxIdx,
        minProfitIndex: minIdx
    };
}

// Generate dates in the future given a timeWindows
const generateDates = (maxDates) => {
    let currentDate = moment();
    let dates = [];
    let totalDates = 0;
    while(totalDates < maxDates) {
        dates.push(moment(currentDate).add(totalDates,'days').format('L'));
        totalDates++;
    }
    return dates;
}

const getPosts = (numPosts) => {
    const posts = [];
    const totalPosts = postsData.length;
    for(let i=0; i < numPosts; i++) {
        const index = Math.floor(Math.random() * totalPosts);
        posts.push(postsData[index]);
    }
    return posts;
};