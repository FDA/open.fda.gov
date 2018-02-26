/* @flow */


class DatasetRetrievalService {

   constructor () {
  }


  /*
    {
    "data": {
      "queryJSON": {
        "searchType": "nonLLT",
        "filters": [{
            "0": {
              "key": "set_id",
              "value": ["0000025c-6dbf-4af7-a741-5cbacaed519a"]
            }
          },
          {
            "1": {
              "key": "@drugtype",
              "value": ["human"]
            }
          }, {
            "2": {
              "key": "package_ndc_exact",
              "value": ["15631-0404-4"]
            }
          },
          {
            "3": {
              "key": "manufacturer_name_exact",
              "value": ["Rxhomeo Private Limited d.b.a. Rxhomeo, Inc"]
            }
          },
          {
            "4": {
              "key": "openfda.brand_name_exact",
              "value": ["SILICEA"]
            }
          },
          {
            "5": {
              "key": "generic_name_exact",
              "value": ["SILICEA"]
            }
          }, {
            "6": {
              "key": "product_ndc_exact",
              "value": ["15631-0404"]
            }
          }, {
            "7": {
              "key": "openfda.package_ndc_exact",
              "value": ["15631-0404-4", "15631-0404-0"]
            }
          }, {
            "8": {
              "key": "product_type_exact",
              "value": ["HUMAN OTC DRUG"]
            }
          }
        ]
      }
    }
  }
  */


  convertFiltersToJson(filters){
    return [{1:1},{2:2}]
  }
}

export default DatasetRetrievalService