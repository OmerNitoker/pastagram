import { dbService } from "../../services/db.service.js";
import { ObjectId } from "mongodb"

export const userService = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).toArray()
        users = users.map(user => {
            delete user.password
            return user
        })
        return users
    } catch (err) {
        console.log('ERROR: Failed to get users')
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: new ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        console.log('ERROR: Failed to get User')
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        console.log('ERROR: Failed to find user')
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ _id: new ObjectId(userId) })
    } catch (err) {
        console.log('Failed to delete user')
        throw err
    }
}

async function update(user) {
    try {
        const userToSave = {
            _id: new ObjectId(user._id),
            fullname: user.fullname,
            username: user.username,
            imgUrl: user.imgUrl,
            following: user.following,
            followers: user.followers,
            posts: user.posts,
            savedPostIds: user.savedPostIds,
            description: user.description
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        return userToSave
    } catch (err) {
        console.log('Cannot update user')
        throw err
    }
}

async function add(user) {
    try {
        const existUser = await getByUsername(user.username)
        if (existUser) throw new Error('Username taken')

        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            imgUrl: user.imgUrl,
            following: [],
            followers: [],
            posts:[],
            savedPostIds: [],
            description: ''
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        console.log('Cannot add user')
        throw err
    }
}



function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    return criteria
}