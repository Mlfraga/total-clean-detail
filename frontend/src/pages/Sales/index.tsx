import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

import { Button as ChakraButton, Tooltip } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import Header from '../../components/Header';
import Select from '../../components/Select';
import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';
import api from '../../services/api';
import getSaleStatusTranslated from '../../utils/getSaleStatusTranslated';
import { Container, Content, Separator, List, Box } from './styles';

interface ISale {
  id: number;
  seller: string;
  customer: string;
  car: string;
  carPlate: string;
  price: number;
  availabilityDate: string;
  deliveryDate: string;
  status: string;
  services: Array<{
    id: number;
    name: string;
    price: number;
  }>;
  serviceSale: Array<{
    id: number;
    service: {
      id: number;
      name: string;
      price: number;
    };
  }>;
}

interface ISaleRequestResponseData {
  id: number;
  availabilityDate: string;
  deliveryDate: string;
  status: string;
  companyPrice: number;
  costPrice: number;
  seller: {
    name: string;
  };
  person: {
    name: string;
  };
  car: {
    car: string;
    carPlate: string;
  };
  serviceSale: Array<{
    id: number;
    service: {
      id: number;
      name: string;
      price: number;
    };
  }>;
}

interface IFormDataFilter {
  date: Date;
  status: string;
}

