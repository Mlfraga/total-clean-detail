import React, { useEffect, useState, useCallback } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import { RiAddFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumb';
import Header from '../../components/Header';
import api from '../../services/api';
import getUserRoleTranslated from '../../utils/getUserRoleTranslated';
import { Container, Content, Separator, List, Box } from './styles';

interface IFormatRow {
  id: number;
  name: string;
  telephone: string;
  Profile: [
    {
      id: number;
      name: string;
      telephone: string;
      user: {
        id: number;
        role: string;
      };
    },
  ];
}

const UsersByUnits = () => {
  const [companies, setCompanies] = useState<IFormatRow[]>([]);
  const [openedCompanies, setOpenedCommpanies] = useState<number[]>([]);

  useEffect(() => {
    api.get('companies').then(response => {
      const newCompanies: IFormatRow[] = response.data;

      setCompanies(newCompanies);
    });
  }, []);

  const handleOpenUnities = useCallback(
    (id: number) => {
      setOpenedCommpanies([...openedCompanies, id]);
    },
    [openedCompanies],
  );

  const handleCloseUnities = useCallback(
    (id: number) => {
      const newOpenedUnities = openedCompanies.filter(unitId => unitId !== id);

      setOpenedCommpanies(newOpenedUnities);
    },
    [openedCompanies],
  );

  return (
    <Container>
      <Header />

      <Breadcrumb text="Usuários por concessionária" />
      <Content
        marginLeft="auto"
        marginRight="auto"
        width="100%"
        maxWidth={{
          xs: '90vw',
          sm: '90vw',
          md: '90vw',
          lg: '72vw',
          xl: '62vw',
        }}
      >
        <Separator>
          <span>Cooncessionárias</span>
          <div />
        </Separator>
        <div className="boxTitle">
          <h3>Concessionária</h3>
          <h3>Telephone</h3>
        </div>

        <List>
          {companies.map(company => (
            <Box key={company.id}>
              <div
                className="header"
                style={
                  openedCompanies.includes(company.id)
                    ? { borderRadius: '15px 15px 0 0' }
                    : { borderRadius: 15 }
                }
              >
                <span>{company.name}</span>
                <span>{company.telephone}</span>
                <Link
                  className="createNewCompanyLink"
                  to={`users-register/?company=${company.id}`}
                >
                  <RiAddFill size={18} /> Adicionar novo usuário a essa
                  concessionária
                </Link>
                {openedCompanies.includes(company.id) ? (
                  <FaArrowAltCircleUp
                    onClick={() => handleCloseUnities(company.id)}
                    style={{ cursor: 'pointer' }}
                    size={26}
                  />
                ) : (
                  <FaArrowAltCircleDown
                    onClick={() => handleOpenUnities(company.id)}
                    style={{ cursor: 'pointer' }}
                    size={26}
                  />
                )}
              </div>

              <div
                className="dropDown"
                hidden={!openedCompanies.includes(company.id)}
              >
                <Separator className="separator">
                  <span>Usuários dessa concessionária</span>
                  <div />
                </Separator>

                <div className="title">
                  <span>Nome</span>
                  <span>Telefone</span>
                  <span>Cargo</span>
                </div>

                {company.Profile.map(person => (
                  <div className="person" key={person.id}>
                    <span>{person.name}</span>
                    <span>{person.telephone}</span>
                    <span>{getUserRoleTranslated(person.user.role)}</span>
                  </div>
                ))}
              </div>
            </Box>
          ))}
        </List>
      </Content>
    </Container>
  );
};

export default UsersByUnits;
