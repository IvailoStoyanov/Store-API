const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).select('name price');
    res.status(200).json({
        products,
        nbHits: products.length,
    });
};

const getAllProducts = async (req, res) => {
    const {
        featured,
        name,
        company,
        sort,
        fields,
        numericFilters,
    } = req.query;

    const queryObject = {};

    // Is Featured Filtering
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    };

    // Company Filtering
    if (company) {
        queryObject.company = company
    };

    // Name Filtering
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }

        const regeEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regeEx, (match) => `-${operatorMap[match]}-`);

        const options = ['price', 'rating'];

        filters = filters.split(',').forEach((item) => {
            const [field,operator,value] = item.split('-');
            
            if (options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)}
            };
        });
    };

    let result = Product.find(queryObject);

    // Sorting
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    // Fields Filtering
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    //Pagination Filtering
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({
        products,
        nbHits: products.length,
    });
};

module.exports = {
    getAllProductsStatic,
    getAllProducts
}