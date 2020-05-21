const graphql=require('graphql');
const Product = require('../models/product');
const Brand = require('../models/brand');
const Company = require('../models/company');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const ProductType = new GraphQLObjectType( {
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        brand: {
            type: BrandType,
            resolve(parent,args){
                return Brand.findById(parent.brandId);
            }
        }
    })
});

const BrandType = new GraphQLObjectType( {
    name: 'Brand',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent,args){
                return Product.find({brandId:parent.id});
            }
        },
        company: {
            type: CompanyType,
            resolve(parent,args){
                return Company.findById(parent.companyId);
            }
        }
    })
});

const CompanyType = new GraphQLObjectType( {
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        ceo: { type: GraphQLString },
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent,args){
                return Brand.find({companyId:parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType ({
    name:'RootQueryType',
    fields: {
        product: {
            type: ProductType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args) {
                return Product.findById(args.id);
            }
        },
        brand: {
            type: BrandType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args) {
                return Brand.findById(args.id);
            }
        },
        company: {
            type: CompanyType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args) {
                return Company.findById(args.id);
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent,args) {
                return Product.find({});
            }
        },
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent,args) {
                return Brand.find({});
            }
        },
        companies: {
            type: new GraphQLList(CompanyType),
            resolve(parent,args) {
                return Company.find({});
            }
        }

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                name: { type:new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                brandId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent,args) {
                let product = new Product({
                    name: args.name,
                    price: args.price,
                    brandId: args.brandId
                });
                return product.save();
            }
        },
        addBrand: {
            type: BrandType,
            args: {
                name: { type:new GraphQLNonNull(GraphQLString) },
                companyId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent,args) {
                let brand = new Brand({
                    name: args.name,
                    companyId: args.companyId
                });
                return brand.save();
            }
        },
        addCompany: {
            type: CompanyType,
            args: {
                name: { type:new GraphQLNonNull(GraphQLString) },
                ceo: { type:new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent,args) {
                let company = new Company({
                    name: args.name,
                    ceo: args.ceo,
                });
                return company.save();
            }
        }
    }
});

module.exports = new GraphQLSchema( {
    query:RootQuery,
    mutation: Mutation
});