import React, {useEffect, useState} from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import {useAuth} from '../../context/auth';
import api from '../../services/api';

import { Container, Content, Separator, List, Box } from './styles';
import {FaArrowAltCircleDown, FaArrowAltCircleUp} from 'react-icons/fa'

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';

interface Service {
  service: {
    name: string;
    price: number;
  }
}

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
    service: {
      name: string,
      price: number
    }
  }>,
}

interface SaleRequestReposneData {
  id: number,
  deliveryDate:string,
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
      name: string,
      price: number
    }
  }>,
}

const Sales = () => {
  const {user} = useAuth();
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(()=>{
    if(user.role === 'MANAGER'){
      api.get('sale/company').then(response => {
        const data = response.data;
        const salesData: Sale[] = data.map((data: SaleRequestReposneData) => {
          return {
            id: data.id,
            seller: data.seller.name,
            customer: data.person.name,
            car: data.car.car,
            carPlate: data.car.carPlate,
            price: data.companyPrice,
            deliveryDate: data.deliveryDate,
            status: data.status,
            services: data.serviceSale.filter(service => (
              {
                name: service.service.name,
                price: null,
              }
            ))
          }
        });
        setSales(salesData)
      })
    }

    if(user.role === 'SELLER'){
      api.get('sale/seller').then(response => {
        const data = response.data;

        const salesData: Sale[] = data.map((data: SaleRequestReposneData) => {
          return {
            seller: data.seller.name,
            customer: data.person.name,
            car: data.car.car,
            carPlate: data.car.carPlate,
            price: data.companyPrice,
            deliveryDate: format(new Date(data.deliveryDate),
              "'dia' dd 'de' MMMM', às ' HH:mm'h'",
                { locale: ptBR }),
            status: data.status,
            services: data.serviceSale.filter(service => (
              {
                name: service.service.name,
                price: null,
              }
            ))
          }
        });
        console.log(data.deliveryDate);
        setSales(salesData)
      })
    }
  },[ user.role]);
  console.log(sales)
  return (
    <Container>
      <Header/>
      <Breadcrumb text="Vendas realizadas"/>

      <Content>
        <Separator>
          <span>Vendas</span>
          <div />
        </Separator >
          <div className="boxTitle">
            <h3>Vendedor</h3>
            <h3>Cliente</h3>
            <h3>Carro</h3>
            <h3>Placa</h3>
            <h3>Preço</h3>
            <h3>Data de entrega</h3>
            <h3>Situação</h3>
          </div>

        <List>

          {sales.map(sale =>(
            <Box key={sale.id}>
              <div className="header" style={{borderRadius: 15, 15, 0, 0}}>
                <span>{sale.seller}</span>
                <span>{sale.customer}</span>
                <span>{sale.car}</span>
                <span>{sale.carPlate}</span>
                <span>{sale.price}</span>
                <span>{format(new Date(sale.deliveryDate),
              "'dia' dd 'de' MMMM', às ' HH:mm'h'",
                { locale: ptBR })}</span>
                <div className="statusCircle">
                  <span>
                    <div/>
                    {sale.status === 'FINISHED' ? 'finalizado' : 'outra coisa' }
                  </span>
                </div>
                <FaArrowAltCircleDown size={26} />
              </div>
              <div className="dropDown" hidden={false}>
                <Separator className="separator">
                  <span>Serviços</span>
                  <div />
                </Separator >
              {sale.services.map(service => (
                <div className="service" key={service.id}>
                  <span>{service.service.name}</span>
                  <span>R$ {service.service.price}</span>
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

export default Sales;
