import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Container from './styles';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import SkipButton from '../../components/SkipButton';

import api from '../../services/api';
import { currencyMasker } from './masks'
import JWT from 'jsonwebtoken';

interface NewServices {
  serviceId: number;
  price: Number;
}

interface Services {
  id: number;
  name: string;
  price: Number;
  enabled: Boolean;
  empty: Boolean;
}

interface ServicesEmpty {
  id: number;
  name: string;
  price: Number;
  enabled: Boolean;
  empty: Boolean;
}

interface Test {
  id: number;
  empty: Boolean;
}

const SetCompanyPrices = () => {
  const [services, setServices] = useState<Services[]>([]);
  const [companyServices, setcompanyServices] = useState<NewServices[]>([]);
  const [isEmptyService, setIsEmptyService] = useState<Test[]>([]);
  const [emptyErrorMessage, setEmptyErrorMessage] = useState('');

  const [id, setId] = useState(0);

  useEffect(() => {
    api.get('services').then(response => {
      const newServices: Services[] = response.data;

      let ServicesEmpty: ServicesEmpty[] = [];
      newServices.map(service => ServicesEmpty.push({
        id: service.id,
        name: service.name,
        price: service.price,
        enabled: service.enabled,
        empty: false
      }));

      setServices(ServicesEmpty);

      newServices.map(service => setcompanyServices(oldCompanyServices => [...oldCompanyServices, { serviceId: service.id, price: service.price }]));

      newServices.map(service => setIsEmptyService(oldIsEmptyService => [...oldIsEmptyService, { id: service.id, empty: true }]));
    })
  }, [])

  function handleKeyUp(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const value = currencyMasker(event);

    const index = companyServices.findIndex(companyService => companyService.serviceId === id);

    let price = value.currentTarget.value.toString();
    price = price.replace(".", "");
    price = price.replace(",", ".");
    companyServices[index].price = parseFloat(price);
  }

  function handleOnChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name } = event.target;
    const id = parseInt(name);

    const indexService = isEmptyService.findIndex(service => service.id === id);

    if (!event.target.value) {
      isEmptyService[indexService].empty = true;
    } else {
      isEmptyService[indexService].empty = false;
    }

    setId(id);

    services.map(service => service.empty = isEmptyService[getIndex(service.id)].empty)
    setServices(services)
  }

  function getIndex(id: number): number {
    const index = isEmptyService.findIndex(isEmptyService => isEmptyService.id === id)

    return index;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    services.map(service => service.empty = isEmptyService[getIndex(service.id)].empty)
    setServices(services)

    const isInputsEmpty = checkServicesInputs();

    const token = localStorage.getItem('token');
    const decoded: any = JWT.decode(String(token), { complete: true });
    const companyId = decoded.payload.user.profile.companyId

    if (isInputsEmpty === false) {
      const data = {
        companyId: companyId,
        services: companyServices
      }

      const response = await api.post('companyservices', data)

      if (response.status === 200) {
        history.push('serviços');
      }

    }

    setEmptyErrorMessage('Por favor preencha o preço de todos os serviços.')

  }

  function checkServicesInputs() {
    let flag = 0;

    isEmptyService.map(service => {
      if (service.empty === true) {
        flag += 1;
      }
      flag += 0;
    })

    if (flag > 0) {
      return true;
    }
    return false;
  }

  const history = useHistory();

  return (
    <Container>
      <div className="header">
        <Header buttons={[{ name: '', route: '  ' }]}></Header>
      </div>
      <div className="body">
        <form onSubmit={handleSubmit}>
          <Breadcrumb text='Configure o preço de cada serviço em seu estabelecimento.' />
          <div className="list">
            {services.map(service => (
              <div key={service.id} className={service.empty === true ? 'service-box-empty' : 'service-box'} >
                <div className="name">
                  <span id='service-name'>{service.name.toUpperCase()}</span>
                </div>
                <div className="price-container">
                  <span id='price-totalclean'>Preço da Total Clean: </span>
                  <span id='price'>R$: {service.price}</span>
                </div>
                <div className="input-container">
                  <span>R$</span>
                  <input
                    className="input"
                    id={`${service.id}`}
                    type="string"
                    itemID={`${service.id}`}
                    name={`${service.id}`}
                    onKeyUp={handleKeyUp}
                    onChange={handleOnChangeInput}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="buttons">
            <span id='errorMessage'>{emptyErrorMessage}</span>
            <SkipButton buttonType="button" text="Pular" />
            <Button buttonType="submit" text="Salvar" />
          </div>
        </form>

      </div>
    </Container >
  );
}

export default SetCompanyPrices;
