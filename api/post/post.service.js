import { ObjectId, Timestamp } from "mongodb";
import { dbService } from "../../services/db.service.js";

export const postService = {
    getById,
    query, 
    update,
    add,
    remove
}

async function query() {
    try {
        const collection = await dbService.getCollection('post')
        const posts = await collection.find().toArray()
        // console.log('posts:',posts)
        return posts
    } catch (err) {
        console.log('ERROR: cannot find posts')
        throw err
    }
}

async function getById(postId) {
    try {
        const collection = await dbService.getCollection('post')
        const post = await collection.findOne({ _id: new ObjectId(postId) })
        return post
    } catch (err) {
        console.log('ERROR: cannot find post')
        throw err
    }
}

async function update(post) {
    try {
        const postToSave = {
            timestamp: post.timestamp,
            txt: post.txt,
            imgUrl: post.imgUrl,
            by: post.by,
            comments: post.comments,
            likedBy: post.likedBy,
            tags: post.tags
        }
        const collection = await dbService.getCollection('post')
        await collection.updateOne({_id: new ObjectId(post._id)}, {$set: postToSave})
        return post
    } catch (err) {
        console.log('ERROR: Cannot update post')
        throw err
    }
}

async function add(post) {
    try {
        const collection = await dbService.getCollection('post')
        await collection.insertOne(post)
        return post
    } catch (err) {
        console.log('ERROR: Cannot add post')
        throw err
    }
}

async function remove(postId) {
    try {
        const collection = await dbService.getCollection('post')
        return await collection.deleteOne({_id: new ObjectId(postId)})
    } catch (err) {
        console.log('ERROR: Cannot remove post')
        throw err
    }
}


