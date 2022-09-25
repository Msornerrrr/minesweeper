import Map from '../models/map.js';
import NotFoundError from '../errors/not-found.js';

const getAllMap = async (req, res) => {
    const {rating, difficulty, sort} = req.query;
    let data = Map.find({});
    let numDoc = Map.countDocuments();

    // limit to the data on certain page
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const offset = limit * (page - 1);
    data = data.skip(offset).limit(limit);
    
    const maps = await data;
    const length = await numDoc;
    res.status(200).json({maps, length});
};

const createMap = async (req, res) => {
    const map = await Map.create(req.body);
    res.status(201).json(map);
};

const deleteMap = async (req, res) => {
    const map = await Map.findByIdAndDelete(req.params.id);
    if(!map) throw NotFoundError(`No map with id ${req.params.id}`);
    res.status(200).send();
};

export {
    getAllMap,
    createMap,
    deleteMap
}