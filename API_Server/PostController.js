import Post from "./Post.js";
import postService from "./PostService.js";

class PostController {
    async create(req, res) {
        try {
            const post = await postService.create(req.body);
            return res.json(post)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await postService.getAll();
            return res.json(posts);
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async getOne(req, res) {
        try {
            const post = await postService.getOne(req.params.id);
            return res.json(post);
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await postService.update(req.body);
            return res.json(updatedPost);
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const post = await postService.delete(req.params.id);
            return res.json(post);
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

export default new PostController()