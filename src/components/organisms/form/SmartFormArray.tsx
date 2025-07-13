import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { useState, Children, createElement, useEffect } from 'react';

export default function SmartFormArray({
  children,
  defaultValues,
  name,
  label,
  change,
  moveble,
  direction,
  errors,
}: any) {
  const valuesWithHash = defaultValues?.map((item: any) => {
    return { ...item, hashId: Math.random().toString(36).slice(-8) };
  });
  return (
    <Box border={1} borderColor={'grey.400'} padding={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid item xs={12}>
          <SmartFormArrayItem
            defaultValues={valuesWithHash}
            name={name}
            change={change}
            moveble={moveble}
            direction={direction}
          >
            {children}
          </SmartFormArrayItem>
        </Grid>
      </Grid>
    </Box>
  );
}

function SmartFormArrayItem({
  children,
  defaultValues,
  name,
  moveble,
  direction = 'column',
}: any) {
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
    if (arrayItems.length === 1) {
      setArrayItems([]);
    } else {
      const newArray = [...arrayItems];
      const removed = newArray.splice(indexRow, 1);
      setArrayItems(removed);
    }
  }

  return (
    <Grid container spacing={3}>
      {arrayItems ? (
        arrayItems.map((item, indexRow: number) => (
          <>
            <Grid item xs={10}>
              <Stack direction={direction} spacing={2}>
                {Children.map(children, (child) =>
                  createElement(child.type, {
                    ...child.props,
                    defaultValue: item[child.props.name],
                    ...(name &&
                      child.props.error &&
                      child.props.error[name] &&
                      child.props.error[name][indexRow] && {
                        error: child.props.error[name][indexRow],
                      }),
                    name: `${name}-${indexRow}-${child.props.name}`,
                  }),
                )}
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Stack
                direction={direction}
                spacing={2}
                justifyContent="flex-end"
              >
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
                <Button color="error">
                  <Delete onClick={() => deleteItem(indexRow)} />
                </Button>
              </Stack>
            </Grid>
          </>
        ))
      ) : (
        <></>
      )}
      <Grid item>
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
      </Grid>
    </Grid>
  );
}
