import React from 'react';
import PropTypes from 'prop-types';

type tPROPS = {
    cols: Array<string>,
    rows: Array<{[key: string]: any}>,
};

const Table = (props:tPROPS) => {

    class HtmlTable extends React.Component<tPROPS> {
        rows: Array<{[key: string]: any}>;
        cols: Array<string>;
        labels: Array<string>;
        formatters: {[key: string]: (cell: any, row: any) => any};

        constructor(props:tPROPS) {
            super(props);
            this.rows = props.rows;
            this.cols = props.cols;
            this.labels = (props as any).labels ? (props as any).labels : props.cols;
            this.formatters = (props as any).formatters || {};
        }
        format(cell: any, row: {[key: string]: any}, col: string, rowIndex: number, colIndex: number) {
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
