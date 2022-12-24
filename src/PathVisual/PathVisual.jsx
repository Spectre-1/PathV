import React, { Component } from 'react';
import Grid from './Grid/Grid';

import './PathVisual.css';

const StartNodeRow = 10;
const StartNodeCol = 15;
const FinishNodeRow = 10;
const FinishNodeCol = 35;

export default class PathfindingVisualizer extends Component {
    constructor() {
      super();
      this.state = {
        grid: [],
        mouseIsPressed: false,
      };
    }

    getInitialGrid() {
        const grid = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
            }
            grid.push(currentRow);
        }
        return grid;
        }
    
    createNode(col, row) {
        return {
          col,
          row,
          isStart: row === StartNodeRow && col === StartNodeCol,
          isFinish: row === FinishNodeRow && col === FinishNodeCol,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
        };
      }

    componentDidMount() {
      const grid = getInitialGrid();
      this.setState({ grid });
    }


}