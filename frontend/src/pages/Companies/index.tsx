import React, {useCallback, useEffect, useState} from 'react';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';

import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa'
import { RiAddFill } from 'react-icons/ri'

import { Container, Content, Separator, List, Box } from './styles';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';

interface CompaniesResponseData {
  id: number,
  name: string,
  telephone: string,
  cnpj: string,
  units: Array<{id: number, name: string, telephone: string}>
}

const Companies = () => {
  const [companies, setCompanies] = useState<CompaniesResponseData[]>([]);
  const [openedCompanies, setOpenedCompanies] = useState<Number[]>([]);

  const history = useHistory();

  useEffect(()=>{
  api.get('companies').then(response => {
    const companies: CompaniesResponseData[] = response.data;
    setCompanies(companies);
  })
  },[])

  const handleOpenCompanies = useCallback((id: number)=>{
    setOpenedCompanies([...openedCompanies, id])
  },[openedCompanies])

  const handleCloseCompanies = useCallback((id: number)=>{
    const newOpenedCompanies = openedCompanies.filter(companyId => companyId !== id);

    setOpenedCompanies(newOpenedCompanies);
  },[openedCompanies])

  return (
    <Container>
      <Header/>
      <Breadcrumb text="Concessionárias cadastradas"/>
      <Content>
        <Separator>
          <span>Concessionárias</span>
          <div />
        </Separator >
          <div className="boxTitle">
            <span>Nome</span>
            <span>Contato</span>
            <span>CNPJ</span>
          </div>
        <List>
          {companies.map(company => (
            <Box key={company.id} >
              <div
                className="header"
                style={openedCompanies.includes(company.id) ? {borderRadius: '15px 15px 0 0' } : {borderRadius: 15}}
              >
                <span>{company.name}</span>
                <span>{company.telephone}</span>
                <span>{company.cnpj}</span>
                {openedCompanies.includes(company.id)
                  ? <FaArrowAltCircleUp onClick={() => handleCloseCompanies(company.id)} style={{cursor: 'pointer'}} size={26}/>
                  : <FaArrowAltCircleDown onClick={() => handleOpenCompanies(company.id)} style={{cursor: 'pointer'}} size={26} />
                }
              </div>

              <div
              className="dropDown"
                hidden={openedCompanies.includes(company.id ) ? false : true}
              >
                <Separator className="separator">
                  <span>Unidades</span>
                  <div />
                </Separator >

                <div className="title">
                  <span>Nome</span>
                  <span>Telefone</span>
                </div>

                {company.units.map(unit => (
                  <div className="unit" key={unit.id}>
                    <span>{unit.name}</span>
                    <span>{unit.telephone}</span>
                  </div>

                ))}
                <Link
                className="createNewCompanyLink"
                to={`unities-register/?company=${company.id}`}
                >
                  <RiAddFill size={18}/> Adicionar nova unidade
                </Link>
              </div>
           </Box>
          ))}
        </List>

        <div className="button">
          <Button onClick={()=>{history.push('companies-register')}}>Registrar nova concessionária</Button>
        </div>
       </Content>
      </Container >
  );
}

export default Companies;
