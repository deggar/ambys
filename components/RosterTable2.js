import { HotkeysProvider } from '@blueprintjs/core';
import { Column, Table2, Cell } from '@blueprintjs/table';
import { SelectionModes } from '@blueprintjs/table';

import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';

function RosterTable({ Roster, setRoster, Groups }) {
  const columns = [
    { key: 'Group', name: 'Group', width: '3rem' },
    { key: 'ID', name: 'ID', width: '4rem' },
    { key: 'Crate', name: 'Crate', width: '4rem' },
    // { key: 'Qty', name: 'Qty', width: '3rem' },
    // { key: 'Species', name: 'Species', width: '4rem' },
    // { key: 'Strain', name: 'Strain', width: '4rem' },
    { key: 'CageID', name: 'CageID', width: '4rem' },
    { key: 'EarID', name: 'EarID', width: '2rem' },
    { key: 'RFID', name: 'RFID', width: '6rem' },
    { key: 'EnvigoID', name: 'EnvigoID', width: '6rem' },
    { key: 'Sex', name: 'Sex', width: '4rem' },
    { key: 'BirthDate', name: 'Birth Date', width: '5rem' },
    { key: 'Dame', name: 'Dame', width: '6rem' },
    { key: 'Sire', name: 'Sire', width: '6rem' },
    { key: 'Genotype', name: 'Genotype', width: '8rem' },
    { key: 'BW', name: 'BW', width: '3rem' },
    { key: 'CloudyEyes', name: 'Cloudy', width: '3rem' }
  ];

  const colhead = columns.map((col) => {
    // console.log(col);
    return (
      <div style={{ flexBasis: `${col.width}` }} key={col.key}>
        {col.name}
      </div>
    );
  });

  // console.log('colhead', colhead);

  const data = Roster;
  const groupList = [...new Set(data.map((item) => item.Group))];
  console.log(groupList);

  const dataLine = Roster.map(function (line) {
    const lineset = columns.map((col) => {
      return <div key={col.key + line.ID}>{line[col.key]}</div>;
    });
    return lineset;
  });

  // console.log('dataLine', dataLine);

  const getItemStyle = (isDragging, draggableStyle, gender) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    // background: isDragging ? 'lightgreen' : 'white',
    background: isDragging
      ? 'lightblue'
      : gender == 'Female'
      ? 'pink'
      : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey'
  });

  var drid = '';
  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <div className="rosterhead" key="colhead">
        {colhead}
      </div>

      <DragDropContext>
        {groupList.map(function (group) {
          console.log('group', group);
          let groupedRoster = Roster.filter(function (line) {
            return line.Group == group;
          });
          console.log(groupedRoster);
          drid = group;
          console.log('drid', drid);
          let groupIs = Groups.filter(function (line) {
            return line.prefix == drid;
          });
          console.log('groupIs', groupIs);
          return (
            <div key={drid}>
              <div className="groupNameHead">
                Group <span>{drid}</span>
                <div className="inline text-sm pl-3">
                  {groupIs[0].description}
                </div>
              </div>
              <Droppable droppableId={drid}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {groupedRoster.map(function (line, index) {
                      {
                        /* console.log('line.ID', line.ID); */
                      }
                      const lineset = columns.map((col) => {
                        return (
                          <div
                            style={{ flexBasis: `${col.width}` }}
                            key={col.key + line.ID}
                          >
                            {line[col.key]}
                          </div>
                        );
                      });
                      return (
                        <Draggable
                          key={'dt' + line.RFID}
                          draggableId={'dr' + line.RFID}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="rosterline"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                line.Sex
                              )}
                            >
                              {lineset}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              ;
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default RosterTable;
