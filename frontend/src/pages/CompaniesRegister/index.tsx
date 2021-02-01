import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Menu from '../../components/Menu';
import { useToast } from '../../context/toast';
import api from '../../services/api';
import CpfCnpjUtils from '../../utils/CpfCnpjUtils';
import getValidationsErrors from '../../utils/getValidationError';
import { Container, Content, Separator, InputContainer } from './styles';

interface IFormData {
  companyName: string;
  companyTelephone: string;
  companyCnpj: string;
}

const CompaniesRegister = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          companyName: Yup.string().required(
            'Nome da concessionária obrigatório',
          ),
          companyTelephone: Yup.string()
            .required('Telefone da concessionária obrigatório')
            .min(9, 'O telefone deve ter no mínimo 9 dígitos')
            .max(11, 'O telefone deve ter no máximo 11 dígitos'),
          companyCnpj: Yup.string()
            .required('Cnpj da concessionária obrigatório')
            .length(14, 'O CNPJ deve ter 14 dígitos.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const isCnpjValid = CpfCnpjUtils.isCnpjValid(data.companyCnpj);

        if (isCnpjValid !== true) {
          formRef.current?.setErrors({ companyCnpj: 'Cnpj inválido.' });
          return;
        }

        const response = await api.post('companies', {
          name: data.companyName,
          telephone: data.companyTelephone,
          cnpj: data.companyCnpj,
        });

        if (response.status === 200) {
          addToast({
            title: 'Cadastro realizado com sucesso.',
            type: 'success',
            description:
              'Agora você já pode registrar unidades, vendedores e gerentes a essa concessionária.',
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
            'Essa concessionária já foi criada ou ocorreu um erro, tente novamente.',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Menu />
      <Breadcrumb text="Adicionar novas concessionárias" />
      <Content
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
        <Separator>
          <span>Cadastro de concessionárias</span>
          <div />
        </Separator>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="inputs">
            <InputContainer style={{ maxWidth: '375px', width: '100%' }}>
              <div className="labels">
                <span>Nome da concessionária:</span>
                <span>*</span>
              </div>
              <Input
                className="input"
                id="companyName"
                type="companyName"
                name="companyName"
                style={{ width: '30px' }}
              />
            </InputContainer>

            <InputContainer style={{ maxWidth: '375px', width: '100%' }}>
              <div className="labels">
                <span>Telefone da concessionária:</span>
                <span>*</span>
              </div>
              <Input
                className="input"
                id="companyTelephone"
                type="companyTelephone"
                name="companyTelephone"
                style={{ width: '30px' }}
              />
            </InputContainer>

            <InputContainer style={{ maxWidth: '375px', width: '100%' }}>
              <div className="labels">
                <span>Cnpj da concessionária:</span>
                <span>*</span>
              </div>
              <Input
                className="input"
                id="companyCnpj"
                type="companyCnpj"
                name="companyCnpj"
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

export default CompaniesRegister;
