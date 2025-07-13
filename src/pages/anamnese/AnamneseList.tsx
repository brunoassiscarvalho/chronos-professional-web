import { List } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from '../../components/molecules/lists/ListItem';
import Content from '../../components/organisms/Content';
import { IAnamnese } from '../../interfaces/Anamnese';
import HttpException from '../../services/HttpException';
import { getUser } from '../../utils/Api';
import { converteDateBars } from '../../utils/Dates';
import AnamneseService from './AnamneseService';

interface IAnamneseList {
  service?: AnamneseService;
}

export default function AnamneseList({
  service = new AnamneseService(),
}: IAnamneseList) {
  const { enqueueSnackbar } = useSnackbar();
  const { userId } = getUser();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [anamneses, setAnamneses] = useState<IAnamnese[]>();

  useEffect(() => {
    getAnamneses();
  }, []);

  const getAnamneses = () => {
    service
      .getAnamneses({ professional: userId, status: 'open' })
      .then((res: IAnamnese[]) => {
        setAnamneses(res);
      })
      .catch((err: HttpException) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <Content
      title="Anamneses"
      withoutGoBack
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={1000}
    >
      <List>
        {anamneses?.map(
          ({ _id, createdAt, professional, patient }: IAnamnese) => (
            <ListItem
              key={_id}
              primaryText={patient.name}
              secondaryText={converteDateBars(createdAt)}
              onClick={() => navigate(`/main/patient/${patient._id}`)}
            ></ListItem>
          ),
        )}
      </List>
    </Content>
  );
}
