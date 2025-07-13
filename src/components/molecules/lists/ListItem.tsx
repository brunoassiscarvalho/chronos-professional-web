import { ChevronRight } from '@mui/icons-material';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem as MUIListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Divider,
} from '@mui/material';
import { ReactElement } from 'react';

interface IAvatarItem {
  alt: string;
  src: string;
}

interface IItemContent {
  icon?: ReactElement;
  primaryText: string;
  secondaryText?: string;
  avatar?: IAvatarItem;
}

interface IListItem extends IItemContent {
  onClick?: (element: any) => void;
}

const ItemContent = ({
  icon,
  primaryText,
  secondaryText,
  avatar,
}: IItemContent) => {
  return (
    <Box display="flex" alignItems="center">
      {avatar && (
        <ListItemAvatar>
          <Avatar {...avatar} />
        </ListItemAvatar>
      )}
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      {(primaryText || secondaryText) && (
        <ListItemText primary={primaryText} secondary={secondaryText} />
      )}
    </Box>
  );
};

export default function ListItem({
  icon,
  primaryText,
  secondaryText,
  avatar,
  onClick,
}: IListItem) {
  return (
    <>
      {!onClick ? (
        <MUIListItem>
          <ItemContent
            icon={icon}
            primaryText={primaryText}
            secondaryText={secondaryText}
          />
        </MUIListItem>
      ) : (
        <ListItemButton onClick={onClick}>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <ItemContent
              icon={icon}
              primaryText={primaryText}
              secondaryText={secondaryText}
              avatar={avatar}
            />
            <ChevronRight />
          </Box>
        </ListItemButton>
      )}
      <Divider />
    </>
  );
}
