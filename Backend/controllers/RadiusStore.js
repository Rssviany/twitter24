import express from 'express'
import { Radius } from '../models/RadiusModel.js'


export const getNearbyStores = async (req, res) => {
    try {

        const { lng, lat } = req.query

        const stores = await Radius.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: 3000
                }
            }
        })

        res.json(stores)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

export const getAllStores=async(req,res)=>{
    try {
       const allStores=await Radius.find() 
       res.status(200).json(allStores);
    } catch (error) {
        console.log('getting error while fetching All stores',error);
    }
}

export const createStore = async (req, res) => {
    try {

        const store = await Radius.create(req.body)

        res.json(store)

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err);
    }
}