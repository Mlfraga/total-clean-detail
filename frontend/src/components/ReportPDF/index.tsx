import React from 'react';

import { Document, Page, View, Text } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { BoldFilterText } from './styles';

const ReportPDF: React.FC = () => (
  <Document>
    <Page style={{ padding: '8px' }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderWidth: 2,
          borderColor: '#000',
          borderStyle: 'solid',
          width: '100%',
          height: '80px',
        }}
      >
        <View
          style={{
            display: 'flex',
          }}
        >
          <BoldFilterText>Emissão</BoldFilterText>

          <Text style={{ fontSize: '8px' }}>
            {format(new Date(), "dd'/'MM'/'yyyy", { locale: ptBR })}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default ReportPDF;
