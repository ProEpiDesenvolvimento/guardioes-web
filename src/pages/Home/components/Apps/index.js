import React from 'react';
import { 
    Container,
    AppsTable,
    AppsTableHeaderDiv,
    AppsTableTitle,
    Table,
    THead,
    Tr,
    Th
 } from './styles';

const Apps = () => {
  return (
      <Container>
          <AppsTable>
            <AppsTableHeaderDiv>
                <AppsTableTitle>
                    Apps
                </AppsTableTitle>
                <Table>
                    <THead>
                        <Tr>
                            <Th>AppId</Th>
                            <Th>Nome</Th>
                            <Th>País</Th>
                            <Th></Th>
                        </Tr>
                    </THead>
                </Table>
            </AppsTableHeaderDiv>
          </AppsTable>
      </Container>
  );
}

export default Apps;