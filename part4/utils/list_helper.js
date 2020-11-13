const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (total, eachBlog) => { return total + eachBlog.likes }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let posOfMostLikes = 1;
    let theMostLikes = blogs[0].likes;

    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > theMostLikes) {
            posOfMostLikes = i
            theMostLikes = blogs[i].likes
        }
    }

    return blogs[posOfMostLikes]
}

module.exports = {
    dummy,
    favoriteBlog,
    totalLikes,
}