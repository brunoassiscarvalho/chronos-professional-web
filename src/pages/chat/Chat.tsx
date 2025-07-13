import { Box } from '@mui/material';
import Content from '../../components/organisms/Content';
import { IProfessionalLogged } from '../../interfaces/Professional';
import { getUser } from '../../utils/Api';

export default function Chat() {
  const { userId, name }: IProfessionalLogged = getUser();

  return (
    <Content title="Chat" withoutGoBack maxWidth={1000}>
      <Box display="flex" justifyContent="center" width="100%" height="70vh">
        <Box
          component="iframe"
          src={`${process.env.REACT_APP_CHAT_URL}/professional/${userId}/${name}`}
          width="100%"
          height="100%"
          border="none"
          allow="display-capture"
        ></Box>
      </Box>
    </Content>
  );
}
