import React from 'react'
import PropTypes from 'prop-types'

type InfographicLegendProps = {
  ranges: { color: string; name: React.ReactNode }[];
  styles: React.CSSProperties;
  title: string;
};

const InfographicLegend: React.FC<InfographicLegendProps> = ({ ranges, styles, title }) => {
  const getStyle = (color: string) => ({ backgroundColor: color });

  return (
    <div style={styles}>
      <p className='infographic-legend-title'> {title}</p>
      <table className='infographic-legend-table'>
        <tbody>
          {ranges.map((obj, index) => (
            <tr key={index}>
              <td>
                <span className='infographic-legend-tr' style={getStyle(obj.color)}>{' '}</span>{'  '}{obj.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export {InfographicLegend}
