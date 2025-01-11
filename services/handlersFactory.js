const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
// const { Model } = require('mongoose');

exports.createOne = (Model) => asyncHandler(async (req, res, next) => {
    const newDocument = await Model.create(req.body);
    res.status(200).json({ data: newDocument });
});

exports.getOne = (Model, populationOpt) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (populationOpt) {
        query = query.populate(populationOpt);
    };
    const document = await query
    if (!document) {
        return next(new ApiError(`No getOneDoc for this id${id}`, 404))
    }
    res.status(200).json({ data: document });
});

// exports.getAll = (Model) => asyncHandler(async (req, res, next) => {
//     const document = await Model.find();
//     res.status(200).json({ data: document });
// });
exports.getAll = (Model) => asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObject) {
        filter = req.filterObject
    }
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
        .paginate(documentsCounts)
        .filter()
        .limitFields()
        .sort()
    
    const { mongooseQuery , paginateResult } = apiFeatures;
    const document = await mongooseQuery;
    
    res.status(200).json({result: document.length, paginateResult , data: document});

});
exports.updateUser = (Model) => asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!document) {
        return next(new ApiError(`No Document for this id ${req.params.id}`, 404))
    }
    document.save();
    res.status(200).json({ data: document })
});

exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const {id} = req.params
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
        return next(new ApiError(`No Document for this id ${id}`, 404))
    }
    document.deleteOne() 
    res.status(204).send();
});