const Sales = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const searchFormRef = useRef<FormHandles>(null);

  const [sales, setSales] = useState<ISaleRequestResponseData[]>([]);
  const [openedServices, setOpenedServices] = useState<number[]>([]);
  const [selectedSales, setSelectedSales] = React.useState<number[]>([]);

  useEffect(() => {
    if (user?.role === 'MANAGER') {
      api.get('sale/company').then(response => {
        const { data } = response;

        setSales(data);
      });
    }

    if (user?.role === 'SELLER') {
      api.get('sale/seller').then(response => {
        const { data } = response;

        setSales(data);
      });
    }

    if (user?.role === 'ADMIN') {
      api.get('sale').then(response => {
        const { data } = response;

        setSales(data);
      });
    }
  }, [user]);

  const formattedSales = useMemo(
    () =>
      sales.map(sale => {
        const services: Array<{
          id: number;
          name: string;
          price: number;
        }> = [];

        if (user?.role !== 'ADMIN') {
          sale.serviceSale.forEach(service => {
            api
              .get(`companyservices/sale?serviceId=${service.service.id}`)
              .then(res => {
                const companyService = res.data;

                services.push({
                  id: companyService[0].service.id,
                  name: companyService[0].service.name,
                  price: companyService[0].price,
                });
              });

            return services;
          });
        } else {
          sale.serviceSale.forEach(service => {
            services.push({
              id: service.service.id,
              name: service.service.name,
              price: service.service.price,
            });
          });
        }
        return {
          id: sale.id,
          seller: sale.seller.name,
          customer: sale.person.name,
          car: sale.car.car,
          carPlate: sale.car.carPlate,
          price: sale.companyPrice,
          availabilityDate: sale.availabilityDate,
          deliveryDate: sale.deliveryDate,
          status: sale.status,
          services,
        };
      }),
    [sales],
  );

  const handleOpenServices = useCallback(
    (id: number) => {
      setOpenedServices([...openedServices, id]);
    },
    [openedServices],
  );

  const handleCloseServices = useCallback(
    (id: number) => {
      const newopenedServices = openedServices.filter(
        serviceId => serviceId !== id,
      );

      setOpenedServices(newopenedServices);
    },
    [openedServices],
  );

  const handleSelectSale = useCallback(
    (id: number) => {
      if (selectedSales?.includes(id)) {
        if (selectedSales.length === 1) {
          setSelectedSales([]);

          return;
        }

        const newSelectedSaless = selectedSales.filter(sale => sale !== id);

        setSelectedSales(newSelectedSaless);

        return;
      }

      if (selectedSales) {
        setSelectedSales([...selectedSales, id]);
        return;
      }

      setSelectedSales([id]);
    },
    [selectedSales],
  );

  const handleUpdateSale = useCallback(
    async data => {
      if (selectedSales.length < 1) {
        addToast({
          title: 'Não é possível alterar a situação da venda.',
          description: 'Por favor selecione alguma venda.',
          type: 'error',
        });

        return;
      }

      if (!data.statusSale) {
        addToast({ title: 'Campo de situação da venda vazio.', type: 'error' });
        return;
      }

      const response = await api.patch('sale/status/', {
        status: data.statusSale,
        sales: selectedSales,
      });

      if (response.status === 200) {
        setSelectedSales([]);
        addToast({
          title: 'Sucesso',
          description: 'Situação da venda alterada com sucesso',
          type: 'success',
        });

        const res = await api.get('sale');

        setSales(res.data);
      }
    },
    [addToast, selectedSales],
  );

  const handleSearchSale = useCallback(
    async ({ date, status }: IFormDataFilter) => {
      let query;

      if (!date && !status) {
        searchFormRef.current?.setErrors({
          status: 'Por favor selecione algum filtro.',
          date: 'Por favor selecione algum filtro.',
        });

        addToast({
          title: 'Por favor preencha algum campo para realizar a pesquisa.',
          type: 'error',
        });

        const salesWithoutFilter = await api.get('sale');

        const salesWithoutFilterData = salesWithoutFilter.data;

        setSales(salesWithoutFilterData);

        return;
      }

      if (date && status) {
        if (status === 'ALL') {
          query = { date };
        } else {
          query = { date, status };
        }
      }

      if (date && !status) {
        query = { date };
      }

      if (status && !date && status !== 'ALL') {
        query = { status };
      }

      const updatedSales = await api.get('sale', { params: query });

      const res = updatedSales.data;

      setSales(res);
    },
    [addToast],
  );

  const handleRemoveFilters = useCallback(async () => {
    const salesWithoutFilter = await api.get('sale');

    const salesWithoutFilterData = salesWithoutFilter.data;

    searchFormRef.current?.reset();

    setSales(salesWithoutFilterData);
  }, []);

  return (
    <Container>
      <Header />
      <Breadcrumb text="Vendas realizadas" />
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
        {user?.role === 'ADMIN' && (
          <Form
            ref={searchFormRef}
            onSubmit={handleSearchSale}
            style={{ display: 'flex', marginTop: 14 }}
          >
            <DatePicker
              name="date"
              placeholderText="Filtrar por data"
              containerProps={{
                width: 250,
                height: 10,
              }}
            />

            <Select
              placeholder="Filtrar por situação"
              height={8}
              backgroundColor="#424242"
              color="White"
              name="status"
              containerProps={{
                marginLeft: 4,
                width: 225,
                height: 10,
                border: '2px solid',
                borderColor: '#585858',
                backgroundColor: '#424242',
              }}
            >
              <option value="ALL">Todos</option>
              <option value="PENDING">Pendente</option>
              <option value="CONFIRMED">Confirmado</option>
              <option value="CANCELED">Cancelado</option>
              <option value="FINISHED">Finalizado</option>
            </Select>

            <Tooltip
              label="Pesquisar vendas por dia"
              aria-label="Pesquisar vendas por dia"
            >
              <ChakraButton
                _hover={{
                  bg: '#df7468',
                  color: 'gray.900',
                }}
                _focusWithin={{
                  border: 0,
                }}
                height="40px"
                backgroundColor="#FF6F60"
                marginLeft={4}
                type="submit"
              >
                <FiSearch />
              </ChakraButton>
            </Tooltip>

            <Tooltip label="Limpar filtros" aria-label="Limpar filtros">
              <ChakraButton
                _hover={{
                  bg: '#4e4e4e',
                }}
                _focusWithin={{
                  border: 0,
                }}
                height="40px"
                backgroundColor="#454545"
                marginLeft={4}
                onClick={handleRemoveFilters}
              >
                Limpar filtros
              </ChakraButton>
            </Tooltip>
          </Form>
        )}

        <Separator>
          <span>Vendas</span>
          <div />
        </Separator>
        <div className="boxTitle">
          <span>N°</span>
          <span>Vendedor</span>
          <span>Carro</span>
          <span>Placa</span>
          <span>Data de entrega</span>
          <span>Data de disponibilidade</span>
          <span>Situação</span>
        </div>
        <List
          width="100%"
          height={{
            xs: '70vh',
            sm: '70vh',
            md: '30vh',
            lg: '45vh',
            xl: '50vh',
          }}
          overflow="auto"
          marginTop={4}
        >
          {formattedSales.map(sale => (
            <Box
              key={sale.id}
              onClick={
                user?.role === 'ADMIN'
                  ? () => handleSelectSale(sale.id)
                  : () => {
                      console.log('click');
                    }
              }
            >
              <div
                className={
                  selectedSales.includes(sale.id) ? 'header-selected' : 'header'
                }
                style={
                  openedServices.includes(sale.id)
                    ? {
                        borderRadius: '15px 15px 0 0',
                        borderBottom: 0,
                        cursor: 'pointer',
                      }
                    : { borderRadius: '15px', cursor: 'pointer' }
                }
              >
                <span>{sale.id}</span>
                <span>{sale.seller}</span>
                <span>{sale.car}</span>
                <span>{sale.carPlate}</span>
                <span>
                  {format(
                    new Date(sale.availabilityDate),
                    "dd'/'MM'/'yyyy '-' HH:mm'h'",
                    { locale: ptBR },
                  )}
                </span>
                <span>
                  {format(
                    new Date(sale.deliveryDate),
                    "dd'/'MM'/'yyyy '-' HH:mm'h'",
                    { locale: ptBR },
                  )}
                </span>
                <div className="status">
                  <span>
                    <div className={sale.status} />
                    {getSaleStatusTranslated(sale.status)}
                  </span>
                </div>

                {openedServices.includes(sale.id) ? (
                  <FaArrowAltCircleUp
                    onClick={e => {
                      e.stopPropagation();
                      handleCloseServices(sale.id);
                    }}
                    style={{ cursor: 'pointer' }}
                    size={26}
                  />
                ) : (
                  <FaArrowAltCircleDown
                    onClick={e => {
                      e.stopPropagation();
                      handleOpenServices(sale.id);
                    }}
                    style={{ cursor: 'pointer' }}
                    size={26}
                  />
                )}
              </div>

              <div
                className="dropDown"
                hidden={!openedServices.includes(sale.id)}
                style={
                  selectedSales.includes(sale.id)
                    ? { border: '2px solid #FF6F60', borderTop: 0 }
                    : { border: 0 }
                }
              >
                <Separator className="separator">
                  <span>Serviços</span>
                  <div />
                </Separator>
                {sale.services.map(service => (
                  <div className="service" key={service.id}>
                    <span>{service.name}</span>
                    <span>
                      {service.price.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                ))}
                <div className="total">
                  <span>Total</span>
                  <span>
                    {sale.price.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
              </div>
            </Box>
          ))}
        </List>

        {user?.role === 'ADMIN' && (
          <div
            className={
              selectedSales.length < 1
                ? 'udpdateSaleContainerHide'
                : 'updateSaleContainer'
            }
            hidden={selectedSales.length < 1}
          >
            <Form
              ref={formRef}
              onSubmit={handleUpdateSale}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Select
                height={8}
                backgroundColor="#424242"
                color="White"
                name="statusSale"
                containerProps={{
                  marginTop: '36px',
                  marginRight: 8,
                  width: 300,
                  height: 10,
                  border: '2px solid',
                  borderColor: '#585858',
                  backgroundColor: '#424242',
                }}
              >
                <option value="PENDING">Pendente</option>
                <option value="CONFIRMED">Confirmado</option>
                <option value="CANCELED">Cancelado</option>
                <option value="FINISHED">Finalizado</option>
              </Select>
              <Button style={{ marginTop: '0px' }} type="submit">
                Alterar Situação
              </Button>
            </Form>
          </div>
        )}
      </Content>
    </Container>
  );
};

export default Sales;
