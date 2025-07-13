import { Divider, Grid } from '@mui/material';
import { IPatient } from '../../interfaces/Patient';
import { literalCancerStage, literalCancerType } from '../../utils/Common';
import { ageByBirthDate, converteDateBars } from '../../utils/Dates';
import { maskPhone } from '../../utils/Masks';
import LabelText from '../molecules/LabelText';

export default function PatientDataDisplay({
  name,
  email,
  birthDate,
  gender,
  image,
  phone,
  religion,
  maritalStatus,
  occupation,
  cancerType,
  cancerStage,
  treatmentSite,
  allergy,
  ocologistName,
}: IPatient) {
  const age = ageByBirthDate(birthDate);
  const cancerTypeText = cancerType && literalCancerType(cancerType);
  const cancerStageText = cancerStage && literalCancerStage(cancerStage);

  return (
    <Grid container spacing={1}>
      <LabelText label="Nome" text={name} />
      <LabelText label="Email" text={email} />
      <LabelText
        label="Data de nascimento"
        text={converteDateBars(birthDate)}
      />
      {phone && <LabelText label="Telefone" text={maskPhone(phone)} />}
      <LabelText label="Gênero" text={gender} />
      {maritalStatus && <LabelText label="Estado Civil" text={maritalStatus} />}
      {religion && <LabelText label="Religião" text={religion} />}
      {occupation && <LabelText label="Ocupação" text={occupation} />}

      <Grid item xs={12}>
        <Divider />
      </Grid>

      {cancerTypeText && (
        <LabelText label="Tipo de câncer" text={cancerTypeText} />
      )}
      {cancerStageText && (
        <LabelText label="Estágio do câncer" text={cancerStageText} />
      )}

      {treatmentSite && (
        <LabelText label="Local de tratamento" text={treatmentSite} />
      )}

      {ocologistName && (
        <LabelText label="Nome do oncologista" text={ocologistName} />
      )}

      {allergy && <LabelText label="Alergia" text={allergy} />}
    </Grid>
  );
}
