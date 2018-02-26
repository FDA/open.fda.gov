/* @flow */

import React from 'react'

import { default as ReactTable } from "react-table"

import createClass from 'create-react-class'
import Select from 'react-select'
import FileSaver from 'file-saver'
import Json2csvParser from 'json2csv'


const GravatarOption = createClass({
  propTypes: {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
  },
  handleMouseDown (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  },
  handleMouseEnter (event) {
    this.props.onFocus(this.props.option, event);
  },
  handleMouseMove (event) {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  },
  render () {
    let gravatarStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
    return (
      <div className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.title}>
        <input type="checkbox" checked={this.props.option.show}/>
        {"  "}{ this.props.option['Header'] }
      </div>
    );
  }
});



class ResultsComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    let columns = this.props.dataset.columns
    const shownColumnsCount = columns.filter(c => c.show).length
    columns = columns.map((d,idx) => {
      d.idx = idx
      return d
    })

    this.state = {
      _rows: [
        {
          "effective_time": "30151102",
          "inactive_ingredient": [
            "INACTIVE INGREDIENTS Sucrose"
          ],
          "purpose": [
            "USES Boils, Abscess, Otitis"
          ],
          "keep_out_of_reach_of_children": [
            "Keep this and all medication out of reach of children"
          ],
          "warnings": [
            "WARNINGS This product is to be used for self-limiting conditions If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional. As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product. Keep this and all medication out of reach of children Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "questions": [
            "QUESTIONS OR COMMENTS www.Rxhomeo.com | 1.888.2796642 | info@rxhomeo.com Rxhomeo, Inc 9415 Burnet Road, Suite 312, Austin, TX 78758"
          ],
          "spl_product_data_elements": [
            "SILICEA SILICEA SILICON DIOXIDE COLLOIDAL SILICON DIOXIDE SUCROSE"
          ],
          "openfda": {
            "spl_id": [
              "8e9683a0-5608-4cf6-8cdc-13cfc199498f"
            ],
            "product_ndc": [
              "15631-0404"
            ],
            "substance_name": [
              "SILICON DIOXIDE"
            ],
            "product_type": [
              "HUMAN OTC DRUG"
            ],
            "route": [
              "ORAL"
            ],
            "is_original_packager": [
              true
            ],
            "package_ndc": [
              "15631-0404-4",
              "15631-0404-5",
              "15631-0404-2",
              "15631-0404-3",
              "15631-0404-0",
              "15631-0404-1"
            ],
            "generic_name": [
              "SILICEA"
            ],
            "spl_set_id": [
              "0000025c-6dbf-4af7-a741-5cbacaed519a"
            ],
            "brand_name": [
              "SILICEA"
            ],
            "manufacturer_name": [
              "Rxhomeo Private Limited d.b.a. Rxhomeo, Inc"
            ],
            "unii": [
              "ETJ7Z6XBU4"
            ]
          },
          "version": "1",
          "dosage_and_administration": [
            "DOSAGE Adults- Take 4 or 6 Pellets by mouth, three times daily or as suggested by physician. Children 2 years and older- take 1/2 the adult dose."
          ],
          "pregnancy_or_breast_feeding": [
            "As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product."
          ],
          "stop_use": [
            "If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional."
          ],
          "storage_and_handling": [
            "STORAGE Store in a cool dark place"
          ],
          "do_not_use": [
            "Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "package_label_principal_display_panel": [
            "image description"
          ],
          "indications_and_usage": [
            "INDICATIONS Condition listed above or as directed by the physician"
          ],
          "@drugtype": "human",
          "set_id": "0000025c-6dbf-4af7-a741-5cbacaed519a",
          "id": "8e9683a0-5608-4cf6-8cdc-13cfc199498f",
          "active_ingredient": [
            "ACTIVE INGREDIENT SILICEA HPUS 2X and higher"
          ]
        },
                {
          "effective_time": "40151102",
          "inactive_ingredient": [
            "INACTIVE INGREDIENTS Sucrose"
          ],
          "purpose": [
            "USES Boils, Abscess, Otitis"
          ],
          "keep_out_of_reach_of_children": [
            "Keep this and all medication out of reach of children"
          ],
          "warnings": [
            "WARNINGS This product is to be used for self-limiting conditions If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional. As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product. Keep this and all medication out of reach of children Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "questions": [
            "QUESTIONS OR COMMENTS www.Rxhomeo.com | 1.888.2796642 | info@rxhomeo.com Rxhomeo, Inc 9415 Burnet Road, Suite 312, Austin, TX 78758"
          ],
          "spl_product_data_elements": [
            "SILICEA SILICEA SILICON DIOXIDE COLLOIDAL SILICON DIOXIDE SUCROSE"
          ],
          "openfda": {
            "spl_id": [
              "8e9683a0-5608-4cf6-8cdc-13cfc199498f"
            ],
            "product_ndc": [
              "15631-0404"
            ],
            "substance_name": [
              "SILICON DIOXIDE"
            ],
            "product_type": [
              "HUMAN OTC DRUG"
            ],
            "route": [
              "ORAL"
            ],
            "is_original_packager": [
              true
            ],
            "package_ndc": [
              "15631-0404-4",
              "15631-0404-5",
              "15631-0404-2",
              "15631-0404-3",
              "15631-0404-0",
              "15631-0404-1"
            ],
            "generic_name": [
              "SILICEA"
            ],
            "spl_set_id": [
              "0000025c-6dbf-4af7-a741-5cbacaed519a"
            ],
            "brand_name": [
              "SILICEA"
            ],
            "manufacturer_name": [
              "Rxhomeo Private Limited d.b.a. Rxhomeo, Inc"
            ],
            "unii": [
              "ETJ7Z6XBU4"
            ]
          },
          "version": "1",
          "dosage_and_administration": [
            "DOSAGE Adults- Take 4 or 6 Pellets by mouth, three times daily or as suggested by physician. Children 2 years and older- take 1/2 the adult dose."
          ],
          "pregnancy_or_breast_feeding": [
            "As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product."
          ],
          "stop_use": [
            "If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional."
          ],
          "storage_and_handling": [
            "STORAGE Store in a cool dark place"
          ],
          "do_not_use": [
            "Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "package_label_principal_display_panel": [
            "image description"
          ],
          "indications_and_usage": [
            "INDICATIONS Condition listed above or as directed by the physician"
          ],
          "@drugtype": "human",
          "set_id": "0000025c-6dbf-4af7-a741-5cbacaed519a",
          "id": "8e9683a0-5608-4cf6-8cdc-13cfc199498f",
          "active_ingredient": [
            "ACTIVE INGREDIENT SILICEA HPUS 2X and higher"
          ]
        },
                {
          "effective_time": "50151102",
          "inactive_ingredient": [
            "INACTIVE INGREDIENTS Sucrose"
          ],
          "purpose": [
            "USES Boils, Abscess, Otitis"
          ],
          "keep_out_of_reach_of_children": [
            "Keep this and all medication out of reach of children"
          ],
          "warnings": [
            "WARNINGS This product is to be used for self-limiting conditions If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional. As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product. Keep this and all medication out of reach of children Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "questions": [
            "QUESTIONS OR COMMENTS www.Rxhomeo.com | 1.888.2796642 | info@rxhomeo.com Rxhomeo, Inc 9415 Burnet Road, Suite 312, Austin, TX 78758"
          ],
          "spl_product_data_elements": [
            "SILICEA SILICEA SILICON DIOXIDE COLLOIDAL SILICON DIOXIDE SUCROSE"
          ],
          "openfda": {
            "spl_id": [
              "8e9683a0-5608-4cf6-8cdc-13cfc199498f"
            ],
            "product_ndc": [
              "15631-0404"
            ],
            "substance_name": [
              "SILICON DIOXIDE"
            ],
            "product_type": [
              "HUMAN OTC DRUG"
            ],
            "route": [
              "ORAL"
            ],
            "is_original_packager": [
              true
            ],
            "package_ndc": [
              "15631-0404-4",
              "15631-0404-5",
              "15631-0404-2",
              "15631-0404-3",
              "15631-0404-0",
              "15631-0404-1"
            ],
            "generic_name": [
              "SILICEA"
            ],
            "spl_set_id": [
              "0000025c-6dbf-4af7-a741-5cbacaed519a"
            ],
            "brand_name": [
              "SILICEA"
            ],
            "manufacturer_name": [
              "Rxhomeo Private Limited d.b.a. Rxhomeo, Inc"
            ],
            "unii": [
              "ETJ7Z6XBU4"
            ]
          },
          "version": "1",
          "dosage_and_administration": [
            "DOSAGE Adults- Take 4 or 6 Pellets by mouth, three times daily or as suggested by physician. Children 2 years and older- take 1/2 the adult dose."
          ],
          "pregnancy_or_breast_feeding": [
            "As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product."
          ],
          "stop_use": [
            "If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional."
          ],
          "storage_and_handling": [
            "STORAGE Store in a cool dark place"
          ],
          "do_not_use": [
            "Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "package_label_principal_display_panel": [
            "image description"
          ],
          "indications_and_usage": [
            "INDICATIONS Condition listed above or as directed by the physician"
          ],
          "@drugtype": "human",
          "set_id": "0000025c-6dbf-4af7-a741-5cbacaed519a",
          "id": "8e9683a0-5608-4cf6-8cdc-13cfc199498f",
          "active_ingredient": [
            "ACTIVE INGREDIENT SILICEA HPUS 2X and higher"
          ]
        },
                {
          "effective_time": "60151102",
          "inactive_ingredient": [
            "INACTIVE INGREDIENTS Sucrose"
          ],
          "purpose": [
            "USES Boils, Abscess, Otitis"
          ],
          "keep_out_of_reach_of_children": [
            "Keep this and all medication out of reach of children"
          ],
          "warnings": [
            "WARNINGS This product is to be used for self-limiting conditions If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional. As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product. Keep this and all medication out of reach of children Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "questions": [
            "QUESTIONS OR COMMENTS www.Rxhomeo.com | 1.888.2796642 | info@rxhomeo.com Rxhomeo, Inc 9415 Burnet Road, Suite 312, Austin, TX 78758"
          ],
          "spl_product_data_elements": [
            "SILICEA SILICEA SILICON DIOXIDE COLLOIDAL SILICON DIOXIDE SUCROSE"
          ],
          "openfda": {
            "spl_id": [
              "8e9683a0-5608-4cf6-8cdc-13cfc199498f"
            ],
            "product_ndc": [
              "15631-0404"
            ],
            "substance_name": [
              "SILICON DIOXIDE"
            ],
            "product_type": [
              "HUMAN OTC DRUG"
            ],
            "route": [
              "ORAL"
            ],
            "is_original_packager": [
              true
            ],
            "package_ndc": [
              "15631-0404-4",
              "15631-0404-5",
              "15631-0404-2",
              "15631-0404-3",
              "15631-0404-0",
              "15631-0404-1"
            ],
            "generic_name": [
              "SILICEA"
            ],
            "spl_set_id": [
              "0000025c-6dbf-4af7-a741-5cbacaed519a"
            ],
            "brand_name": [
              "SILICEA"
            ],
            "manufacturer_name": [
              "Rxhomeo Private Limited d.b.a. Rxhomeo, Inc"
            ],
            "unii": [
              "ETJ7Z6XBU4"
            ]
          },
          "version": "1",
          "dosage_and_administration": [
            "DOSAGE Adults- Take 4 or 6 Pellets by mouth, three times daily or as suggested by physician. Children 2 years and older- take 1/2 the adult dose."
          ],
          "pregnancy_or_breast_feeding": [
            "As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product."
          ],
          "stop_use": [
            "If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional."
          ],
          "storage_and_handling": [
            "STORAGE Store in a cool dark place"
          ],
          "do_not_use": [
            "Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "package_label_principal_display_panel": [
            "image description"
          ],
          "indications_and_usage": [
            "INDICATIONS Condition listed above or as directed by the physician"
          ],
          "@drugtype": "human",
          "set_id": "0000025c-6dbf-4af7-a741-5cbacaed519a",
          "id": "8e9683a0-5608-4cf6-8cdc-13cfc199498f",
          "active_ingredient": [
            "ACTIVE INGREDIENT SILICEA HPUS 2X and higher"
          ]
        },
        {
          "effective_time": "70151102",
          "inactive_ingredient": [
            "INACTIVE INGREDIENTS Sucrose"
          ],
          "purpose": [
            "USES Boils, Abscess, Otitis"
          ],
          "keep_out_of_reach_of_children": [
            "Keep this and all medication out of reach of children"
          ],
          "warnings": [
            "WARNINGS This product is to be used for self-limiting conditions If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional. As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product. Keep this and all medication out of reach of children Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "questions": [
            "QUESTIONS OR COMMENTS www.Rxhomeo.com | 1.888.2796642 | info@rxhomeo.com Rxhomeo, Inc 9415 Burnet Road, Suite 312, Austin, TX 78758"
          ],
          "spl_product_data_elements": [
            "SILICEA SILICEA SILICON DIOXIDE COLLOIDAL SILICON DIOXIDE SUCROSE"
          ],
          "openfda": {
            "spl_id": [
              "8e9683a0-5608-4cf6-8cdc-13cfc199498f"
            ],
            "product_ndc": [
              "15631-0404"
            ],
            "substance_name": [
              "SILICON DIOXIDE"
            ],
            "product_type": [
              "HUMAN OTC DRUG"
            ],
            "route": [
              "ORAL"
            ],
            "is_original_packager": [
              true
            ],
            "package_ndc": [
              "15631-0404-4",
              "15631-0404-5",
              "15631-0404-2",
              "15631-0404-3",
              "15631-0404-0",
              "15631-0404-1"
            ],
            "generic_name": [
              "SILICEA"
            ],
            "spl_set_id": [
              "0000025c-6dbf-4af7-a741-5cbacaed519a"
            ],
            "brand_name": [
              "SILICEA"
            ],
            "manufacturer_name": [
              "Rxhomeo Private Limited d.b.a. Rxhomeo, Inc"
            ],
            "unii": [
              "ETJ7Z6XBU4"
            ]
          },
          "version": "1",
          "dosage_and_administration": [
            "DOSAGE Adults- Take 4 or 6 Pellets by mouth, three times daily or as suggested by physician. Children 2 years and older- take 1/2 the adult dose."
          ],
          "pregnancy_or_breast_feeding": [
            "As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product."
          ],
          "stop_use": [
            "If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional."
          ],
          "storage_and_handling": [
            "STORAGE Store in a cool dark place"
          ],
          "do_not_use": [
            "Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "package_label_principal_display_panel": [
            "image description"
          ],
          "indications_and_usage": [
            "INDICATIONS Condition listed above or as directed by the physician"
          ],
          "@drugtype": "human",
          "set_id": "0000025c-6dbf-4af7-a741-5cbacaed519a",
          "id": "8e9683a0-5608-4cf6-8cdc-13cfc199498f",
          "active_ingredient": [
            "ACTIVE INGREDIENT SILICEA HPUS 2X and higher"
          ]
        },
        {
          "effective_time": "80151102",
          "inactive_ingredient": [
            "INACTIVE INGREDIENTS Sucrose"
          ],
          "purpose": [
            "USES Boils, Abscess, Otitis"
          ],
          "keep_out_of_reach_of_children": [
            "Keep this and all medication out of reach of children"
          ],
          "warnings": [
            "WARNINGS This product is to be used for self-limiting conditions If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional. As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product. Keep this and all medication out of reach of children Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "questions": [
            "QUESTIONS OR COMMENTS www.Rxhomeo.com | 1.888.2796642 | info@rxhomeo.com Rxhomeo, Inc 9415 Burnet Road, Suite 312, Austin, TX 78758"
          ],
          "spl_product_data_elements": [
            "SILICEA SILICEA SILICON DIOXIDE COLLOIDAL SILICON DIOXIDE SUCROSE"
          ],
          "openfda": {
            "spl_id": [
              "8e9683a0-5608-4cf6-8cdc-13cfc199498f"
            ],
            "product_ndc": [
              "15631-0404"
            ],
            "substance_name": [
              "SILICON DIOXIDE"
            ],
            "product_type": [
              "HUMAN OTC DRUG"
            ],
            "route": [
              "ORAL"
            ],
            "is_original_packager": [
              true
            ],
            "package_ndc": [
              "15631-0404-4",
              "15631-0404-5",
              "15631-0404-2",
              "15631-0404-3",
              "15631-0404-0",
              "15631-0404-1"
            ],
            "generic_name": [
              "SILICEA"
            ],
            "spl_set_id": [
              "0000025c-6dbf-4af7-a741-5cbacaed519a"
            ],
            "brand_name": [
              "SILICEA"
            ],
            "manufacturer_name": [
              "Rxhomeo Private Limited d.b.a. Rxhomeo, Inc"
            ],
            "unii": [
              "ETJ7Z6XBU4"
            ]
          },
          "version": "1",
          "dosage_and_administration": [
            "DOSAGE Adults- Take 4 or 6 Pellets by mouth, three times daily or as suggested by physician. Children 2 years and older- take 1/2 the adult dose."
          ],
          "pregnancy_or_breast_feeding": [
            "As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product."
          ],
          "stop_use": [
            "If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional."
          ],
          "storage_and_handling": [
            "STORAGE Store in a cool dark place"
          ],
          "do_not_use": [
            "Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "package_label_principal_display_panel": [
            "image description"
          ],
          "indications_and_usage": [
            "INDICATIONS Condition listed above or as directed by the physician"
          ],
          "@drugtype": "human",
          "set_id": "0000025c-6dbf-4af7-a741-5cbacaed519a",
          "id": "8e9683a0-5608-4cf6-8cdc-13cfc199498f",
          "active_ingredient": [
            "ACTIVE INGREDIENT SILICEA HPUS 2X and higher"
          ]
        },
                {
          "effective_time": "90151102",
          "inactive_ingredient": [
            "INACTIVE INGREDIENTS Sucrose"
          ],
          "purpose": [
            "USES Boils, Abscess, Otitis"
          ],
          "keep_out_of_reach_of_children": [
            "Keep this and all medication out of reach of children"
          ],
          "warnings": [
            "WARNINGS This product is to be used for self-limiting conditions If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional. As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product. Keep this and all medication out of reach of children Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "questions": [
            "QUESTIONS OR COMMENTS www.Rxhomeo.com | 1.888.2796642 | info@rxhomeo.com Rxhomeo, Inc 9415 Burnet Road, Suite 312, Austin, TX 78758"
          ],
          "spl_product_data_elements": [
            "SILICEA SILICEA SILICON DIOXIDE COLLOIDAL SILICON DIOXIDE SUCROSE"
          ],
          "openfda": {
            "spl_id": [
              "8e9683a0-5608-4cf6-8cdc-13cfc199498f"
            ],
            "product_ndc": [
              "15631-0404"
            ],
            "substance_name": [
              "SILICON DIOXIDE"
            ],
            "product_type": [
              "HUMAN OTC DRUG"
            ],
            "route": [
              "ORAL"
            ],
            "is_original_packager": [
              true
            ],
            "package_ndc": [
              "15631-0404-4",
              "15631-0404-5",
              "15631-0404-2",
              "15631-0404-3",
              "15631-0404-0",
              "15631-0404-1"
            ],
            "generic_name": [
              "SILICEA"
            ],
            "spl_set_id": [
              "0000025c-6dbf-4af7-a741-5cbacaed519a"
            ],
            "brand_name": [
              "SILICEA"
            ],
            "manufacturer_name": [
              "Rxhomeo Private Limited d.b.a. Rxhomeo, Inc"
            ],
            "unii": [
              "ETJ7Z6XBU4"
            ]
          },
          "version": "1",
          "dosage_and_administration": [
            "DOSAGE Adults- Take 4 or 6 Pellets by mouth, three times daily or as suggested by physician. Children 2 years and older- take 1/2 the adult dose."
          ],
          "pregnancy_or_breast_feeding": [
            "As with any drug, if you are pregnant, or nursing a baby, seek professional advice before taking this product."
          ],
          "stop_use": [
            "If symptoms do not improve in 4 days, or worsen, discontinue use and seek assistance of health professional."
          ],
          "storage_and_handling": [
            "STORAGE Store in a cool dark place"
          ],
          "do_not_use": [
            "Do not use if capseal is broken or missing. Close the cap tightly after use."
          ],
          "package_label_principal_display_panel": [
            "image description"
          ],
          "indications_and_usage": [
            "INDICATIONS Condition listed above or as directed by the physician"
          ],
          "@drugtype": "human",
          "set_id": "0000025c-6dbf-4af7-a741-5cbacaed519a",
          "id": "8e9683a0-5608-4cf6-8cdc-13cfc199498f",
          "active_ingredient": [
            "ACTIVE INGREDIENT SILICEA HPUS 2X and higher"
          ]
        }
      ],
      columns: columns, 
      placeholder: `Manage Columns ${shownColumnsCount}/${columns.length}`,
      choosenColumn: "",
      parser: new Json2csvParser.Parser()
    }
    this.onColumnToggle = this.onColumnToggle.bind(this)
    this.onExportChoosen = this.onExportChoosen.bind(this)
  }

  onColumnToggle(selectionObj){

    this.state.columns[selectionObj.idx].show = !selectionObj.show
    const shownColumnsCount = this.state.columns.filter(c => c.show).length

    this.setState({
      columns: [...this.state.columns],
      placeholder: `Manage Columns ${shownColumnsCount}/${this.state.columns.length}`
    })
  }
  onExportChoosen(selectionObj){

    if(selectionObj.label === "CSV"){
      const fields = this.state.columns.filter(c => c.show).map(c => {
        return {
          label: c['Header'],
          value: c.accessor
        }
      })
      const opts = { 
        fields,
        doubleQuote: ""
      };
       
      try {
        const csv = this.state.parser.parse(this.state._rows);
        var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "download.csv");
      } catch (err) {
        console.error(err);
      }
    } else {
      var blob = new Blob(this.state._rows.map(obj => JSON.stringify(obj)), {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, "download.json");
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {

    if(!this || !this.state || !this.state._rows){
      return (<span/>)
    }

    return (
      <div>
        <div style={{
          height: 40,
          display:"flex",
          justifyContent: "space-between",
          paddingTop:10,
          paddingBottom: 43
        }}>
          <p >{this.state._rows.length} results</p>
          <div style={{
            display: "flex"
          }}>
            <Select
              name="toggle"
              optionComponent={GravatarOption}
              menuStyle={{
                maxHeight: 130
              }}
              style={{
                width: 300
              }}
              options={this.state.columns}
              onChange={this.onColumnToggle}
              resetValue="Header"
              ref={(ref)=>{this.DOMNode = ref}}
              removeSelected={false}
              clearable={false}
              closeOnSelect={false}
              placeholder={this.state.placeholder}
            />
            <div style={{paddingLeft: 30}}>
              <Select
                name="toggle"
                menuStyle={{
                  maxHeight: 130
                }}
                style={{
                  width: 80
                }}
                onChange={this.onExportChoosen}
                options={this.props.dataset.exportOptions}
                resetValue="Header"
                ref={(ref)=>{this.DOMNode = ref}}
                removeSelected={false}
                clearable={false}
                closeOnSelect={true}
                placeholder={"Export"}
              />
            </div>
          </div>
        </div>
        <ReactTable
          data={this.state._rows}
          columns={this.state.columns}
          defaultPageSize={this.state._rows.length}
          showPagination={false}
          style={{
            height: "400px",
            width: "100%"
          }}
          className="-striped -highlight"
        />
      </div>
    )
  }
}

class BarChartComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {
    return (
      <div>
      </div>
    )
  }
}

class PieChartComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {
    return (
      <div>
      </div>
    )
  }
}

class SelectedFiltersComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {
    return (
      <div style={{height:100}}>
        <h3>Selected Filters:</h3>
      </div>
    )
  }
}

class DatasetExplorerContentComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {
    return (
      <div style={{
        width: "75%",
        marginLeft: 50
      }}>
        <div>
          <SelectedFiltersComponent/>
        </div>
        <ResultsComponent
          dataset={this.props.dataset}
        />
      </div>
    )
  }
}

export default DatasetExplorerContentComponent



