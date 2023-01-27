export async function createProductObj(product) {
  return new Promise((resolve, reject) => {
    let productObj = {};
    try {
      productObj = {
        'code': product.code ? parseInt(product.code) : product.code,
        'status': product.status,
        'imported_t': product.imported_t,
        'url': product.url,
        'creator': product.creator,
        'created_t': parseInt(product.created_t),
        'last_modified_t': parseInt(product.last_modified_t),
        'product_name': product.product_name,
        'quantity': product.quantity,
        'brands': product.brands,
        'categories': product.categories,
        'labels': product.labels,
        'cities': product.cities,
        'purchase_places': product.purchase_places,
        'stores': product.stores,
        'ingredients_text': product.ingredients_text,
        'traces': product.traces,
        'serving_size': product.serving_size,
        'serving_quantity': product.serving_quantity ? parseFloat(product.serving_quantity) : product.serving_quantity,
        'nutriscore_score': product.nutriscore_score ? parseInt(product.nutriscore_score) : product.nutriscore_score,
        'nutriscore_grade': product.nutriscore_grade,
        'main_category': product.main_category,
        'image_url': product.image_url
      };

    } catch (error) {
      return reject(error);
    }

    return resolve(productObj);
  });
}
