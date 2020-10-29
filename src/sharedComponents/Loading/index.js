import React from 'react';
import { useLoading, Audio, ThreeDots } from '@agney/react-loading';

const Loading = ({isLoading}) => {
  const { containerProps, indicatorEl } = useLoading({
    loading: isLoading,
    indicator: <ThreeDots width="50" />,
  });

  return (
    <section {...containerProps}>
      {indicatorEl} {/* renders only while loading */}
    </section>
  )
}

export default Loading;