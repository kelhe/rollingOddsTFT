import React from "react";

function Result({ probArr }) {
  if (probArr[1]) {
    const percentages = probArr[1];
    let rows = percentages.map((percent, idx) => {
        return (
          <tr>
            <td>{idx + 1} {idx === 1 ? "unit" : "units"}</td>
            <td>{Math.round(percent * 100)}%</td>
          </tr>
        );
      }
    );
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th colspan="2">Your odds for</th>
            </tr>
          </thead>
          <tbody>{rows} </tbody>
        </table>
      </div>
    );
  }
}

export default Result;
