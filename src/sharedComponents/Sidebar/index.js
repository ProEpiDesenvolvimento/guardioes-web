import React from 'react';

import { Container, OptionsSection, OptionButton, OptionName } from './styles';

const Sidebar = () => {
  return (
    <Container>
      <OptionsSection>
        <OptionButton>
          <OptionName>
            Gerentes
          </OptionName>
        </OptionButton>
        <OptionButton>
          <OptionName>
            Configurar Apps
          </OptionName>
        </OptionButton>
        <OptionButton>
          <OptionName>
            Usuários
          </OptionName>
        </OptionButton>
        <OptionButton>
          <OptionName>
            Sintomas
          </OptionName>
        </OptionButton>
        <OptionButton>
          <OptionName>
            Conteúdos
          </OptionName>
        </OptionButton>
      </OptionsSection>
    </Container>
  );
}

export default Sidebar;