import React, {useRef} from 'react';
import PropTypes from 'prop-types';

type tPROPS = {
  labels: string[];
  rows: any;
  cols: string[];
  formatters?: { [key: string]: (cell: any, row: any) => any };
};

const Table = (props:tPROPS) => {

    class HtmlTable extends React.Component {
        rows: any[];
        cols: string[];
        labels: any;
        formatters: { [key: string]: (cell: any, row: any) => any };
        containerRef: React.RefObject<HTMLTableSectionElement | null>;

        constructor(props:tPROPS) {
            super(props);
            this.rows = props.rows;
            this.cols = props.cols;
            this.labels = (props as any).labels ? (props as any).labels : props.cols;
            this.formatters = (props as any).formatters || {};
            this.containerRef = React.createRef<HTMLTableSectionElement>();
        }

        componentDidMount(): void {
            this.containerRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }

        format(cell: any, row: any, col: string | number, rowIndex: any, colIndex: any) {
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

                        this.labels.map((cell: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, j: number) =>  <th key={'c' + j}>{cell}</th>)
                    }
                </tr>
            );

            var body = this.rows.map((row: { [x: string]: any; }, i: React.Key | null | undefined) => {
                return (
                  <tr key={i}>
                      {
                          this.cols.map((col: string | number, j: React.Key | null | undefined) =>
                              <td key={j}>{this.format(row[col], row , col, i, j)}</td>)
                      }
                  </tr>
                );
            });

            return (
                <div ref={this.containerRef} className="table-responsive">
            <table className="table">
                <thead>
                    {head}
                </thead>
                <tbody ref={this.containerRef}>
                    {body}
                </tbody>
            </table>
            </div>
            );
        }
    }

    return <HtmlTable {...props} />;
}

Table.displayName = 'component/Table';
export default Table;
