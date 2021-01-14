import React from 'react';

import signInBackgroundImg from '../../../assets/sign-in-background-3.jpg';
import Breadcrumb from '../../../components/Breadcrumb';
import Header from '../../../components/Header';
import Container from './styles';

const Service: React.FC = () => (
  <Container>
    <div className="header">
      <Header></Header>
    </div>
    <div className="body">
      <Breadcrumb text="Polimento técnico." />
      <div className="content">
        <span>
          O polimento automotivo é um procedimento que beneficia diretamente a
          pintura do veículo. Com a utilização de uma politriz, boinas e massa
          de polir (abrasivas), é feito um processo gradual de reparo de uma
          camada da pintura com a finalidade de obter uma superfície mais lisa
          possível. Esse reparo é milesimal, e tem o objetivo “trabalhar”
          somente nas impurezas superficiais da pintura. Manutenção Ao contrário
          do que muitos falam, recomenda-se passar cera uma vez ao mês para
          manutenção e prolongamento dos serviços de Espelhamento ou polimento
          automotivo. Periodicidade Recomendada – Mesmo o reparo sendo
          milesimal, não é um serviço para ser feito com frequência. E lembrando
          que esse reparo é diretamente proporcional a vários fatores, como o
          tipo de boina, granulometria do abrasivo (massa), profissional
          (polidor); qualidade e tipo da pintura. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </span>
        <div className="image">
          <img className="images" src={signInBackgroundImg} alt="" />
        </div>
      </div>
    </div>
  </Container>
);

export default Service;
