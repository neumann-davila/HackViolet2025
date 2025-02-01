import React from "react";

type Classroom = {
  _id: string;
  className: string;
  rows: number;
  columns: number;
  eliminatedColumns: number[];
  eliminatedRows: number[];
  eliminatedSeats: [number, number][];
};

type ClassroomLayoutProps = {
  classroom: Classroom;
};

const ClassroomLayout: React.FC<ClassroomLayoutProps> = ({ classroom }) => {
  const { rows, columns, eliminatedColumns, eliminatedRows, eliminatedSeats } = classroom;

  const isSeatEliminated = (row: number, col: number) => {
    // Check if the seat is in the eliminatedSeats array
    return eliminatedSeats.some(([r, c]) => r === row && c === col);
  };

  const isRowEliminated = (row: number) => {
    return eliminatedRows.includes(row);
  };

  const isColumnEliminated = (col: number) => {
    return eliminatedColumns.includes(col);
  };

  const renderSeat = (row: number, col: number) => {
    if (!isSeatEliminated(row, col) && !isRowEliminated(row) && !isColumnEliminated(col)) {
        return <div key={`${row}-${col}`} className="seat"></div>;
    }
  };

  return (
    <div className="classroom-layout">
      <h2>Layout</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 50px)`,
          gap: "10px",
        }}
      >
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: columns }).map((_, col) => renderSeat(row + 1, col + 1))
        )}
      </div>
    </div>
  );
};

export default ClassroomLayout;