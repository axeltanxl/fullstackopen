const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)

    return total
}

const favouriteBlog = (blogs) => {
    const max = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)

    return max
}

const mostBlogs = (blogs) => {
    const blogsCount = _.countBy(blogs, 'author')

    const author = Object.entries(blogsCount).reduce((acc, [author, blogs]) => {
        if (!acc || blogs > acc.blogs) {
            return { author, blogs }
        }
        return acc
    }, null)

    return author
}

const mostLikes = (blogs) => {
    const blogsPerAuthor = _.groupBy(blogs, 'author')

    let maxLikes = null
    for (prop in blogsPerAuthor) {
        const likes = blogsPerAuthor[prop].reduce((acc, blog) => acc + blog.likes, 0)
        if (maxLikes == null || likes > maxLikes.likes) {
            maxLikes = { "author": prop, likes }
        }
    }

    return maxLikes
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}