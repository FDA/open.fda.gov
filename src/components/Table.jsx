import React from 'react';

type tPROPS = {
    cols : React.PropTypes.array,
    rows: React.PropTypes.array
};

const Table = (props:tPROPS) => {

    class HtmlTable extends React.Component {
        
        constructor(props:tPROPS) {
            super(props);
            this.rows = props.rows;
            this.cols = props.cols;
            this.labels = props.labels ? props.labels : props.cols;
            this.formatters = props.formatters || {};
        }
        format(cell, row, col, rowIndex, colIndex) {
            let formatter = this.formatters[col];
            if(formatter) {
                return formatter(cell, row);
            }
            return cell;
        }
        render() {
            var head = (
                <tr>
                    {

                        this.labels.map((cell, j) =>  <th key={'c' + j}>{cell}</th>)
                    }
                </tr>
            );

            var body = this.rows.map((row, i) => {
                return (
                  <tr key={i}>
                      {
                          this.cols.map((col, j) =>
                              <td key={j}>{this.format(row[col], row , col, i, j)}</td>)
                      }
                  </tr>
                );
            });

            return (<table className="table">
                <thead>
                    {head}
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>);
        }
    }

    return <HtmlTable {...props} />;
}

Table.displayName = 'component/Table';
export default Table;