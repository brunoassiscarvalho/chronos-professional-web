import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

import { useState, Children, createElement, useEffect } from 'react';

export default function SmartFormArray({
  children,
  defaultValues,
  name,
  change,
}: any) {
  const valuesWithHash = defaultValues?.map((item: any) => {
    return { ...item, hashId: Math.random().toString(36).slice(-8) };
  });
  return (
    <SmartFormArrayItem
      defaultValues={valuesWithHash}
      name={name}
      change={change}
    >
      {children}
    </SmartFormArrayItem>
  );
}

function SmartFormArrayItem({ children, defaultValues, name, moveble }: any) {
  const [arrayItems, setArrayItems] = useState<any[]>(defaultValues || []);

  function moveElement(array: any[], initialIndex: number, finalIndex: number) {
    array.splice(finalIndex, 0, array.splice(initialIndex, 1)[0]);
    return array;
  }

  function moveUp(indexRow: number) {
    const newArray = [...arrayItems];
    const moved = moveElement(newArray, indexRow, indexRow - 1);
    setArrayItems(moved);
  }

  function moveDown(indexRow: number) {
    const newArray = [...arrayItems];
    const moved = moveElement(newArray, indexRow, indexRow + 1);
    setArrayItems(moved);
  }

  function deleteItem(indexRow: number) {
    console.log(indexRow);
    if (arrayItems.length === 1) {
      setArrayItems([]);
    } else {
      const newArray = [...arrayItems];
      const removed = newArray.splice(indexRow, 1);
      setArrayItems(removed);
    }
  }

  return (
    <>
      {arrayItems ? (
        arrayItems.map((item, indexRow: number) => (
          <Box key={item.hashId}>
            {Children.map(children, (child) => {
              console.log({
                ...child.props,
                defaultValue: item[child.props.name],
                ...(name &&
                  child.props.error &&
                  child.props.error[name] &&
                  child.props.error[name][indexRow] && {
                  error: child.props.error[name][indexRow],
                }),
                name: `${name}-${indexRow}-${child.props.name}`,
              });
              return createElement(child.type, {
                ...child.props,
                defaultValue: item[child.props.name],
                ...(name &&
                  child.props.error &&
                  child.props.error[name] &&
                  child.props.error[name][indexRow] && {
                  error: child.props.error[name][indexRow],
                }),
                name: `${name}-${indexRow}-${child.props.name}`,
              });
            })}
            {!!moveble && (
              <>
                {!!indexRow && (
                  <Button onClick={() => moveUp(indexRow)}>
                    <ArrowUpward />
                  </Button>
                )}

                {indexRow !== arrayItems.length - 1 && (
                  <Button>
                    <ArrowDownward onClick={() => moveDown(indexRow)} />
                  </Button>
                )}
              </>
            )}
            <Button>
              <Delete onClick={() => deleteItem(indexRow)} />
            </Button>
          </Box>
        ))
      ) : (
        <></>
      )}
      <Button
        onClick={() =>
          setArrayItems((oldList) => {
            oldList.push({ hashId: Math.random().toString(36).slice(-8) });
            return [...oldList];
          })
        }
      >
        Mais
      </Button>
    </>
  );
}
