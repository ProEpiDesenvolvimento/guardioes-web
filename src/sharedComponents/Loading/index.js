import React from 'react';
import { useLoading, ThreeDots } from '@agney/react-loading';
import { Container } from './styles';

const Loading = ({isLoading}) => {
  const { containerProps, indicatorEl } = useLoading({
    loading: isLoading,
    indicator: <ThreeDots width="50" />,
    loaderProps: {
      style: {color: "#5dd39e", marginLeft: "35vw"},
      valueText: "Caregando dados",
    }
  });

  return (
    <Container>
      <section {...containerProps}>
       {indicatorEl} {/* renders only while loading */}
      </section>
    </Container>
  )
}

export default Loading;