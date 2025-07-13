import AnamneseForm from '../pages/anamnese/AnamneseForm';
import DashBoard from '../pages/patient/Dashboard';
import History from '../pages/patient/History';
import Patient from '../pages/patient/Patient';
import PatientsList from '../pages/patient/PatientsList';
import TeleAttendance from '../pages/teleAttendance/TeleAttendance';
import TeleAttendanceList from '../pages/teleAttendance/TeleAttendanceList';
import { ProfileRoutesObject } from './RolesService';

import ProfessionalTabs from '../pages/professional/ProfessionalDetails';
import ProfessionalForm from '../pages/professional/ProfessionalForm';
import ProfessionalList from '../pages/professional/ProfessionalList';
import Profile from '../pages/profile/Profile';
import Schedule from '../pages/schedule/Schedule';
import ScheduleBatchExclude from '../pages/schedule/ScheduleBatchExclude';
import ScheduleBatchInclude from '../pages/schedule/ScheduleBatchInclude';
import SymptomsDetail from '../pages/symptoms/SymptomDetail';
import SymptomForm from '../pages/symptoms/SymptomForm';
import SymptomList from '../pages/symptoms/SymptomList';

import { ReactComponent as ChatIcon } from '../assets/chat.svg';
import { ReactComponent as PatientIcon } from '../assets/icon-chat.svg';
import { ReactComponent as DocumentIcon } from '../assets/icon-documents.svg';
import { ReactComponent as NurseIcon } from '../assets/icon-nurse.svg';
import { ReactComponent as ReportIcon } from '../assets/icon-report.svg';
import { ReactComponent as ScheduleIcon } from '../assets/icon-schedule.svg';
import { ReactComponent as SymptonIcon } from '../assets/icon-symptons.svg';
import { ReactComponent as TeleIcon } from '../assets/icon-tele.svg';

import AnamneseList from '../pages/anamnese/AnamneseList';
import Appointment from '../pages/appointment/AppointmentBase';
import AppointmentBook from '../pages/appointment/AppointmentBook';
import AppointmentCancel from '../pages/appointment/AppointmentCancel';
import AppointmentForm from '../pages/appointment/AppointmentForm';
import DocumentManagement from '../pages/document/DocumentManagement';
import DocumentViewer from '../pages/document/DocumentViewer';
import PersonalData from '../pages/patient/PersonalData';

import Chat from '../pages/chat/Chat';

export const routerConfig: ProfileRoutesObject = {
  ['agenda']: {
    profiles: ['nurse', 'psychologist'],
    element: <Schedule />,
    menu: { key: 'agenda', title: 'Agenda', Icon: ScheduleIcon },
  },
  ['patient']: {
    profiles: ['concierge', 'nurse', 'psychologist'],
    element: <PatientsList />,
    menu: { key: 'patient', title: 'Paciente', Icon: PatientIcon },
  },
  ['chat']: {
    profiles: ['concierge', 'nurse', 'psychologist'],
    element: <Chat />,
    menu: { key: 'chat', title: 'Chat', Icon: ChatIcon },
  },
  ['patient/:patientId']: {
    profiles: ['concierge', 'nurse', 'psychologist'],
    element: <Patient />,
    subRoutes: {
      ['data']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <PersonalData />,
      },
      ['dashboard']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <DashBoard />,
      },
      ['anamnese']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <AnamneseForm />,
      },
      ['history']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <History />,
      },
      ['document']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <DocumentManagement />,
      },
    },
  },
  ['patient/:patientId/profissional']: {
    profiles: ['concierge', 'nurse', 'psychologist'],
    element: <ProfessionalList />,
  },
  ['tele-atendimento/:appointmentId']: {
    profiles: ['nurse', 'psychologist'],
    element: <TeleAttendance />,
    subRoutes: {
      ['data']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <PersonalData />,
      },
      ['anamnese']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <AnamneseForm />,
      },
      ['history']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <History />,
      },
      ['document']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <DocumentManagement />,
      },
    },
  },

  ['appointment/:appointmentId']: {
    profiles: ['nurse', 'psychologist', 'concierge'],
    element: <Appointment />,
    subRoutes: {
      ['book']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <AppointmentBook />,
      },
      ['cancel']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <AppointmentCancel />,
      },
      ['detail']: {
        profiles: ['concierge', 'nurse', 'psychologist'],
        element: <History />,
      },
    },
  },
  ['appointment-new']: {
    profiles: ['nurse', 'psychologist'],
    element: <AppointmentForm />,
  },

  ['incluir-horarios']: {
    profiles: ['nurse', 'psychologist'],
    element: <ScheduleBatchInclude />,
  },
  ['excluir-horarios']: {
    profiles: ['nurse', 'psychologist'],
    element: <ScheduleBatchExclude />,
  },
  ['consultas']: {
    profiles: ['nurse', 'psychologist'],
    element: <TeleAttendanceList />,
    menu: { key: 'consultas', title: 'Consulta', Icon: TeleIcon },
  },
  ['anamnese']: {
    profiles: ['nurse', 'psychologist'],
    element: <AnamneseList />,
    menu: { key: 'anamnese', title: 'Anamnese', Icon: ReportIcon },
  },
  ['anamnese/:anamneseId']: {
    profiles: ['nurse', 'psychologist'],
    element: <AnamneseForm />,
  },
  ['document']: {
    profiles: ['nurse', 'psychologist'],
    element: <DocumentManagement />,
    menu: { key: 'document', title: 'Documentos', Icon: DocumentIcon },
  },
  ['document/view']: {
    profiles: ['nurse', 'psychologist'],
    element: <DocumentViewer />,
  },

  ['profissional']: {
    profiles: ['admin', 'concierge'],
    element: <ProfessionalList />,
    menu: { key: 'profissional', title: 'Profissionais', Icon: NurseIcon },
  },
  ['novo-profissional']: { profiles: ['admin'], element: <ProfessionalForm /> },

  ['profissional/:professionalId']: {
    profiles: ['admin', 'concierge'],
    element: <ProfessionalTabs />,
  },
  ['profissional/:professionalId/edit']: {
    profiles: ['admin'],
    element: <ProfessionalForm />,
  },
  ['profissional/:professionalId/agenda']: {
    profiles: ['nurse', 'psychologist', 'concierge'],
    element: <Schedule />,
  },
  ['sintomas']: {
    profiles: ['admin'],
    element: <SymptomList />,
    menu: { key: 'sintomas', title: 'Sintomas', Icon: SymptonIcon },
  },
  ['novo-sintoma']: { profiles: ['admin'], element: <SymptomForm /> },
  ['sintoma/:symptomId']: { profiles: ['admin'], element: <SymptomsDetail /> },
  ['perfil']: { element: <Profile /> },
};
