const Product  = require('../models/product.model')

//READ ALL
// findAllProducts
module.exports.findAllProducts =(req,res) =>{
    Product.find()        //on va avoir un array remplis des objects
    .then(allProducts  => {
        // console.log("All Products From DB", allProducts );
        res.status(200).json({data:allProducts, message:'All Products List', ok: true})
    }  )
    .catch(error => {
        // console.log(error);
        res.status(404).json({error})
    } )  
}
// ==============Count-Numbers-Products==============
module.exports.CountAllProducts =(req,res) =>{
    Product.find().count()        
    .then(count  => {
        
        res.status(200).json({data:count, message:'count products', ok: true})
    }  )
    .catch(error => {
    
        res.status(404).json({error})
    } )  
}

//READ ONE BY ID
// findOneProduct
module.exports.findOneProductById =(req,res) =>{
    Product.findById({_id:req.params.id})        //on peut utiliser findOne ou bien on peut utiliser findOneById mais la 2éme méthode ne sert que pour la recherche par id alors que la 1iere est utilisée dans plusieurs recherches
    .then(oneProduct => {
        // console.log("Product Found", oneProduct);
        if (! oneProduct){
            res.status(404).json({error:"Product Not Found", ok:false})
        }
        else{
            res.status(200).json({data:oneProduct, message:'Product Found', ok: true})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error})
    } )  
}


//CREATE
// createNewProduct
module.exports.createNewProduct = (req, res) => {
    console.log('THIS IS REQ FILE =====>',req.files);
  console.log('THIS IS REQ BODY =====>',req.body);
  let files = req.files;
  let paths = []
  files.forEach((file) => {
      paths.push('/images/'+file.filename)
  })
    Product.create({...req.body,image:paths})
        .then((newlyCreatedProduct) => {
            res.json(newlyCreatedProduct)
        })
        .catch((err) => res.status(400).json(err));
}


//UPDATE  //il faut ajouter la validation pour l'update qui se fait en se basant sur les critéres sitées dans le model
// updateOneProduct
module.exports.updateOneProduct =(req,res) =>{
    Product.findOneAndUpdate({_id:req.params.id}, req.body, {new: true, runValidators:true})  //runValidators: est utilisé pour faire la validation de l'update
    .then(updatedProduct=> {
        // console.log("Product to Update ", updatedProduct);
        // console.log(updatedProduct)
        res.status(200).json({data:updatedProduct, message:'Product updated With Success', ok: true})
    }  )
    .catch(error =>{
        console.log(error);
        res.status(500).json({error})
    })
}


//DELETE
// deleteOneProduct
module.exports.deleteOneProduct =(req,res) =>{
    console.log("Inside Delete", req.params.id);
    Product.findByIdAndDelete({_id:req.params.id})  
    .then(deletedProduct=> {
        // console.log("Product to delete ", deletedProduct);
        res.status(200).json({data:deletedProduct, message:'Product deleted With Success', ok: true})
    }  )
    .catch(error =>{
        console.log(error);
        res.status(500).json({error})
    })
}