import { postService } from "./post.service.js";

export async function getPosts(req, res) {
    try {
        const posts = await postService.query()
        res.json(posts)
    } catch (err) {
        console.log('ERROR: Cannot get posts')
        res.status(500).send({ err: 'Failed to get posts' })
    }
}

export async function getPostById(req, res) {
    try {
        const { postId } = req.params
        const post = await postService.getById(postId)
        res.json(post)
    } catch (err) {
        console.log('ERROR: Failed to get post')
        res.status(500).send({ err: 'Faild to get post' })
    }
}

export async function addPost(req, res) {
    // const { loggedinUser } = req

    try {
        const post = req.body
        // post.by = loggedinUser
        const addedPost = await postService.add(post)
        res.json(addedPost)
    } catch (err) {
        console.log('Failed to add post')
        res.status(500).send({ err: 'Failed to add post' })
    }
}

export async function updatePost(req, res) {
    try {
        const post = req.body
        const updatedPost = await postService.update(post)
        res.json(updatedPost)
    } catch (err) {
        console.log('Failed to update post', err)
        res.status(500).send({ err: 'Failed to update post' })
    }
}

export async function removePost(req, res) {
    try {
        const { postId } = req.params
        await postService.remove(postId)
        res.send()
    } catch (err) {
        console.log('Failed to remove post')
        res.status(500).send({err: 'Failed to remove post'})
    }
}