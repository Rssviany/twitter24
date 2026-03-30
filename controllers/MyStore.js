import Store from "../models/MyStoreModel.js";


export const createStore = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            location,
            images,
            services,
            followers,
            comments,
            reviews,
            likes,
            timings, workingDays, phone, address, distance
        } = req.body;

        const store = new Store({
            name,
            description,
            category,
            location,
            images,
            services,
            followers,
            owner: req.user.id,
            timings, workingDays, phone, address, distance,

            // ✅ USE GIVEN DATA OR FALLBACK DEFAULT
            comments: comments || [
                {
                    user: req.user.id,
                    text: "Nice store 🔥",
                },
            ],

            reviews: reviews || [
                {
                    user: req.user.id,
                    rating: 5,
                    comment: "Excellent store!",
                },
            ],

            likes: likes || [req.user.id],
        });

        // ✅ calculate rating
        store.numReviews = store.reviews.length;
        store.averageRating = Number((
            store.reviews.reduce((acc, item) => acc + item.rating, 0) /
            store.reviews.length).toFixed(1));

        await store.save();

        res.status(201).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// export const createStore = async (req, res) => {
//     try {
//         const { name, description, category, location, images } = req.body;

//         const store = new Store({
//             name,
//             description,
//             category,
//             location,
//             images,
//             owner: req.user.id,
//         });

//         await store.save();

//         res.status(201).json({
//             success: true,
//             message: "Store created",
//             store,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// GET ALL STORES
export const getStores = async (req, res) => {
    try {
        const stores = await Store.find()
            .populate("owner", "name email")
            .sort({ createdAt: -1 });

        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE STORE
export const getStoreById = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id)
            .populate("owner", "name email")
            .populate("comments.user", "name")
            .populate("reviews.user", "name");

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        res.json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADD COMMENT
export const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        const store = await Store.findById(req.params.id);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        const comment = {
            user: req.user.id,
            text,
        };

        store.comments.push(comment);

        await store.save();

        res.json({
            success: true,
            message: "Comment added",
            comments: store.comments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADD REVIEW
export const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const store = await Store.findById(req.params.id);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        const alreadyReviewed = store.reviews.find(
            (r) => r.user.toString() === req.user.id
        );

        if (alreadyReviewed) {
            return res.status(400).json({ message: "Already reviewed" });
        }

        const review = {
            user: req.user.id,
            rating: Number(rating),
            comment,
        };

        store.reviews.push(review);

        store.numReviews = store.reviews.length;

        store.averageRating =
            store.reviews.reduce((acc, item) => item.rating + acc, 0) /
            store.reviews.length;

        await store.save();

        res.json({
            success: true,
            message: "Review added",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LIKE / UNLIKE STORE
export const toggleLikeStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        const alreadyLiked = store.likes.includes(req.user.id);

        if (alreadyLiked) {
            // UNLIKE
            store.likes = store.likes.filter(
                (id) => id.toString() !== req.user.id
            );
        } else {
            // LIKE
            store.likes.push(req.user.id);
        }

        await store.save();

        res.json({
            success: true,
            likes: store.likes.length,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};