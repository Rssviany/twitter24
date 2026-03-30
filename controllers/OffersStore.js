import { Offer } from "../models/OfferModel.js"


export const createOffer = async (req, res) => {
  try {
    const { storeId, title, description, image, address, city, validTill } = req.body

    const offer = await Offer.create({
      storeId,
      userId: req.user._id,
      title,
      description,
      image,
      address,
      city,
      validTill
    })

    res.status(201).json({
      success: true,
      offer
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
    console.log(error)
  }
}

export const getAllOffers = async (req, res) => {
  const offers = await Offer.find()
    .populate("storeId")
     .populate("userId")
    .sort({ createdAt: -1 });

  res.json({ success: true, offers });
}

export const getOffersByCity = async (req, res) => {
  try {
    const { city } = req.query; // ✅ FIX

    const offers = await Offer.find({ city })
      .populate("storeId")
      .populate("userId");

    res.json({
      success: true,
      offers
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getMyOffers = async (req, res) => {
  console.log("USER:", req.user);
  const offers = await Offer.find({ userId: req.user._id })
    .populate("userId")
    .populate("storeId");
  console.log("USER:", req.user);

  res.json({ success: true, offers });
}