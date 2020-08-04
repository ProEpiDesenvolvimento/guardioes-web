import React from 'react';
import { 
    Container,
    AppsTable,
    AppsTableHeaderDiv,
    AppsTableTitle
 } from './styles';

const Apps = () => {
  return (
      <Container>
          <AppsTable>
            <AppsTableHeaderDiv>
                <AppsTableTitle>
                    Apps
                </AppsTableTitle>
            </AppsTableHeaderDiv>
          </AppsTable>
      </Container>
  );
}

export default Apps;