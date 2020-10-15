import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa'
import { RiAddFill } from 'react-icons/ri'

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';

import getUserRoleTranslated from '../../utils/getUserRoleTranslated';
import api from '../../services/api';

import { Container, Content, Separator, List, Box } from './styles';

interface FormatRow {
  id: number;
  companyId: number;
  name: string;
  telephone: string;
  company: {
    id: number,
    name: string;
  }
  Profile: [
    {
      id: number,
      name: string,
      telephone: string,
      user: {
        id: number,
        role: string,
      }
    }
  ]
}

const UsersByUnits = () => {
  const [unities, setUnities] = useState<FormatRow[]>([]);
  const [openedUnities, setOpenedUnities] = useState<Number[]>([]);

  useEffect(()=>{
    api.get('units').then(response => {
      const unities: FormatRow[] = response.data;

      setUnities(unities);
    });
  },[])

  const handleOpenUnities = useCallback((id: number)=>{
    setOpenedUnities([...openedUnities, id])
  },[openedUnities])

  const handleCloseUnities = useCallback((id: number)=>{
    const newOpenedUnities = openedUnities.filter(unitId => unitId !== id);

    setOpenedUnities(newOpenedUnities);
  },[openedUnities])

  return (
    <Container>
      <Header />

      <Breadcrumb text='Usuários por unidade' />
      <Content>
        <Separator>
          <span>Unidades</span>
          <div />
        </Separator >
          <div className="boxTitle">
            <h3>Unidade</h3>
            <h3>Concessionária</h3>
            <h3>Telephone</h3>
          </div>

        <List>
          {unities.map(unit => (
          <Box>
            <div
              className="header"
              style={openedUnities.includes(unit.id) ? {borderRadius: '15px 15px 0 0' } : {borderRadius: 15}}
            >
              <span>{unit.name}</span>
              <span>{unit.company.name}</span>
              <span>{unit.telephone}</span>
              <Link
                className="createNewCompanyLink"
                to={`users-register/?company=${unit.company.id}&unit=${unit.id}`}
              >
                  <RiAddFill size={18}/> Adicionar novo usuário a essa unidade
              </Link>
              {openedUnities.includes(unit.id)
                ? <FaArrowAltCircleUp onClick={() => handleCloseUnities(unit.id)} style={{cursor: 'pointer'}} size={26}/>
                : <FaArrowAltCircleDown onClick={() => handleOpenUnities(unit.id)} style={{cursor: 'pointer'}} size={26} />
              }
            </div>

            <div
              className="dropDown"
              hidden={openedUnities.includes(unit.id ) ? false : true}
            >
                <Separator className="separator">
                  <span>Usuários dessa unidade</span>
                  <div />
                </Separator >

                <div className="title">
                  <span>Nome</span>
                  <span>Telefone</span>
                  <span>Cargo</span>
                </div>

                {unit.Profile.map(person => (
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

    </Container >
  );
}

export default UsersByUnits;
