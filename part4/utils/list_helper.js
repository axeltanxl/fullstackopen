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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}