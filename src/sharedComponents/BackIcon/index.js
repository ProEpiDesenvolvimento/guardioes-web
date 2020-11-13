import React from 'react';
import {
  BackIcon,
  BackLink
} from './styles';
import backIcon from './assets/back_icon.svg'

const Backicon = ({backTo="/"}) => {
  return (
    <BackLink to={backTo}>
      <BackIcon src={backIcon} />
    </BackLink>
  );
}
export default Backicon;