import React, { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';
import api from '../../services/api';

import getSaleStatusTranslated from '../../utils/getSaleStatusTranslated'

import { Container, Content, Separator, List, Box } from './styles';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa'

import Select from 'react-select';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';

interface Sale {
  id: number;
  seller: string;
  customer: string;
  car: string;
  carPlate: string;
  price: number;
  deliveryDate: string;
  status: string;
  services: Array<{
    id: number,
    name: string,
    price: number,
  }>,
}

interface SaleRequestResponseData {
  id: number,
  deliveryDate: string,
  status: string,
  companyPrice: number,
  costPrice: number,

  seller: {
    name: string,
  },
  person: {
    name: string
  },
  car: {
    car: string,
    carPlate: string,
  },
  serviceSale: Array<{
    id: number,
    service: {
      id: number,
      name: string,
      price: number
    }
  }>,
}

const Sales = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [selectError, setSelectError] = useState(false);

  const [sales, setSales] = useState<Sale[]>([]);
  const [OpenedServices, setOpenedServices] = useState<Number[]>([]);
  const [selectedSale, setSelectedSale] = React.useState<Number | null>(null);
  const [statusSale, setStatusSale] = useState('');

  const selectOptions = [
    { value: 'PENDING', label: 'Pendente' },
    { value: 'CONFIRMED', label: 'Confirmado' },
    { value: 'CANCELED', label: 'Cancelado' },
    { value: 'FINISHED', label: 'Finalizado' },
  ]

  useEffect(() => {
    if (user.role === 'MANAGER') {
      api.get('sale/company').then(response => {
        const data = response.data;

        const salesData: Sale[] = data.map((data: SaleRequestResponseData) => {
          let services: Array<{ id: number, name: string, price: number }> = [];

          data.serviceSale.forEach(service => {
            api.get(`companyservices/sale?serviceId=${service.service.id}`).then(response => {
              const companyService = response.data;
              services.push({ id: companyService[0].service.id, name: companyService[0].service.name, price: companyService[0].price })
            })
            return services;
          })

          return {
            id: data.id,
            seller: data.seller.name,
            customer: data.person.name,
            car: data.car.car,
            carPlate: data.car.carPlate,
            price: data.companyPrice,
            deliveryDate: data.deliveryDate,
            status: data.status,
            services
          }
        });
        setSales(salesData)
      })
    }

    if (user.role === 'SELLER') {
      api.get('sale/seller').then(response => {
        const data = response.data;

        const salesData: Sale[] = data.map((data: SaleRequestResponseData) => {
          let services: Array<{ id: number, name: string, price: number }> = [];

          data.serviceSale.forEach(service => {
            api.get(`companyservices/sale?serviceId=${service.service.id}`).then(response => {
              const companyService = response.data;
              services.push({ id: companyService[0].service.id, name: companyService[0].service.name, price: companyService[0].price })
            })
          })

          return {
            id: data.id,
            seller: data.seller.name,
            customer: data.person.name,
            car: data.car.car,
            carPlate: data.car.carPlate,
            price: data.companyPrice,
            deliveryDate: data.deliveryDate,
            status: data.status,
            services
          }
        });
        setSales(salesData)
      })
    }

    if (user.role === 'ADMIN') {
      api.get('sale').then(response => {
        const data = response.data;

        const salesData: Sale[] = data.map((data: SaleRequestResponseData) => {
          let services: Array<{ id: number, name: string, price: number }> = [];

          data.serviceSale.forEach(service => {
            services.push({ id: service.service.id, name: service.service.name, price: service.service.price })
          })

          return {
            id: data.id,
            seller: data.seller.name,
            customer: data.person.name,
            car: data.car.car,
            carPlate: data.car.carPlate,
            price: data.costPrice,
            deliveryDate: data.deliveryDate,
            status: data.status,
            services
          }
        })
        setSales(salesData);
      });
    }
  }, [user.role]);

  const handleOpenServices = useCallback((id: number) => {
    setOpenedServices([...OpenedServices, id])
    setSelectedSale(null);
  }, [OpenedServices])

  const handleCloseServices = useCallback((id: number) => {
    const newOpenedServices = OpenedServices.filter(serviceId => serviceId !== id);

    setOpenedServices(newOpenedServices);
    setSelectedSale(null);
  }, [OpenedServices])

  const handleSelectSale = useCallback((id: number) => {
    if (selectedSale === id) {
      setSelectedSale(null);
    } else {
      setSelectedSale(id);
    }
  }, [selectedSale])

  const handleChangeStatusSale = useCallback((newValue) => {
    setStatusSale(newValue.value);
    setSelectError(false);
  }, []);

  const handleUpdateSale = useCallback(async () => {
    if (!selectedSale) {
      addToast(
        {
          title: 'Não é possível alterar a situação da venda.',
          description: 'Por favor selevione alguma venda.',
          type: 'error'
        });
      return;
    }
    if (!statusSale) {
      setSelectError(true);
      addToast({ title: "Campo de situação da venda vazio.", type: "error" });
      return;
    }

    const response = await api.patch(`sale/status/${selectedSale}`, { status: statusSale });

    if (response.status === 200) {
      setSelectedSale(null);
      addToast({ title: "Sucesso", description: "Situação da venda alterada com sucesso", type: 'success' });

      const response = await api.get('sale')
      const data = response.data;

      const salesData: Sale[] = data.map((data: SaleRequestResponseData) => {
        let services: Array<{ id: number, name: string, price: number }> = [];

        data.serviceSale.forEach(service => {
          services.push({ id: service.service.id, name: service.service.name, price: service.service.price })
        })

        return {
          id: data.id,
          seller: data.seller.name,
          customer: data.person.name,
          car: data.car.car,
          carPlate: data.car.carPlate,
          price: data.costPrice,
          deliveryDate: data.deliveryDate,
          status: data.status,
          services
        }
      })
      setSales(salesData);
    }
  }, [addToast, selectedSale, statusSale]);

  return (
    <Container>
      <Header />
      <Breadcrumb text="Vendas realizadas" />
      <Content>
        <Separator>
          <span>Vendas</span>
          <div />
        </Separator >
        <div className="boxTitle">
          <span>Vendedor</span>
          <span>Cliente</span>
          <span>Carro</span>
          <span>Placa</span>
          <span>Preço</span>
          <span>Data de entrega</span>
          <span>Situação</span>
        </div>
        <List>
          {sales.map(sale => (
            <Box key={sale.id} onClick={user.role === 'ADMIN' ? () => handleSelectSale(sale.id) : () => { }}>
              <div
                className={selectedSale === sale.id ? "header-selected" : "header"}
                style={OpenedServices.includes(sale.id) ? { borderRadius: '15px 15px 0 0', borderBottom: 0 } : { borderRadius: '15px' }}
              >
                <span>{sale.seller}</span>
                <span>{sale.customer}</span>
                <span>{sale.car}</span>
                <span>{sale.carPlate}</span>
                <span>{sale.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                <span>
                  {format(new Date(sale.deliveryDate), "dd'/'MM'/'yyyy '-' HH:mm'h'", { locale: ptBR })}
                </span>
                <div className="status">
                  <span>
                    <div className={sale.status} />
                    {getSaleStatusTranslated(sale.status)}
                  </span>
                </div>

                {OpenedServices.includes(sale.id)
                  ? <FaArrowAltCircleUp onClick={() => handleCloseServices(sale.id)} style={{ cursor: 'pointer' }} size={26} />
                  : <FaArrowAltCircleDown onClick={() => handleOpenServices(sale.id)} style={{ cursor: 'pointer' }} size={26} />
                }
              </div>

              <div
                className="dropDown"
                hidden={OpenedServices.includes(sale.id) ? false : true}
                style={selectedSale === sale.id ? { border: '2px solid #FF6F60', borderTop: 0 } : { border: 0 }}
              >
                <Separator className="separator">
                  <span>Serviços</span>
                  <div />
                </Separator >
                {sale.services.map(service => (
                  <div className="service" key={service.id}>
                    <span>{service.name}</span>
                    <span>{service.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                ))}
                <div className="total" >
                  <span>Total</span>
                  <span>{sale.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              </div>
            </Box>
          ))}
        </List>

        {user.role === 'ADMIN' &&
          <div
            className={!selectedSale ? "udpdateSaleContainerHide" : "updateSaleContainer"}
            hidden={!selectedSale ? true : false}
          >
            <div className="SelectContainer">
              <div className="labels">
                <span>Situação da venda:</span>
              </div>
              <Select
                styles={{
                  control: base => ({
                    ...base,
                    marginTop: 14,
                    borderRadius: 6,
                    borderWidth: 2,
                    borderColor: selectError ? '#c53030' : '#585858',
                    backgroundColor: '#424242',
                    width: 300,
                    height: 20,
                    boxShadow: 'none',
                    fontSize: 16
                  }),
                  menu: base => ({
                    ...base,
                    backgroundColor: '#282828',
                    color: '#F4EDE8'

                  }),
                  singleValue: base => ({
                    ...base,
                    color: '#F4EDE8'
                  }),
                }}
                options={selectOptions}
                onChange={handleChangeStatusSale}
                label="Single select"
                className="select"
                clearable={false}
                placeholder="Selecione o novo status da venda"
                id="statusSale"
                type="statusSale"
                name="statusSale"
              />
            </div>
            <Button onClick={handleUpdateSale}>Alterar Situação</Button>
          </div>
        }

      </Content>
    </Container >
  );
}

export default Sales;
