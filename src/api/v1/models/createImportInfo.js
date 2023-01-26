export async function createImportInfo(importInfo) {
  return new Promise((resolve) => {
    const productObj = {
      'imported_t': importInfo.imported_t
    };

    return resolve(productObj);

  });
}
