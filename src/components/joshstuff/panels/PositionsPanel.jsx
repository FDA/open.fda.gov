import React from "react";
import {default as ReactTable} from "react-table";

class PositionsPanel extends React.Component {
  constructor (props: Object) {
    super(props)

    this.state = {
      columns: [
        {
          'Header': 'Decade',
          'accessor': 'decade'
        },
        {
          'Header': 'Publication Year',
          'accessor': 'pub_year'
        },
        {
          'Header': 'Historical Document',
          'accessor': 'file_name'
        },
        {
          'Header': 'Adverse Events Mentioned',
          'accessor': 'ae'
        },
      ],
      pageSize: 25,
      positions: [
        {"decade":"1910","pub_year":"1913","file_name":"FDA PRESS RELEASES - 1913.pdf","ae":"cough,death,depression,fall,fever,headache,nausea,overdose,pain"},
        {"decade":"1910","pub_year":"1914","file_name":"FDA PRESS RELEASES - 1914.pdf","ae":"death,diarrhoea,dyspepsia,fall,headache,injury,overdose,pain,shaking,weakness"},
        {"decade":"1910","pub_year":"1915","file_name":"FDA PRESS RELEASES - 1915.pdf","ae":"convulsion,cough,dyspepsia,fall,fever,injury,pain,pneumonia,rash,weight increased"},
        {"decade":"1910","pub_year":"1916","file_name":"FDA PRESS RELEASES - 1916.pdf","ae":"constipation,fall,injury,pain,swelling"},
        {"decade":"1910","pub_year":"1917","file_name":"FDA PRESS RELEASES - 1917.pdf","ae":"cough,death,fall,fever,food poisoning,headache,injury,muscular weakness,nausea,pain,swelling,weakness"},
        {"decade":"1910","pub_year":"1918","file_name":"FDA PRESS RELEASES - 1918.pdf","ae":"rash"},
        {"decade":"1910","pub_year":"1919","file_name":"FDA PRESS RELEASES - 1919.pdf","ae":"death,fall,fever,injury,pain,rash"},
        {"decade":"1920","pub_year":"1920","file_name":"FDA PRESS RELEASES - 1920.pdf","ae":"anxiety,cough,deafness,death,fall,fever,food poisoning,headache,injury,pain,pneumonia,rash"},
        {"decade":"1920","pub_year":"1921","file_name":"FDA PRESS RELEASES - 1921.pdf","ae":"dehydration,food poisoning,injury,pain"},
        {"decade":"1920","pub_year":"1922","file_name":"FDA PRESS RELEASES - 1922.pdf","ae":"death,dizziness,fall,food poisoning,injury,nausea,pain"},
        {"decade":"1920","pub_year":"1923","file_name":"FDA PRESS RELEASES - 1923.pdf","ae":"death,dehydration,dizziness,dyspepsia,fall,fever,flushing,headache,injury,insomnia,nausea,pain,swelling,vomiting"},
        {"decade":"1920","pub_year":"1924","file_name":"FDA PRESS RELEASES - 1924.pdf","ae":"death,depression,fall,fever,injury,no sign,pain,rash"},
        {"decade":"1920","pub_year":"1925","file_name":"FDA PRESS RELEASES - 1925.pdf","ae":"death,dehydration,depression,fall,fever,injury,pain,rash,weakness"},
        {"decade":"1920","pub_year":"1926","file_name":"FDA PRESS RELEASES - 1926.pdf","ae":"depression,fall,injury,pain,swelling"},
        {"decade":"1920","pub_year":"1927","file_name":"FDA PRESS RELEASES - 1927.pdf","ae":"death,fall,food poisoning,injury,pain"},
        {"decade":"1920","pub_year":"1928","file_name":"FDA PRESS RELEASES - 1928.pdf","ae":"fall,food poisoning,injury,nausea,no sign,pain,vomiting"}
      ]
    }
  }


  render() {
    return (
      <ReactTable
        data={this.state.positions}
        columns={this.state.columns}
        pageSize={this.state.pageSize}
        pageSizeOptions={[10, 25, 50, 100, 200, 250, 500, 1000]}
        showPagination={true}
        minRows={10}
        className="table -striped -highlight"
        filtered={this.state.filtered}
        resized={this.state.resized}
        onSortedChange={sorted => this.setState({ sorted })}
        onPageChange={page => this.setState({ page })}
        onPageSizeChange={(pageSize, page) =>
          this.setState({ page, pageSize })}
        onResizedChange={resized => this.setState({ resized })}
        onFilteredChange={filtered => this.setState({ filtered })}
        style={{
          width: '100%',
          height: '494px',
          position: 'relative'
        }}
      />
    )
  }
}

export default PositionsPanel