/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum,value) => {
    return sum+value
  }

  return (blogs.length===0) ? 0 :
    (blogs.length===1) ? blogs[0].likes :
      blogs.map(blog => blog.likes).reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length===0)
    return null

  else if(blogs.length===1)
    return blogs[0]

  else {
    let mostLiked = 0
    let index=0
    for(let i=0;i<blogs.length;i++){
      if(blogs[i].likes>=mostLiked){
        mostLiked=blogs[i].likes
        index=i
      }
    }

    return blogs[index]
  }
}



module.exports = { dummy, totalLikes, favoriteBlog }