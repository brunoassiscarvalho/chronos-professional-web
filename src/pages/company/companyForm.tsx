import { Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnyObjectSchema, object, array, string } from 'yup';
import InputText from '../../components/molecules/inputs/InputText';
import Content from '../../components/organisms/Content';
import SmartForm from '../../components/organisms/form/SmartForm';
import SmartFormArray from '../../components/organisms/form/SmartFormArray';

export default function CompanyForm() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<any>();

  const userSchema: AnyObjectSchema = object({
    times: array().of(
      object({
        startTime: string().required('Campo obrigatório'),
        endTime: string().required('Campo obrigatório'),
      }),
    ),
  });

  function submitForm(success: any, error: any) {
    setErrors(error);
  }

  return (
    <Content title="Cadastro de empresas">
      <SmartForm onSubmit={submitForm}>
        <Stack padding={10} spacing={3}>
          <InputText label="Razão Social" name="socialName" fullWidth />
          <InputText label="Nome Fantasia" name="nickName" fullWidth />
          <SmartFormArray name="contacts" moveble={true} label="Contatos">
            <Stack direction="row" spacing={2}>
              <InputText label="Descrição" name="description" fullWidth />
              <InputText label="email" name="email" fullWidth />
              <InputText label="Telefone" name="telphone" fullWidth />
            </Stack>
          </SmartFormArray>
          <Button type="submit" onClick={() => navigate('exames')}>
            {' '}
            Salvar
          </Button>
        </Stack>
      </SmartForm>
    </Content>
  );
}
