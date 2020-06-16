const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/delilahresto');

var product;
var product_id;

function DoesProductExist(req,res,next){
    product_id = req.params.product_id;
    const SelectQuery = 'SELECT * FROM products'

    sequelize.query(SelectQuery,{type:sequelize.QueryTypes.SELECT})
        .then((response)=>{
            const products_list = response;
            console.log(products_list)
            product = products_list.find( (element) => element.product_id === Number(product_id));
            console.log(product)

            if (!product){
                return res.status(404).send('Product was not found')
            }else{
                next();
            }
            
        }).catch((e)=>console.log(e));
}

module.exports = {DoesProductExist}