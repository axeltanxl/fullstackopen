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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}