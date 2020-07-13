import React from 'react';
import { useHistory } from 'react-router-dom';

import Container from './styles';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';

const Services = () => {
    const history = useHistory();
    return (
        <Container>
            <div className="header">
                <Header buttons={[{ name: 'Serviços', route: 'serviços' }, { name: 'Teste', route: 'serviço/vitrificacao' }]}></Header>
            </div>
            <div className="body">
                <Breadcrumb text='Serviços' />
                <div className="content">
                    <div className='service-box' onClick={() => history.push('/serviço/vitrificacao')}>
                        <img className='images' src="https://i2.wp.com/totalcleanbh.com/site/wp-content/uploads/2016/05/Vitrifica%C3%A7%C3%A3o-destaque.jpg?zoom=1.25&resize=289%2C194" alt="" />
                        <span id='text'>Vitrificação de Pintura</span>
                    </div>

                    <div className='service-box' onClick={() => history.push('/serviço/polimento-tecnico')} >
                        <img className='images' src="https://i2.wp.com/totalcleanbh.com/site/wp-content/uploads/2016/05/Vitrifica%C3%A7%C3%A3o-destaque.jpg?zoom=1.25&resize=289%2C194" alt="" />
                        <span id='text'>Polimento Técnico</span>
                    </div>

                    <div className='service-box' onClick={() => history.push('/serviço/higienizacao-interior')} >
                        <img className='images' src="https://i2.wp.com/totalcleanbh.com/site/wp-content/uploads/2016/05/Vitrifica%C3%A7%C3%A3o-destaque.jpg?zoom=1.25&resize=289%2C194" alt="" />
                        <span id='text'>Limpeza, hidratação e higienizacao de interiores</span>
                    </div>

                    <div className='service-box' onClick={() => history.push('/serviço/polimento-vidro')} >
                        <img className='images' src="https://i2.wp.com/totalcleanbh.com/site/wp-content/uploads/2016/05/Vitrifica%C3%A7%C3%A3o-destaque.jpg?zoom=1.25&resize=289%2C194" alt="" />
                        <span id='text'>Polimento de vidro</span>
                    </div>
                </div>
            </div>
        </Container >
    );
}

export default Services;