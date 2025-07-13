import {
  ListItemButton,
  ListItemText,
  Typography,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { IProfessional } from '../../interfaces/Professional';
import { literalPosition } from '../../utils/TypeEnums';

interface IAvatarText {
  user: IProfessional;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function AvatarText({ user, onClick }: IAvatarText) {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClick && onClick(event);
  };

  return (
    <ListItemButton alignItems="flex-start" onClick={handleClick}>
      <ListItemText
        primary={user.name}
        secondary={
          <Typography
            variant="body2"
            color="inherit"
            sx={{ textAlign: 'right' }}
          >
            {literalPosition(user.position)}
          </Typography>
        }
      />
      <ListItemAvatar>
        <Avatar
          sx={{ marginLeft: 2 }}
          alt={user.name || user.email}
          src={user.image}
        />
      </ListItemAvatar>
    </ListItemButton>
  );
}
