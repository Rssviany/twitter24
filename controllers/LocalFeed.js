import express from 'express'
import { LocalFeed } from '../models/LocalFeedModel.js';


export const postLocalFeed = async (req, res) => {
    try {

        const { title, description, city, image, links, address, radius } = req.body;

        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'No user found. Please Login!' });
        }

        const newPost = await LocalFeed.create({
            userId: user._id,
            title,
            description,
            image,
            city,
            links,
            address,
            radius
        });

        res.status(200).json({
            message: 'A New post is created',
            post: newPost
        });

    } catch (error) {
        console.log('Error while creating a local post');
        res.status(500).json({ message: 'Error while creating a new post' });
    }
};



export const getLocalFeeds = async (req, res) => {
    try {

        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'No user found.Please Login!' });
        }

        const posts = await LocalFeed.find()
            .populate("userId", "name profileImage")
            .sort({ createdAt: -1 });

        const allLocalFeeds = posts.map((post) => {

            const isLiked = post.likes.some(
                (id) => id.toString() === user._id.toString()
            );

            return {
                ...post.toObject(),
                likesCount: post.likes.length,
                commentsCount: post.comments.length,
                isLiked
            };
        });

        res.status(200).json(allLocalFeeds);

    } catch (error) {
        console.log('Error while getting a local post');
        res.status(500).json({ message: 'Error while fetching local posts' });
    }
};



export const getPostByCity = async (req, res) => {
    try {

        const { city } = req.params;

        const cityPost = await LocalFeed.find({ city })
            .populate("userId", "name profileImage")
            .sort({ createdAt: -1 });

        res.status(200).json(cityPost);

    } catch (error) {
        console.log('Error while getting a local post by city');
        res.status(500).json({ message: 'Error while fetching local posts by city' });
    }
};



export const likesToggler = async (req, res) => {
    try {

        const user = req.user;
        const { postId } = req.params;

        const post = await LocalFeed.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const alreadyLiked = post.likes.some(
            (id) => id.toString() === user._id.toString()
        );

        if (alreadyLiked) {
            post.likes.pull(user._id);
        } else {
            post.likes.addToSet(user._id);
        }

        // always recalculate
        post.likesCount = post.likes.length;

        await post.save();

        res.status(200).json({
            message: alreadyLiked ? "Post unliked" : "Post liked",
            likesCount: post.likesCount,
            isLiked: !alreadyLiked
        });

    } catch (error) {
        res.status(500).json({ message: "Error toggling like" });
    }
};



export const addComment = async (req, res) => {
    try {

        const user = req.user;
        const { postId } = req.params;
        const { text } = req.body;

        if (!text?.trim()) {
            return res.status(400).json({ message: "Comment cannot be empty" });
        }

        const post = await LocalFeed.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = {
            userId: user._id,
            text: text.trim(),
            createdAt: new Date()
        };

        post.comments.push(newComment);

        post.commentsCount = post.comments.length;

        await post.save();

        res.status(201).json({
            message: "Comment added successfully",
            comment: newComment,
            commentsCount: post.commentsCount
        });

    } catch (error) {
        res.status(500).json({ message: "Error adding comment" });
    }
};