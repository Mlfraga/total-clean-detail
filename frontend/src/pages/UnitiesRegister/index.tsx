import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import queryString from 'query-string';
import * as Yup from 'yup';

import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useToast } from '../../context/toast';
import api from '../../services/api';
import getValidationsErrors from '../../utils/getValidationError';
import { Container, Content, Separator, InputContainer } from './styles';

interface ICompany {
  id: number;
  name: string;
}

interface IFormData {
  unitName: string;
  unitTelephone: string;
}

const UnitiesRegister = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [company, setCompany] = useState<ICompany | null>(null);

  useEffect(() => {
    const query = history.location.search;

    const parsedQuery = queryString.parse(query, { parseNumbers: true });

    if (!parsedQuery.company || typeof parsedQuery.company !== 'number') {
      history.push('/services');
      return;
    }

    api
      .get(`companies/${parsedQuery.company}`)
      .then(response => {
        const newCompany = response.data;

        setCompany({ id: newCompany.id, name: newCompany.name });
      })
      .catch(() => {
        history.push('/services');
      });
  }, [history]);

  const handleSubmit = useCallback(
    async (data: IFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          unitName: Yup.string().required('Nome da unidade obrigatório'),
          unitTelephone: Yup.string()
            .required('Telefone da unidade obrigatório')
            .min(9, 'O telefone deve ter no mínimo 9 dígitos')
            .max(11, 'O telefone deve ter no máximo 11 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const requestDataSubmit = {
          name: data.unitName,
          telephone: data.unitTelephone,
          companyId: company?.id,
        };

        const response = await api.post('units', requestDataSubmit);

        if (response.status === 200) {
          addToast({
            title: 'Sucesso',
            description: `Unidade adicionada a concessionária ${company?.name}, com sucesso`,
            type: 'success',
          });

          reset();
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          title: 'Não foi possível realizar o caadastro.',
          description:
            'Essa unidade já foi criada ou ocorreu um erro, tente novamente.',
          type: 'error',
        });
      }
    },
    [addToast, company],
  );

  return (
    <Container>
      <Header />
      <Breadcrumb
        text={`Adicionar unidades a concessionária ${company?.name}`}
      />
      <Content>
        <Separator>
          <span>Cadastro de unidades</span>
          <div />
        </Separator>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="inputs">
            <InputContainer style={{ maxWidth: '375px', width: '100%' }}>
              <div className="labels">
                <span>Nome da unidade:</span>
                <span>*</span>
              </div>
              <Input
                className="input"
                id="unitName"
                type="unitName"
                name="unitName"
                style={{ width: '30px' }}
              />
            </InputContainer>

            <InputContainer style={{ maxWidth: '375px', width: '100%' }}>
              <div className="labels">
                <span>Telefone da unidade:</span>
                <span>*</span>
              </div>
              <Input
                className="input"
                id="unitTelephone"
                type="unitTelephone"
                name="unitTelephone"
                style={{ width: '30px' }}
              />
            </InputContainer>
          </div>
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default UnitiesRegister;
