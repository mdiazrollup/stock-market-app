import React from "react";
import classes from './StocksPosts.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Post from '../../UI/Post/Post';

const stocksPosts = (props) => {
    const {show, posts} = props;
    const totalPosts = posts.length;
    const postsElements = posts.map((post, index) => {
        return <Post key={index} network={post.network} user={post.user} description={post.description}></Post>
    });

    return (
        <Aux>
            {show && 
                <section className={classes.StocksPosts}>
                    <h3>Social Posts</h3>
                    { totalPosts > 0
                    ? postsElements
                    : <div className={classes.NoPostsMessage}>There is not posts to display</div>}
                </section>
            }
        </Aux>
    );
};

export default stocksPosts;