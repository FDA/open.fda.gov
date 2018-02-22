/* @flow */

import React from 'react'

import { default as ReactTable } from "react-table"

import createClass from 'create-react-class'
import PropTypes from 'prop-types'
import Select from 'react-select'


const stringOrNode = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node,
]);

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
        <input type="checkbox" checked={this.props.option.isSelected}/>
        {"  "}{ this.props.option.label }
      </div>
    );
  }
});

const GravatarValue = createClass({
  propTypes: {
    children: PropTypes.node,
    placeholder: stringOrNode,
    value: PropTypes.object,
    ref: PropTypes.any
  },
  render () {
    var gravatarStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
    return (
      <div className="Select-value" title={this.props.value.title}>
        <span className="Select-value-label select-label">
            Select <i className="select-placeholder">{this.props.placeholder}</i> to Compare
        </span>
      </div>
    );
  }
});


class ResultsComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    const shownColumnsCount = this.props.dataset.columns.filter(c => c.show).length

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
      placeholder: `Manage Columns ${shownColumnsCount}/${this.props.dataset.columns.length}`,
      choosenColumn: ""
    }
  }

  onColumnToggle(){

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
           <Select
              name="toggle"
              optionComponent={GravatarOption}
              value={this.state.choosenColumn}
              menuStyle={{
                maxHeight: 130
              }}
              style={{
                width: 300
              }}
              options={this.props.dataset.columns}
              onChange={this.onColumnToggle}
              placeholder={this.state.placeholder}
              resetValue="label"
              ref={(ref)=>{this.DOMNode = ref}}
              removeSelected={false}
              valueComponent={GravatarValue}
              clearable={false}
              closeOnSelect={false}
              placeholder={this.state.placeholder}
            />
        </div>
        <ReactTable
          data={this.state._rows}
          columns={this.props.dataset.columns}
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
      <div style={{height:500}}>
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



