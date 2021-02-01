import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Box, Flex, Button as ChakraButton, Tooltip } from '@chakra-ui/core';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Breadcrumb from '../../components/Breadcrumb';
import DatePicker from '../../components/DatePicker';
import Menu from '../../components/Menu';
import ReportPDF from '../../components/ReportPDF';
import Select from '../../components/Select';
import Separator from '../../components/Separator';
import api from '../../services/api';
import { Container } from './styles';

interface ICompaniesResponseData {
  id: number;
  name: string;
  telephone: string;
  cnpj: string;
  units: Array<{ id: number; name: string; telephone: string }>;
}

interface IService {
  id: number;
  name: string;
  price: number;
  enabled: boolean;
}

const Reports: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [companies, setCompanies] = useState<ICompaniesResponseData[]>([]);
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    api.get('companies').then(response => {
      const newCompanies: ICompaniesResponseData[] = response.data;

      setCompanies(newCompanies);
    });

    api.get('services').then(response => {
      const newServices: IService[] = response.data;

      setServices(newServices);
    });
  }, []);

  const handleSearch = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Menu />
      <Breadcrumb text="Relatórios" />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Box
          marginLeft="auto"
          marginRight="auto"
          width="100%"
          maxWidth={{
            xs: '90vw',
            sm: '90vw',
            md: '80vw',
            lg: '78vw',
            xl: '90vw',
          }}
        >
          <Separator text="Filtros" />
          <Form ref={formRef} onSubmit={handleSearch}>
            <Flex marginBottom={8}>
              <Select
                name="campany"
                height={8}
                backgroundColor="#424242"
                color="White"
                placeholder="Concessionárias"
                containerProps={{
                  marginTop: 6,
                  marginRight: 8,
                  width: 300,
                  height: 10,
                  border: '2px solid',
                  borderColor: '#585858',
                  backgroundColor: '#424242',
                }}
              >
                {companies.map(company => (
                  <option value={company.id} key={company.id}>
                    {company.name}
                  </option>
                ))}
              </Select>

              <Select
                name="service"
                height={8}
                backgroundColor="#424242"
                color="White"
                placeholder="Serviços"
                containerProps={{
                  marginTop: 6,
                  marginRight: 6,
                  width: 300,
                  height: 10,
                  border: '2px solid',
                  borderColor: '#585858',
                  backgroundColor: '#424242',
                }}
              >
                {services.map(service => (
                  <option value={service.id} key={service.id}>
                    {service.name}
                  </option>
                ))}
              </Select>

              <Flex marginTop={6}>
                <DatePicker
                  placeholderText="Data inicial"
                  name="initialDate"
                  containerProps={{
                    marginRight: 6,
                  }}
                />
                <DatePicker placeholderText="Data final" name="finalDate" />
              </Flex>
            </Flex>
            <Tooltip
              label="Gerar relatório de acordo com filtros"
              aria-label="Gerar relatório de acordo com filtros"
            >
              <ChakraButton width="100%" variantColor="green" type="submit">
                <PDFDownloadLink
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  document={<ReportPDF />}
                  fileName="somename.pdf"
                >
                  Gerar arquivo
                </PDFDownloadLink>
              </ChakraButton>
            </Tooltip>
          </Form>
        </Box>
      </Flex>
    </Container>
  );
};

export default Reports;
