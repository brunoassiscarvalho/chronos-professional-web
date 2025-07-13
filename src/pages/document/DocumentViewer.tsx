import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

import logo from '../../assets/logoType.svg';
import { getUser } from '../../utils/Api';
import { longDate } from '../../utils/Dates';
import { literalPosition } from '../../utils/TypeEnums';
// Create styles
const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
  },
  borders: {
    padding: 20,
  },
  viewer: {
    width: '100%', //the pdf viewer will take up all of the width and height
    height: '70vh',
  },
  image: {
    padding: 15,
    width: 100,
    height: 80,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  name: {
    margin: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    margin: 5,
    fontSize: 12,
    textAlign: 'justify',
  },
  position: {
    margin: 5,
    fontSize: 10,
    textAlign: 'center',
  },
});

// Create Document Component
const DocumentViewer = ({ text, title, patient }: any) => {
  const user = getUser();
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4">
          <View style={styles.borders}>
            <View style={styles.image}>
              <Image src={logo} />
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.text}>{`Paciente: ${patient?.name}`}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.date}>{longDate(new Date())}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.position}>
                {literalPosition(user.position)}
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default DocumentViewer;
