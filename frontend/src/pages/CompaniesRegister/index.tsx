import React, {useCallback, useRef} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import CpfCnpjUtils from '../../utils/CpfCnpjUtils';
import getValidationsErrors from '../../utils/getValidationError';
import { useToast } from '../../context/toast';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';

import { Container, Content, Separator, InputContainer } from './styles';

interface FormData {
  companyName: string;
  companyTelephone: string;
  companyCnpj: string;
}

const CompaniesRegister = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: FormData, {reset})=>{
    try{
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        companyName: Yup.string().required('Nome da concessionária obrigatório'),
        companyTelephone: Yup.string().required('Telefone da concessionária obrigatório'),
        companyCnpj: Yup.string().required('Cnpj da concessionária obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const isCnpjValid = CpfCnpjUtils.isCnpjValid(data.companyCnpj);

      if(isCnpjValid !== true){
        formRef.current?.setErrors({  companyCnpj: 'Cnpj inválido.'})
        return;
      };

      const response = await api.post('companies', {
        name: data.companyName,
        telephone: data.companyTelephone,
        cnpj: data.companyCnpj
      });

      if(response.status === 200 ){
        addToast({title: "Cadastro realizado com sucesso.", type: 'success', description: "Agora você já pode registrar unidades, vendedores e gerentes a essa concessionária."});

        reset();
      }
    }catch(err){
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);

        formRef.current?.setErrors(errors);
        return
      }

      addToast({title: "CNPJ ou nome ja utilizado.", description: 'Não foi possível realizar o cadastro, tente novamente.', type: "error"})
    }
  },[addToast]);

  return (
    <Container>
      <Header/>
      <Breadcrumb text="Concessionárias cadastradas"/>
      <Content>
        <Separator>
          <span>Cadastro de concessionária</span>
          <div />
        </Separator >

        <Form ref={formRef} onSubmit={handleSubmit} >
          <div className="inputs">
            <InputContainer style={{ maxWidth: '375px', width: '100%' }} >
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

            <InputContainer style={{ maxWidth: '375px', width: '100%' }} >
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

            <InputContainer style={{ maxWidth: '375px', width: '100%' }} >
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
          <Button type='submit'>Cadastrar</Button>
        </Form>
      </Content>
    </Container >
  );
}

export default CompaniesRegister;
