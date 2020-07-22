import React from 'react';
import {
  BackIcon,
  BackLink
} from './styles';
import backIcon from './assets/back_icon.svg'

const Backicon = () => {
  return (
    <BackLink to='/'>
      <BackIcon src={backIcon} />
    </BackLink>
  );
}
export default Backicon;