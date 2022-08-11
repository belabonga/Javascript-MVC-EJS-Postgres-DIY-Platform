class Author {
    constructor(id, fullName, gender){
        this.id = id;
        this.fullName = fullName;
        this.gender = gender;
    }

    get formatName() {
        if (this.gender === "Female") {
            return `Mrs. ${this.fullName}`
        } else {
            return `Mr. ${this.fullName}`
        }
    }
}

class AuthorDetail extends Author {
    constructor(id, fullName, gender, totalPost, totalVote, averageTime){
        super(id, fullName, gender)
        this.totalPost = totalPost;
        this.totalVote = totalVote;
        this.averageTime = averageTime;
    }
}

class Post {
    constructor(id, title, difficulty, totalVote) {
        this.id = id;
        this.title = title;
        this.difficulty = difficulty;
        this.totalVote = totalVote;
    }
}

class PostDetail extends Post{
    constructor(id, title, difficulty, estimatedTime, description, totalVote, imageUrl, createdDate, AuthorId, authorName){
        super(id, title, difficulty, totalVote)
        this.estimatedTime = estimatedTime;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdDate = createdDate;
        this.AuthorId = AuthorId;
        this.authorName = authorName;
    }

    get formatCreatedDate(){
        return this.createdDate.toISOString().split('T')[0]
    }
}

module.exports = {Author, AuthorDetail, Post, PostDetail}